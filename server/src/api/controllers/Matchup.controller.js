const Controller = require('./Controller');
const {
  NotFoundError,
  NotAuthorized,
  BadRequest,
} = require('../../helpers/error');
const { db } = require('../../config/database');
const Riot = require('../../lib/Riot');
const { sync } = require('../middleware/syncMatchup.middleware');

class MatchupController extends Controller {
  constructor(...props) {
    super(...props);

    this.create = this.createOne.bind(this);
    this.syncAll = this.syncAll.bind(this);
    this.getPlayedChampions = this.getPlayedChampions.bind(this);
    this.getInfoCard = this.getInfoCard.bind(this);
    this.findGame = this.findGame.bind(this);
    this.getMatchups = this.getMatchups.bind(this);
    this.getDex = this.getDex.bind(this);
    this.getLatest = this.getLatest.bind(this);
    this.getAllMatchupsByChampion = this.getMatchups.bind(this);
    this.updatePrivate = this.updatePrivate.bind(this);
    this.revertMatchup = this.revertMatchup.bind(this);
    this.getAvailableLanes = this.getAvailableLanes.bind(this);
    this.manualCreate = this.manualCreate.bind(this);
  }

  async createOne(req, res) {
    const { id: userId } = req.user;

    const matchup = await this.model.findMatchup(userId, req.body);

    const { champion_id, opponent_id, lane } = req.body;

    await db.game.create({
      data: {
        user_id: userId,
        game_id: req.body.game_id,
        lane,
        status: 'accepted',
        timestamp: new Date(),
        summoner_id: String(req.body.summoner_id),
        championA: {
          connect: {
            id: Number(champion_id),
          },
        },
        championB: {
          connect: {
            id: Number(opponent_id),
          },
        },
      },
    });

    const data = await this.model.createOrUpdate(userId, matchup, req.body);

    res.status(201).json({
      id: data.id,
      confirmed: true,
    });
  }

  async getPlayedChampions(req, res) {
    const { id } = req.user;
    const champions = await this.model.getPlayedChampions(id);

    if (!champions) {
      return NotFoundError();
    }

    res.status(200).json(champions);
  }

  async getInfoCard(req, res) {
    const { id } = req.user;

    const count = await this.model.getGamesPlayed(id);
    const data = await this.model.getRecordedGames(id);

    res.status(200).json(this.formatters.getInfoCard({ count, data }));
  }

  async findGame(req, res) {
    const { id: userId } = req.user;
    const { summonerId } = req.query;

    // Many summoners
    const { summoner: foundSummoner } = await this.model.findOneByUserId(
      userId
    );

    if (!foundSummoner || foundSummoner.length <= 0) {
      throw new NotFoundError('You do not have any linked summoner accounts');
    }

    const summoner = foundSummoner.find((s) => s.accountId === summonerId);

    // if no summoner found
    if (!summoner) {
      throw new NotAuthorized(
        'You are not the owner of the given summoner account'
      );
    }

    const data = await Riot.findMatch(summoner.accountId, summoner.region);

    if (data.gameMode !== 'CLASSIC') {
      throw new NotFoundError();
    }

    const champions = await db.champion.findMany();
    const me = data.participants
      .filter((player) => player.summonerId === summoner.accountId)
      .map((player) => {
        const champion = champions.find(
          (champion) => champion.id === player.championId
        );

        return {
          id: champion.id,
          teamId: player.teamId,
          name: champion.name,
          image: champion.image,
        };
      });

    const participants = data.participants.filter(
      (player) => player.teamId !== me[0].teamId
    );

    const opponents = participants.map((player) => {
      const champion = champions.find(
        (champion) => champion.id === player.championId
      );

      return {
        id: champion.id,
        name: champion.name,
        image: champion.image,
      };
    });

    const [_data] = await this.model.getLatestMatchup(userId);

    const formattedData = this.formatters.findGame(
      data,
      _data,
      me[0],
      opponents
    );

    res.status(200).json(formattedData);
  }

  async getDex(req, res) {
    const { id } = req.params;

    const data = await this.model.getDex(id);

    if (data.user_id !== req.user.id) {
      throw new NotFoundError('no matchups found for the given user');
    }

    res.status(200).json(data);
  }

  async getLatest(req, res, next) {
    const { id: gameId } = req.params;

    res.status(200).json({
      ...req.match,
      confirmed: gameId === req.match.game_id,
    });
  }

  async getMatchups(req, res) {
    const { id: userId } = req.user;
    const matchups = await this.model.getMatchups(userId, req.query);

    const formattedJson = this.formatters.getPlayedMatchups(matchups);
    res.status(200).json(formattedJson);
  }

  async syncAll(req, res) {
    const { id } = req.user;
    const { summonerId } = req.query;

    const { summoner: foundSummoner } = await this.model.findOneByUserId(id);

    if (!foundSummoner || foundSummoner.length <= 0) {
      throw new NotFoundError('You do not have any linked summoner accounts');
    }

    const summoner = foundSummoner.find((s) => s.accountId === summonerId);

    // if no summoner found
    if (!summoner) {
      throw new NotAuthorized(
        'You are not the owner of the given summoner account'
      );
    }

    const syncedData = await sync(id, summoner.accountId, summoner.region);

    res.status(200).json(syncedData);
  }

  async updatePrivate(req, res) {
    const { id: userId } = req.user;

    if (req.query.all === 'true') {
      await this.model.updatePrivateBulk(userId, req.query);
    } else {
      await this.model.updatePrivate(userId, req.query);
    }

    res.sendStatus(204);
  }

  async revertMatchup(req, res) {
    const { id: userId } = req.user;

    if (req.query.gamesPlayed <= 1) {
      await this.model.deleteMatchup(userId, req.query);
    } else {
      await this.model.revertMatchup(userId, req.query);
    }

    this.model.deleteGame(userId, req.query);

    res.sendStatus(204);
  }

  async getAvailableLanes(req, res) {
    const { id } = req.user;
    const { championId, opponentId } = req.query;

    const lanes = await this.model.getLanes(id, +championId, +opponentId);
    const mapToArray = Object.values(lanes).map((l) => l.lane.toLowerCase());

    const availableLanes = Object.values(Riot.LANES_FILTERED).filter(
      (l) => !mapToArray.includes(l.toLowerCase())
    );

    res.status(200).json(availableLanes);
  }

  async manualCreate(req, res) {
    const { championId, opponentId, lane } = req.body;
    const { id } = req.user;

    const result = await this.model.manualCreate(
      id,
      +championId,
      +opponentId,
      lane
    );

    if (!result) {
      throw new BadRequest('Could not create manual matchup.');
    }

    res.status(201).json(result.id);
  }
}

module.exports = MatchupController;

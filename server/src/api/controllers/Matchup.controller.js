const Controller = require('./Controller');
const { ErrorHandler, NotFoundError } = require('../../helpers/error');
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
  }

  async createOne(req, res) {
    const { id: userId } = req.user;

    const matchup = await this.model.findMatchup(userId, req.body);
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
    const { summoner, id: userId } = req.user;
    const data = await Riot.findMatch(summoner.accountId, summoner.region);

    if (data.gameMode !== 'CLASSIC') {
      throw new NotFoundError();
    }

    const champions = await db.champion.findMany();
    const me = data.participants
      .filter((player) => player.summonerId === req.user.summoner.accountId)
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

    res.status(200).json({
      gameId: data.gameId,
      me: me[0],
      opponents,
      startTime: data.gameStartTime,
      confirmed: _data ? Number(_data.game_id) === data.gameId : false,
    });
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
    try {
      const { id: gameId } = req.params;

      res.status(200).json({
        ...req.match,
        confirmed: gameId === req.match.game_id,
      });
    } catch (err) {
      next(err);
    }
  }

  async getMatchups(req, res) {
    const { id: userId } = req.user;
    const matchups = await this.model.getMatchups(userId, req.query);

    const formattedJson = this.formatters.getPlayedMatchups(matchups);
    res.status(200).json(formattedJson);
  }

  async syncAll(req, res) {
    const { id, summoner } = req.user;

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

  async revertMatchup(req, res, next) {
    const { id: userId } = req.user;

    if (req.query.gamesPlayed <= 1) {
      await this.model.deleteMatchup(userId, req.query);
    } else {
      await this.model.revertMatchup(userId, req.query);
    }

    res.sendStatus(204);
  }
}

module.exports = MatchupController;

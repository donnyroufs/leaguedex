const Controller = require('./Controller');
const { ErrorHandler } = require('../../helpers/error');
const { db } = require('../../config/database');
const Riot = require('../../lib/Riot');
const { sync } = require('../middleware/syncMatchup.middleware');

class MatchupController extends Controller {
  constructor({ model, formatters }) {
    super(model, formatters);

    this.formatters = formatters;

    this.create = this.createOne.bind(this);
    this.syncAll = this.syncAll.bind(this);
    this.getPlayedChampions = this.getPlayedChampions.bind(this);
    this.getInfoCard = this.getInfoCard.bind(this);
    this.findGame = this.findGame.bind(this);
    this.getDex = this.getDex.bind(this);
    this.getLatest = this.getLatest.bind(this);
    this.getAllMatchupsByChampion = this.getMatchups.bind(this);
    this.updatePrivate = this.updatePrivate.bind(this);
    this.revertMatchup = this.revertMatchup.bind(this);
  }

  async createOne(req, res, next) {
    try {
      const { id } = req.user;
      const { lane, champion_id, opponent_id, game_id } = req.body;

      const matchup = await this.model.findOne({
        where: {
          champion_id_opponent_id_lane_user_id: {
            lane,
            champion_id,
            opponent_id,
            user_id: id,
          },
        },
        select: {
          games_played: true,
        },
      });

      const data = await this.model.upsert({
        create: {
          lane,
          game_id,
          games_played: 1,
          championA: {
            connect: {
              id: champion_id,
            },
          },
          championB: {
            connect: {
              id: opponent_id,
            },
          },
          user: {
            connect: {
              id,
            },
          },
        },
        update: {
          games_played: matchup ? matchup.games_played + 1 : 1,
          game_id,
        },
        where: {
          champion_id_opponent_id_lane_user_id: {
            lane,
            champion_id,
            opponent_id,
            user_id: id,
          },
        },
      });

      res.status(201).json({
        id: data.id,
        confirmed: true,
      });
    } catch (err) {
      next(err);
    }
  }

  async getPlayedChampions(req, res, next) {
    try {
      const { id } = req.user;
      const champions = await db.$queryRaw`
        SELECT DISTINCT
          "Champion"."id",
          "Champion"."name",
          "Champion"."image",
          case
            when "Matchup"."opponent_id" IS NOT NULL
              then true
              else false
          end as has_matchups
        FROM "Matchup"
        RIGHT JOIN "Champion"
        ON "Champion"."id" = "Matchup"."champion_id"
        AND "Matchup"."user_id" = ${id}
        ORDER BY "has_matchups" DESC
      `;
      if (!champions) {
        return ErrorHandler(404, "Couldn't find any champions.");
      }

      res.status(200).json(champions);
    } catch (err) {
      next(err);
    }
  }

  // Count games_played, count records
  async getInfoCard(req, res, next) {
    try {
      const { id } = req.user;
      const count = await this.model.count({
        where: {
          user_id: id,
        },
      });

      const data = await this.model.findMany({
        where: {
          user_id: id,
        },
        select: {
          games_played: true,
        },
      });

      res.status(200).json(this.formatters.getInfoCard({ count, data }));
    } catch (err) {
      next(err);
    }
  }

  async findGame(req, res, next) {
    try {
      const { summoner } = req.user;
      const data = await Riot.findMatch(summoner.accountId, summoner.region);

      if (data.gameMode !== 'CLASSIC') {
        next(err);
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

      const [_data] = await db.matchup.findMany({
        take: 1,
        where: {
          user_id: Number(req.user.id),
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });

      res.status(200).json({
        gameId: data.gameId,
        me: me[0],
        opponents,
        startTime: data.gameStartTime,
        confirmed: _data ? Number(_data.game_id) === data.gameId : false,
      });
    } catch (err) {
      next(err);
    }
  }

  async getDex(req, res, next) {
    try {
      const { id } = req.params;
      const shared = req.query.shared || false;

      const data = await this.model.findOne({
        where: {
          id: Number(id),
        },
        include: {
          championA: true,
          championB: true,
        },
      });

      if (data.user_id !== req.user.id) {
        throw new ErrorHandler(404, 'No matchups found for the given user.');
      }

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
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

  async getMatchups(req, res, next) {
    try {
      const { champion, championB, lane } = req.query;
      const matchups = await db.matchup.findMany({
        where: {
          championA: {
            name: champion,
          },
          championB: {
            name: {
              startsWith: championB,
            },
          },
          lane: lane ? lane.toLowerCase().trim() : undefined,
          user_id: Number(req.user.id),
        },
        include: {
          championA: true,
          championB: true,
        },
      });

      res.json(matchups);
    } catch (err) {
      next(err);
    }
  }

  async syncAll(req, res, next) {
    try {
      const { id, summoner } = req.user;
      const [data] = await db.$queryRaw(`
      SELECT "Matchup"."game_id"
      FROM "Matchup" 
      WHERE 
        "Matchup"."games_lost" + "Matchup"."games_won" < "Matchup"."games_played"
        AND "Matchup"."user_id" = ${id}`);

      const syncedData = await sync(id, summoner.accountId, summoner.region);

      res.status(200).json(syncedData);
    } catch (err) {
      next(err);
    }
  }

  async updatePrivate(req, res, next) {
    const { id } = req.user;
    const { lane, champion_id, opponent_id, private: _private } = req.query;
    try {
      await db.matchup.update({
        where: {
          champion_id_opponent_id_lane_user_id: {
            lane: lane.trim(),
            champion_id: Number(champion_id),
            opponent_id: Number(opponent_id),
            user_id: Number(id),
          },
        },
        data: {
          private: _private === 'true',
        },
      });

      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  async revertMatchup(req, res, next) {
    try {
      const { id } = req.user;
      const { gamesPlayed, champion_id, opponent_id, lane } = req.query;

      if (gamesPlayed <= 1) {
        await db.matchup.delete({
          where: {
            champion_id_opponent_id_lane_user_id: {
              lane: lane.trim(),
              champion_id: Number(champion_id),
              opponent_id: Number(opponent_id),
              user_id: Number(id),
            },
          },
        });
      } else {
        await db.matchup.update({
          where: {
            champion_id_opponent_id_lane_user_id: {
              lane: lane.trim(),
              champion_id: Number(champion_id),
              opponent_id: Number(opponent_id),
              user_id: Number(id),
            },
          },
          data: {
            games_played: gamesPlayed - 1,
            game_id: undefined,
          },
        });
      }

      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MatchupController;

const Controller = require('./Controller');
const { ErrorHandler } = require('../../helpers/error');
const { db } = require('../../config/database');

class MatchupController extends Controller {
  constructor({ model, formatters }) {
    super(model, formatters);

    this.formatters = formatters;

    this.create = this.createOne.bind(this);
    this.getPlayedChampions = this.getPlayedChampions.bind(this);
    this.getInfoCard = this.getInfoCard.bind(this);
    this.findGame = this.findGame.bind(this);
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

      await this.model.upsert({
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

      res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  }

  async getPlayedChampions(req, res, next) {
    try {
      const { id } = req.user;
      const champions = await db.$queryRaw`
        SELECT DISTINCT
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

      res.send(summoner);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MatchupController;

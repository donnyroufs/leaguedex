const Controller = require('./Controller');
const { ErrorHandler } = require('../../helpers/error');
const { db } = require('../../config/database');

class MatchupController extends Controller {
  constructor(model) {
    super(model);

    this.getPlayedChampions = this.getPlayedChampions.bind(this);
  }

  async getPlayedChampions(req, res, next) {
    try {
      const { id } = req.user;
      const champions = await db.$queryRaw(
        `
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
        AND "Matchup"."user_id" = '${id}'
        ORDER BY "has_matchups" DESC
      `
      );

      if (!champions) {
        return ErrorHandler(404, "Couldn't find any champions.");
      }

      res.status(200).json(champions);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MatchupController;

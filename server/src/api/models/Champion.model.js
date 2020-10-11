const Model = require('./Model');
const { db } = require('../../config/database');

class ChampionModel extends Model {
  constructor(props) {
    super(props);
  }

  async getAllChampions() {
    const champions = await db.$queryRaw(
      `
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
        AND "Matchup"."user_id" = 0
      `
    );
    return champions;
  }
}

module.exports = new ChampionModel(db.champion);

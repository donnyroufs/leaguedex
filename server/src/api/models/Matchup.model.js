const { db } = require('../../config/database');
const Model = require('./Model');

class MatchupModel extends Model {
  constructor(...props) {
    super(...props);
  }

  async findMatchup(userId, { lane, champion_id, opponent_id }) {
    const resource = await this.db.findOne({
      where: {
        champion_id_opponent_id_lane_user_id: {
          lane,
          champion_id,
          opponent_id,
          user_id: userId,
        },
      },
      select: {
        games_played: true,
      },
    });

    return resource;
  }

  async createOrUpdate(
    userId,
    matchup,
    { lane, champion_id, opponent_id, game_id }
  ) {
    const resource = this.db.upsert({
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
            id: userId,
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
          user_id: userId,
        },
      },
    });

    return resource;
  }

  async getPlayedChampions(userId) {
    const resource = await db.$queryRaw`
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
        AND "Matchup"."user_id" = ${userId}
        ORDER BY "has_matchups" DESC
      `;

    return resource;
  }

  async getGamesPlayed(userId) {
    const resource = await this.db.count({
      where: {
        user_id: userId,
      },
    });

    return resource;
  }

  async getRecordedGames(userId) {
    const resource = await this.db.findMany({
      where: {
        user_id: userId,
      },
      select: {
        games_played: true,
      },
    });

    return resource;
  }

  async getLatestMatchup(userId) {
    const resource = await this.db.findMany({
      take: 1,
      where: {
        user_id: userId,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return resource;
  }
}

module.exports = new MatchupModel(db.matchup);

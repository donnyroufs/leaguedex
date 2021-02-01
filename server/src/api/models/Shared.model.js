const Model = require('./Model');
const { db } = require('../../config/database');
const { NotFoundError } = require('../../helpers/error');

class SharedModel extends Model {
  constructor(props) {
    super(props);
  }

  async findOne(id, username, userId) {
    const resource = await db.user.findOne({
      where: {
        username,
      },
      select: {
        username: false,
        matchups: {
          where: {
            id: Number(id),
            private: false,
          },
          select: {
            championA: true,
            championB: true,
            champion_id: true,
            games_lost: true,
            games_played: true,
            games_won: true,
            id: true,
            opponent_id: true,
            private: true,
            lane: true,
            user_id: true,
          },
        },
      },
    });

    const likes = await db.user_matchup_likes.findMany({
      where: {
        matchup_id: +id,
      },
    });

    return [resource, likes];
  }

  async getPublicMatchupsByUsername(username) {
    const user = await db.user.findOne({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      throw new NotFoundError(
        'Cannot find user by username for public matchups.'
      );
    }

    const resource = await db.$queryRaw`
        SELECT DISTINCT
            "Champion"."id",
            "Champion"."name",
            "Champion"."image",
            COUNT("Matchup"."champion_id") as matchups_count
            FROM "Matchup"
            RIGHT JOIN "Champion"
            ON "Champion"."id" = "Matchup"."champion_id"
            AND "Matchup"."user_id" = ${user.id}
            AND "Matchup"."private" = false
            GROUP BY "Champion"."id"
            HAVING COUNT("Matchup"."champion_id") > 0
      `;

    return resource;
  }

  async findManyByUsername(username, championName) {
    const resources = await db.user.findOne({
      where: {
        username,
      },
      select: {
        username: false,
        matchups: {
          where: {
            private: false,
            championA: {
              name: championName,
            },
          },
          select: {
            championA: true,
            championB: true,
            champion_id: true,
            games_lost: true,
            games_played: true,
            games_won: true,
            id: true,
            opponent_id: true,
            private: true,
            lane: true,
          },
        },
      },
    });

    return resources;
  }

  async findByMatchupId(matchId, userId) {
    const resources = await this.db.note.findMany({
      where: {
        matchup_id: Number(matchId),
        user_id: Number(userId),
      },
      select: {
        id: true,
        tags: true,
        content: true,
        createdAt: true,
      },
    });

    return resources;
  }
}

module.exports = new SharedModel(db);

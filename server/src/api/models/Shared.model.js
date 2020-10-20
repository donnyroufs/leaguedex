const Model = require('./Model');
const { db } = require('../../config/database');

class SharedModel extends Model {
  constructor(props) {
    super(props);
  }

  async findOne(id, username) {
    const resource = await this.db.user.findOne({
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

    return resource;
  }

  async findManyByUsername(username) {
    const resources = await this.db.user.findOne({
      where: {
        username,
      },
      select: {
        username: false,
        matchups: {
          where: {
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

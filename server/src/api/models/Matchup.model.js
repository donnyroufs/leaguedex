const { db } = require('../../config/database');
const Model = require('./Model');

class MatchupModel extends Model {
  constructor(...props) {
    super(...props);
  }

  async findOneByUserId(userId) {
    const [resource] = await db.user.findMany({
      take: 1,
      where: {
        id: Number(userId),
      },
      select: {
        summoner: true,
      },
    });

    return resource;
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
        AND "Matchup"."user_id" = ${Number(userId)}
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

  async getDex(matchId) {
    const resource = await this.db.findOne({
      where: {
        id: Number(matchId),
      },
      include: {
        championA: true,
        championB: true,
      },
    });

    return resource;
  }

  async getMatchups(userId, { champion, championB, lane }) {
    const resources = await this.db.findMany({
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
        user_id: userId,
      },
      include: {
        championA: true,
        championB: true,
      },
    });

    return resources;
  }

  async updatePrivateBulk(userId, { private: _private, champion_id }) {
    const isPrivate = _private === 'true';

    await db.$queryRaw`
        UPDATE 
          "Matchup" 
        SET 
          "private" = ${isPrivate}
        WHERE 
          "user_id" = ${userId} 
        AND 
          "champion_id" = ${Number(champion_id)}`;
  }

  async updatePrivate(
    userId,
    { lane, private: _private, champion_id, opponent_id }
  ) {
    await this.db.update({
      where: {
        champion_id_opponent_id_lane_user_id: {
          lane: lane.trim(),
          champion_id: Number(champion_id),
          opponent_id: Number(opponent_id),
          user_id: Number(userId),
        },
      },
      data: {
        private: _private === 'true',
      },
    });
  }

  async deleteMatchup(userId, { lane, champion_id, opponent_id }) {
    await this.db.delete({
      where: {
        champion_id_opponent_id_lane_user_id: {
          lane: lane.trim(),
          champion_id: Number(champion_id),
          opponent_id: Number(opponent_id),
          user_id: Number(userId),
        },
      },
    });
  }

  async revertMatchup(userId, { gamesPlayed, champion_id, opponent_id, lane }) {
    await this.db.update({
      where: {
        champion_id_opponent_id_lane_user_id: {
          lane: lane.trim(),
          champion_id: Number(champion_id),
          opponent_id: Number(opponent_id),
          user_id: Number(userId),
        },
      },
      data: {
        games_played: gamesPlayed - 1,
        game_id: undefined,
      },
    });
  }

  async deleteGame(userId, { game_id, summoner_id }) {
    await db.game.delete({
      where: {
        user_id_game_id_summoner_id: {
          user_id: userId,
          game_id,
          summoner_id,
        },
      },
    });
  }
}

module.exports = new MatchupModel(db.matchup);

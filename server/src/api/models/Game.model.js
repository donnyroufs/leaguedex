const { db } = require('../../config/database');
const Model = require('./Model');
const Riot = require('../../lib/Riot');

class GameModel extends Model {
  constructor(...props) {
    super(...props);
  }

  async getRecentGameDate(userId, summonerId) {
    const resources = await db.game.findMany({
      where: {
        user_id: userId,
        summoner_id: summonerId,
      },
      select: {
        timestamp: true,
      },
    });

    if (!resources) return [];

    const lastPlayedGameFirst = resources.sort(
      (a, b) => b.timestamp - a.timestamp
    );

    return lastPlayedGameFirst;
  }

  async getSummonerInfo(summonerId) {
    const resource = await db.summoner.findOne({
      where: {
        id: summonerId,
      },
    });

    return resource;
  }

  async getChampionById(id) {
    const resource = await db.champion.findOne({
      where: {
        id,
      },
    });

    return resource;
  }

  async saveAndGetNotifications(matchHistory, userId, summonerId) {
    const currentMatchHistory = await db.game.findMany({
      where: {
        user_id: Number(userId),
        summoner_id: String(summonerId),
      },
      select: {
        game_id: true,
      },
    });

    console.log(matchHistory);

    const uniqueMatchHistory = matchHistory.filter((m) => {
      const mapped = currentMatchHistory.map((match) => match.game_id);
      return !mapped.includes(String(m.gameId));
    });

    const queries = uniqueMatchHistory.map((match) => {
      return db.game.upsert({
        where: {
          user_id_game_id_summoner_id: {
            game_id: String(match.gameId),
            user_id: Number(userId),
            summoner_id: String(summonerId),
          },
        },
        create: {
          game_id: String(match.gameId),
          user_id: Number(userId),
          region: match.platformId,
          status: 'pending',
          type: 'notification',
          timestamp: new Date(match.gameCreation),
          lane: match.lane,
          summoner_id: String(summonerId),
          championA: {
            connect: {
              id: match.champion_id,
            },
          },
          championB: {
            connect: {
              id: match.opponent_id,
            },
          },
        },
        update: {},
      });
    });

    await Promise.all(queries);

    return this.db.findMany({
      where: {
        user_id: Number(userId),
        summoner_id: String(summonerId),
        type: 'notification',
        status: 'pending',
      },
    });
  }

  async updateNotifications(payload, userId, summonerId) {
    const queries = payload.map((game) => {
      return db.game.update({
        where: {
          user_id_game_id_summoner_id: {
            user_id: Number(userId),
            game_id: String(game.gameId),
            summoner_id: String(summonerId),
          },
        },
        data: {
          status: game.state,
        },
      });
    });

    await Promise.all(queries);

    return true;
  }

  async createOrUpdateMatchup(
    userId,
    { lane, champion_id, opponent_id, gameId, win }
  ) {
    let matchup = await this.findMatchup(userId, {
      lane,
      champion_id,
      opponent_id,
    });

    if (matchup == null) {
      matchup = {
        games_played: 0,
        games_won: 0,
        games_lost: 0,
      };
    }

    const resource = db.matchup.upsert({
      create: {
        lane,
        game_id: String(gameId),
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
        games_played: 1,
        games_won: win ? 1 : 0,
        games_lost: !win ? 1 : 0,
      },
      update: {
        games_played: matchup.games_played + 1,
        game_id: String(gameId),
        games_won: win ? matchup.games_won + 1 : matchup.games_won,
        games_lost: !win ? matchup.games_lost + 1 : matchup.games_lost,
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

  async findMatchup(userId, { lane, champion_id, opponent_id }) {
    const resource = await db.matchup.findOne({
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
        games_won: true,
        games_lost: true,
      },
    });

    return resource;
  }

  async addAccountId(summonerId, id) {
    await db.summoner.update({
      where: {
        id: Number(id),
      },
      data: {
        summonerId: String(summonerId),
      },
    });
  }
}

module.exports = new GameModel(db.game);

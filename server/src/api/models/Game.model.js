const { db } = require('../../config/database');
const Model = require('./Model');
const lodash = require('lodash');

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

    const uniqueMatchHistory = matchHistory.filter((m) => {
      const mapped = currentMatchHistory.map((match) => match.game_id);
      return !mapped.includes(String(m.gameId));
    });

    const queries = uniqueMatchHistory.map((match) => {
      return this.db.upsert({
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
          timestamp: new Date(match.timestamp),
          lane: match.lane,
          summoner_id: String(summonerId),
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
}

module.exports = new GameModel(db.game);

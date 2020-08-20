const axios = require('axios');
const { db } = require('../config/database');

class Riot {
  static endpoints = {
    version: 'https://ddragon.leagueoflegends.com/api/versions.json',
    splash: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash',
    image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading',
    icon: 'https://ddragon.leagueoflegends.com/cdn/img/champion',
  };

  static async syncStaticData() {
    try {
      const {
        data: [latest],
      } = await axios.get(this.endpoints.version);

      const cached = await db.champion.findMany();

      if (cached.length < 1 || cached[0].version !== latest) {
        const { data } = await axios.get(
          `https://ddragon.leagueoflegends.com/cdn/${latest}/data/en_US/champion.json`
        );
        const { version, data: championsObj } = data;

        const champions = Object.values(championsObj).map((champ) => ({
          id: Number(champ.key),
          name: champ.name,
          image: `${this.endpoints.image}/${champ.id}_0.jpg`,
          splash: `${this.endpoints.splash}/${champ.id}_0.jpg`,
          icon: `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.id}.png`,
          version,
        }));

        for await (const champion of champions) {
          await db.champion.upsert({
            create: {
              ...champion,
            },
            update: {
              ...champion,
            },
            where: {
              id: champion.id,
            },
          });
        }
      }
    } catch (err) {
      throw err;
    }
  }

  static async getSummoner(summonerName, region = 'euw1') {
    try {
      const { data } = await axios.get(
        `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.API_KEY}`
      );
      return data;
    } catch (err) {
      throw err;
    }
  }

  static async findMatch(summonerId, region = 'euw1') {
    try {
      const { data } = await axios.get(
        `https://${region}1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerId}?api_key=${process.env.API_KEY}`
      );
      return data;
    } catch (err) {
      throw err;
    }
  }

  static async getGameResults(matchId, region = 'euw1') {
    try {
      const data = await axios.get(
        ` https://${region}1.api.riotgames.com/lol/match/v4/matches/${matchId}?api_key=${process.env.API_KEY}`
      );
      return data;
    } catch (_) {
      return null;
    }
  }
}

module.exports = Riot;

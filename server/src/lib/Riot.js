const axios = require('axios');
const { db } = require('../config/database');
const { NotFoundError } = require('../helpers/error');

class Riot {
  static API_KEY = `?api_key=${process.env.API_KEY}`;

  static endpoints = {
    version: 'https://ddragon.leagueoflegends.com/api/versions.json',
    splash: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash',
    image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading',
    icon: 'https://ddragon.leagueoflegends.com/cdn/img/champion',
  };

  static regions = {
    EUW: 'EUW1',
    EUN: 'EUN1',
    BR: 'BR1',
    JP: 'JP1',
    KR: 'KR',
    LAN: 'LA1',
    LAS: 'LA2',
    NA: 'NA1',
    OC: 'OC1',
    TR: 'TR1',
    RU: 'RU',
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

  static async getSummoner(summonerName, region = this.regions.EUW) {
    try {
      const { data } = await axios.get(
        `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURI(
          summonerName
        )}${Riot.API_KEY}`
      );
      return data;
    } catch (err) {
      throw err;
    }
  }

  static async findMatch(summonerId, region = this.regions.EUW) {
    try {
      const { data } = await axios.get(
        `https://${region}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerId}${Riot.API_KEY}`
      );
      return data;
    } catch (err) {
      throw new NotFoundError('currently not in a match');
    }
  }

  static async getGameResults(matchId, region = this.regions.EUW) {
    try {
      const data = await axios.get(
        `https://${region}.api.riotgames.com/lol/match/v4/matches/${matchId}${Riot.API_KEY}`
      );
      return data;
    } catch (_) {
      return null;
    }
  }

  //? summonerId (can't rename in prisma..)
  //! 	There is a known issue that this field doesn't correctly return the total number of games that match the parameters of the request.
  //    Please paginate using beginIndex until you reach the end of a player's matchlist.
  static async getMatchHistory(lastRecordedMatchupInMs, region, accountId) {
    const data = await axios.get(
      `https://${region}.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}${Riot.API_KEY}&beginTime=${lastRecordedMatchupInMs}`
    );

    return data;
  }

  static getRegions() {
    return this.regions;
  }
}

module.exports = Riot;

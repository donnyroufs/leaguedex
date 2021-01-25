const axios = require('axios');
const { db } = require('../config/database');
const { NotFoundError } = require('../helpers/error');
const SupportChampions = require('../data/SupportChampions');

class Riot {
  static API_KEY = `?api_key=${process.env.API_KEY}`;

  static LANES = {
    NONE: 'NONE',
    BOTTOM: 'BOTTOM',
    BOT: 'BOT',
    MID: 'MIDDLE',
    TOP: 'TOP',
    JUNGLE: 'JUNGLE',
    ADC: 'ADC',
    SUPPORT: 'SUPPORT',
  };

  static LANES_FILTERED = {
    TOP: 'top',
    MID: 'mid',
    JUNGLE: 'jungle',
    ADC: 'adc',
    SUPPORT: 'support',
  };

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
    const { data } = await axios
      .get(
        `https://${region}.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}${Riot.API_KEY}&beginTime=${lastRecordedMatchupInMs}`
      )
      .catch((_) => []);

    return data;
  }

  static async getChampionsFromMatch(gameId, region, accountId, lane) {
    const match = await Riot.getGameResults(gameId, region);

    if ((match && !match.hasOwnProperty('data')) || match == null) {
      return null;
    }

    const gameData = match.data;

    if (gameData.gameMode !== 'CLASSIC') {
      return null;
    }

    const result = gameData.participantIdentities.find(
      ({ player }) => player.accountId === accountId
    );

    if (!result) {
      return null;
    }

    const { participantId } = result;

    const me = gameData.participants.find(
      (player) => player.participantId === participantId
    );

    const opponents = gameData.participants.filter(
      (player) =>
        player.participantId !== me.participantId && player.teamId !== me.teamId
    );

    const opponent = Riot.getGuessedOpponent(opponents, me);

    if (!opponent) {
      return null;
    }

    return {
      ...gameData,
      lane,
      champion_id: me.championId,
      opponent_id: opponent.championId,
    };
  }

  static async getGameResultAndMatchupInfo(gameId, accountId, region, lane) {
    const matches = await Riot.getGameResults(gameId, region);

    if ((matches && !matches.hasOwnProperty('data')) || matches == null) {
      return null;
    }

    const gameData = matches.data;

    if (gameData.gameMode !== 'CLASSIC') {
      return null;
    }

    const { teamId: wonTeam } = gameData.teams.find(
      (team) => team.win === 'Win'
    );

    const result = gameData.participantIdentities.find(
      ({ player }) => player.accountId === accountId
    );

    if (!result) {
      return null;
    }

    const { participantId } = result;

    const me = gameData.participants.find(
      (player) => player.participantId === participantId
    );

    const opponents = gameData.participants.filter(
      (player) =>
        player.participantId !== me.participantId && player.teamId !== me.teamId
    );

    const opponent = Riot.getGuessedOpponent(opponents, me);

    // !BUG: Riot api doesn't give me the correct lanes so some games might be missing because it cant find an opponent
    if (!opponent) {
      return null;
    }

    const championA = await Riot._getChampionById(Number(me.championId));
    const championB = await Riot._getChampionById(Number(opponent.championId));

    return {
      id: gameId,
      timestamp: new Date(gameData.gameCreation),
      win: me.teamId === wonTeam,
      me: {
        ...me,
        timeline: {
          ...me.timeline,
          lane,
        },
      },
      opponent: {
        ...opponent,
        timeline: {
          ...opponent.timeline,
          lane,
        },
      },
      championA,
      championB,
    };
  }

  static getRegions() {
    return this.regions;
  }

  static async _getChampionById(id) {
    return db.champion.findOne({
      where: {
        id,
      },
    });
  }

  static async serializeMatchHistory(data, accountId) {
    const calculatedLanes =
      data && data.matches
        ? data.matches
            .filter(({ lane }) => lane !== Riot.LANES.NONE)
            .map((m) => {
              if (Riot._isSupport(m.lane, m.champion)) {
                return {
                  ...m,
                  lane: Riot.LANES.SUPPORT,
                };
              } else if (Riot._isAdc(m.lane, m.champion)) {
                return {
                  ...m,
                  lane: Riot.LANES.ADC,
                };
              } else {
                return {
                  ...m,
                };
              }
            })
        : [];

    const queries = calculatedLanes.map((match) => {
      return Riot.getChampionsFromMatch(
        match.gameId,
        match.region,
        accountId,
        match.lane
      );
    });

    return Promise.all(queries);
  }

  static _isAdc(lane, champion) {
    return lane === Riot.LANES.BOTTOM && !SupportChampions.includes(champion);
  }
  static _isSupport(lane, champion) {
    return lane === Riot.LANES.BOTTOM && SupportChampions.includes(champion);
  }

  // Seems like there can be multiple of the same lanes? (riot api related)
  static getGuessedOpponent(opponents, me) {
    if (me.timeline.lane !== Riot.LANES.BOTTOM)
      return opponents.find((o) => o.timeline.lane === me.timeline.lane);

    const _newOpponents = opponents.filter(
      (o) => o.timeline.lane === Riot.LANES.BOTTOM
    );

    const isAdc = Riot._isAdc(me.timeline.lane, me.championId);

    if (isAdc) {
      return _newOpponents.find(
        (o) => !SupportChampions.includes(o.championId)
      );
    } else {
      return _newOpponents.find((o) => SupportChampions.includes(o.championId));
    }
  }

  static async getSummonerById(summonerId, region) {
    const data = await axios.get(
      `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/${summonerId}${Riot.API_KEY}`
    );

    return data;
  }
}

module.exports = Riot;

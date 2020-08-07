const axios = require("axios");
const { db } = require("../config/database");

class Riot {
  static endpoints = {
    champions:
      "http://ddragon.leagueoflegends.com/cdn/10.15.1/data/en_US/champion.json",
    icon: "http://ddragon.leagueoflegends.com/cdn/10.15.1/img/champion",
    splash: "http://ddragon.leagueoflegends.com/cdn/img/champion/splash",
  };

  static async syncChampions() {
    try {
      const { data } = await axios.get(this.endpoints.champions);
      const { version, data: championsObj } = data;

      const cached = await db.champion.findMany();

      if (cached.length < 1 || cached[0].version !== version) {
        const champions = Object.values(championsObj).map((champ) => ({
          id: Number(champ.key),
          name: champ.name,
          image: `${this.endpoints.splash}/${champ.id}_0.jpg`,
          tags: champ.tags.join(", "),
          lore: champ.blurb,
          version,
        }));

        for await (const champion of champions) {
          await db.champion.create({
            data: {
              ...champion,
            },
          });
        }
      }
    } catch (err) {
      throw err;
    }
  }

  static async getSummoner(summonerName, region = "euw1") {
    try {
      const { data } = await axios.get(
        `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.API_KEY}`
      );
      return data;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Riot;

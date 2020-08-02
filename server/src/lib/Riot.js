const axios = require("axios");
const Champion = require("../api/models/champion.model");

class Riot {
  static endpoints = {
    champions:
      "http://ddragon.leagueoflegends.com/cdn/10.15.1/data/en_US/champion.json",
  };

  static async syncChampions() {
    try {
      const { data } = await axios.get(this.endpoints.champions);
      const { version, data: championsObj } = data;

      const cached = await Champion.findOne();

      if (!cached || cached.version !== version) {
        const champions = Object.values(championsObj).map((champ) => ({
          championId: champ.key,
          name: champ.name,
          image: champ.image.full,
          tags: champ.tags,
          lore: champ.blurb,
          version: version,
        }));

        Champion.insertMany(champions);
      }
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Riot;

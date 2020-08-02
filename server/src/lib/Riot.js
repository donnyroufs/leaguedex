const axios = require("axios");
const { db } = require("../config/database");

class Riot {
  static endpoints = {
    champions:
      "http://ddragon.leagueoflegends.com/cdn/10.15.1/data/en_US/champion.json",
  };

  static async syncChampions() {
    try {
      const { data } = await axios.get(this.endpoints.champions);
      const { version, data: championsObj } = data;

      const cached = await db.champion.findMany();

      if (!cached || cached[0].version !== version) {
        const champions = Object.values(championsObj).map((champ) => ({
          id: Number(champ.key),
          name: champ.name,
          image: champ.image.full,
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
}

module.exports = Riot;

const champions = require('./champions.json');

async function championFactory(champion) {
  return {
    data: {
      ...champion,
    },
  };
}

async function buildChampions() {
  let data = [];

  for (let i = 0; i < champions.length; i++) {
    data.push(await championFactory(champions[i]));
  }

  return data;
}

module.exports = { buildChampions };

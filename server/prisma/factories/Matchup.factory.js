const champions = require('./champions.json');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const championIds = champions.map((c) => c.id);

prisma.matchup.create({
  data: {
    lane: 'mid',
    games_played: 1,
    championA: {
      connect: {
        id: 34,
      },
    },
    championB: {
      connect: {
        id: 103,
      },
    },
    user: {
      connect: {
        id: 1,
      },
    },
  },
});

async function matchupFactory({
  lane = 'mid',
  games_played = 1,
  championA = 34,
  championB = 103,
  user = 1,
} = {}) {
  return {
    data: {
      lane,
      games_played,
      championA: {
        connect: {
          id: championA,
        },
      },
      championB: {
        connect: {
          id: championB,
        },
      },
      user: {
        connect: {
          id: user,
        },
      },
    },
  };
}

async function buildMatchups() {
  let data = [];

  for (let i = 0; i < championIds.length; i++) {
    data.push(
      await matchupFactory({
        championA: championIds[i],
        championB: championIds[championIds.length - 1],
        user: 1,
      })
    );
  }

  return data;
}

module.exports = { buildMatchups };

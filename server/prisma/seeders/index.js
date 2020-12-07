const { PrismaClient } = require('@prisma/client');
const { buildUsers } = require('../factories/User.factory');
const { buildChampions } = require('../factories/Champion.factory');
const { buildMatchups } = require('../factories/Matchup.factory');

const prisma = new PrismaClient();

const run = async () => {
  const users = await buildUsers(5);
  const champions = await buildChampions();
  const matchups = await buildMatchups();

  // Seed users
  for await (let user of users) {
    await prisma.user.create(user);
  }

  // Seed champions
  for await (let champion of champions) {
    await prisma.champion.create(champion);
  }

  // Seed matchups
  for await (let matchup of matchups) {
    await prisma.matchup.create(matchup);
  }
};

run()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

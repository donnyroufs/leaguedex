const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

const validateConnection = async () => {
  try {
    await db.user.findMany({ take: 1 });
    console.log('Database connected..');
  } catch (err) {
    throw err;
  }
};

module.exports = {
  db,
  validateConnection,
};

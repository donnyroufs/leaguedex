const { PrismaClient } = require('@prisma/client');

// const config = {
//   log: ['query'],
// };

const db = new PrismaClient();

const validateConnection = async () => {
  try {
    await db.user.findMany();
    console.log('Database connected..');
  } catch (err) {
    throw err;
  }
};

module.exports = {
  db,
  validateConnection,
};

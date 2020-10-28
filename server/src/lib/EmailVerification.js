const { db } = require('../config/database');

// Cleanup inactive user accounts with a ONE day interval
async function cleanupVerifications() {
  const inactiveUsers = await db.$queryRaw(`
    SELECT
      "User_verification"."user_id"
    FROM
      "User_verification"
    WHERE
      "User_verification"."createdAt" < NOW() - INTERVAL '1 days'
  `);

  if (!inactiveUsers) return;

  const queries = inactiveUsers.map(({ user_id }) => {
    return db.user_verification.delete({
      where: {
        user_id,
      },
    });
  });

  const userQueries = inactiveUsers.map(({ user_id: id }) => {
    return db.user.delete({
      where: {
        id,
      },
    });
  });

  await db.$transaction(queries);
  await db.$transaction(userQueries);
}

module.exports = { cleanupVerifications };

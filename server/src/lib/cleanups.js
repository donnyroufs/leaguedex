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

async function cleanupPasswordResets() {
  const inactiveResets = await db.$queryRaw(`
    SELECT
      "User_reset_password"."user_id"
    FROM
      "User_reset_password"
    WHERE
      "User_reset_password"."createdAt" < NOW() - INTERVAL '1 days'
  `);

  if (!inactiveResets) return;

  const queries = inactiveResets.map(({ user_id }) => {
    return db.user_reset_password.delete({
      where: {
        user_id,
      },
    });
  });

  await db.$transaction(queries);
}
module.exports = { cleanupVerifications, cleanupPasswordResets };

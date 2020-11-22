const { resolve } = require('path');
const dotenv = require('dotenv');
const app = require('./Application');

dotenv.config({ path: resolve(__dirname, '../.env') });

app.initialize(
  ({ Riot, RiotAssetsJob, EmailVerificationsJob, RemovePasswordResetsJob }) => {
    // Sync riot assets
    Riot.syncStaticData();

    // Then every other hour check if our data is still up to date.
    RiotAssetsJob.start();

    // Run CRON job for user email verification 00:00
    EmailVerificationsJob.start();

    // Run CRON job for user password resets 00:00
    RemovePasswordResetsJob.start();
  }
);

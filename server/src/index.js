const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const app = require('./Application');

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

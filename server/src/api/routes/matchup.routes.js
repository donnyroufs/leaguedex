const express = require('express');
const Controller = require('../controllers/Matchup.controller');
const { db } = require('../../config/database');
const Auth = require('../../lib/Auth');
const formatters = require('../formatters/matchup.formatters');

const router = express.Router();
const controller = new Controller({
  model: db.matchup,
  formatters,
});

router.post('/create', Auth.authenticateToken, controller.createOne);
router.get('/info', Auth.authenticateToken, controller.getInfoCard);
router.get('/played', Auth.authenticateToken, controller.getPlayedChampions);

module.exports = router;

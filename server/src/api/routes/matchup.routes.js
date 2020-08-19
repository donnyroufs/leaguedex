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
router.get('/all', Auth.authenticateToken, controller.getMatchups);
router.get('/info', Auth.authenticateToken, controller.getInfoCard);
router.get('/played', Auth.authenticateToken, controller.getPlayedChampions);
router.get('/find', Auth.authenticateToken, controller.findGame);
router.get('/latest/:id', Auth.authenticateToken, controller.getLatest);
router.get('/:id', Auth.authenticateToken, controller.getDex);

module.exports = router;

const express = require('express');
const Controller = require('../controllers/Matchup.controller');
const { db } = require('../../config/database');
const Auth = require('../../lib/Auth');
const formatters = require('../formatters/matchup.formatters');
const { syncMatchup } = require('../middleware/syncMatchup.middleware');

const router = express.Router();
const controller = new Controller(db.matchup, formatters);

router.use(Auth.authenticateToken);

router.put('/revert', controller.revertMatchup);
router.put('/private', controller.updatePrivate);
router.get('/sync', controller.syncAll);
router.post('/create', controller.createOne);
router.get('/all', controller.getMatchups);
router.get('/info', controller.getInfoCard);
router.get('/played', controller.getPlayedChampions);
router.get('/find', controller.findGame);
router.get('/latest/:id', syncMatchup, controller.getLatest);
router.get('/:id', controller.getDex);

module.exports = router;

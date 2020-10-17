const express = require('express');
const Controller = require('../controllers/Matchup.controller');
const { db } = require('../../config/database');
const Auth = require('../../lib/Auth');
const formatters = require('../formatters/matchup.formatters');
const { syncMatchup } = require('../middleware/syncMatchup.middleware');
const model = require('../models/Matchup.model');
const wrap = require('../../helpers/wrap');

const router = express.Router();
const controller = new Controller(model, formatters);

router.use(Auth.authenticateToken);

router.put('/revert', wrap(controller.revertMatchup));
router.put('/private', wrap(controller.updatePrivate));
router.get('/sync', wrap(controller.syncAll)); //! not needed
router.get('/all', wrap(controller.getMatchups));
router.get('/info', wrap(controller.getInfoCard));
router.get('/played', wrap(controller.getPlayedChampions));
router.get('/latest/:id', syncMatchup, wrap(controller.getLatest));
router.get('/:id', wrap(controller.getDex));
router.post('/', wrap(controller.createOne));
router.get('/', wrap(controller.findGame));

module.exports = router;

const express = require('express');
const Controller = require('../controllers/Matchup.controller');
const { db } = require('../../config/database');
const Auth = require('../../lib/Auth');

const router = express.Router();
const controller = new Controller(db.matchup);

router.post('/create', Auth.authenticateToken, controller.createOne);
router.get('/played', Auth.authenticateToken, controller.getPlayedChampions);

module.exports = router;

const express = require('express');
const Controller = require('../controllers/Game.controller');
const Auth = require('../../lib/Auth');
const wrap = require('../../helpers/wrap');
const model = require('../models/Game.model');
const formatter = require('../formatters/game.formatters');

const router = express.Router();
const controller = new Controller(model, formatter);

router.use(Auth.authenticateToken);

router.get('/', wrap(controller.getMatchHistory));

module.exports = router;

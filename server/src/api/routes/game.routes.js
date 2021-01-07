const express = require('express');
const Controller = require('../controllers/Game.controller');
const Auth = require('../../lib/Auth');
const wrap = require('../../helpers/wrap');
const model = require('../models/Game.model');

const router = express.Router();
const controller = new Controller(model);

router.use(Auth.authenticateToken);

router.get('/', wrap(controller.getRecentGameDate));

module.exports = router;

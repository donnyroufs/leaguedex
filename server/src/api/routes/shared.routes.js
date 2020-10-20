const express = require('express');
const Controller = require('../controllers/Shared.controller');
const model = require('../models/Shared.model');
const wrap = require('../../helpers/wrap');
const formatters = require('../formatters/shared.formatters');

const router = express.Router();
const controller = new Controller(model, formatters);

router.get('/:userId/dex/note', wrap(controller.findByMatchupId));
router.get('/:username/dex', wrap(controller.findByUsernameAndId));
router.get('/', wrap(controller.findManyByUsername));

module.exports = router;

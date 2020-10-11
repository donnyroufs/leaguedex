const express = require('express');
const Controller = require('../controllers/Controller');
const model = require('../models/Champion.model');
const { db } = require('../../config/database');
const wrap = require('../../helpers/wrap');

const router = express.Router();
const controller = new Controller(model, db.champion);

router.get('/', wrap(controller.all));
router.get('/:name', wrap(controller.findOneByName));

module.exports = router;

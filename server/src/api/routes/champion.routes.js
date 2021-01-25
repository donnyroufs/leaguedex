const express = require('express');
const Controller = require('../controllers/Champion.controller');
const model = require('../models/Champion.model');
const { db } = require('../../config/database');
const wrap = require('../../helpers/wrap');

const router = express.Router();
const controller = new Controller(model);

router.get('/opponents', wrap(controller.allWithoutMe));
router.get('/:name', wrap(controller.findOneByName));
router.get('/', wrap(controller.all));

module.exports = router;

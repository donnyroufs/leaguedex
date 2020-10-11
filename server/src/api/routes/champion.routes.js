const express = require('express');
const Controller = require('../controllers/Controller');
const model = require('../models/Champion.model');

const router = express.Router();
const controller = new Controller(model);

router.get('/', controller.all);
router.get('/:name', controller.findOneByName);

module.exports = router;

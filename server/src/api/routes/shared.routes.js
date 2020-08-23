const express = require('express');
const Controller = require('../controllers/Shared.controller');

const router = express.Router();
const controller = new Controller();

router.get('/:userId/dex/note', controller.findByMatchupId);
router.get('/:username/dex', controller.findByUsernameAndId);
router.get('/', controller.findManyByUsername);

module.exports = router;

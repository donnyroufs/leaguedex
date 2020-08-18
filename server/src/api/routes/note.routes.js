const express = require('express');
const Controller = require('../controllers/Note.controller');
const { db } = require('../../config/database');
const Auth = require('../../lib/Auth');

const router = express.Router();
const controller = new Controller({
  model: db.note,
});

router.post('/create', Auth.authenticateToken, controller.createOne);
router.get('/dex/:id', Auth.authenticateToken, controller.findByMatchupId);

module.exports = router;

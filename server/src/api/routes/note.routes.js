const express = require('express');
const Controller = require('../controllers/Note.controller');
const { db } = require('../../config/database');
const Auth = require('../../lib/Auth');
const { createValidator } = require('express-joi-validation');
const { createNote } = require('../validators/Note.validators');
const { wrap } = require('../../helpers/wrap');

const validator = createValidator();

const router = express.Router();
const controller = new Controller({
  model: db.note,
});

router.post(
  '/create',
  Auth.authenticateToken,
  validator.body(createNote),
  wrap(controller.createOne)
);
router.delete('/:noteId', Auth.authenticateToken, wrap(controller.deleteOne));
router.get(
  '/dex/:id',
  Auth.authenticateToken,
  wrap(controller.findByMatchupId)
);

module.exports = router;

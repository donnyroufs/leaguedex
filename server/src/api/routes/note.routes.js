const express = require('express');
const Controller = require('../controllers/Note.controller');
const Auth = require('../../lib/Auth');
const { createValidator } = require('express-joi-validation');
const { createNote } = require('../validators/Note.validators');
const wrap = require('../../helpers/wrap');
const model = require('../models/Note.model');
const formatters = require('../formatters/note.formatters');

const validator = createValidator();

const router = express.Router();
const controller = new Controller(model, formatters);

router.use(Auth.authenticateToken);

router.get('/dex/:id', wrap(controller.findByMatchId));
router.post('/create', validator.body(createNote), wrap(controller.createOne));
router.delete('/:noteId', wrap(controller.deleteOne));

module.exports = router;

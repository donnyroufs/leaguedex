const express = require('express');
const Controller = require('../controllers/User.controller');
const Auth = require('../../lib/Auth');
const { createValidator } = require('express-joi-validation');
const { userLogin, userRegister } = require('../validators/User.validators');
const { db } = require('../../config/database');
const formatters = require('../formatters/user.formatters');

const validator = createValidator();

const router = express.Router();
const controller = new Controller({
  model: db.user,
  auth: Auth,
  formatters,
});

router.get('/', Auth.authenticateToken, controller.all);

router.post('/register', validator.body(userRegister), controller.create);
router.post('/login', validator.body(userLogin), controller.login);

router.delete('/logout', Auth.validateRefreshToken, controller.destroy);
router.get('/refresh', Auth.validateRefreshToken, controller.refresh);

router.post(
  '/summoner',
  Auth.authenticateToken,
  controller.addSummmonerAccount
);

module.exports = router;

const express = require('express');
const Controller = require('../controllers/User.controller');
const Auth = require('../../lib/Auth');
const { createValidator } = require('express-joi-validation');
const {
  userLogin,
  userRegister,
  resetPassword,
} = require('../validators/User.validators');
const formatters = require('../formatters/user.formatters');
const model = require('../models/User.model');
const wrap = require('../../helpers/wrap');

const validator = createValidator();

const router = express.Router();
const controller = new Controller(model, formatters, Auth);

router.get('/renew', Auth.validateRefreshToken, wrap(controller.renew));
router.get('/region', wrap(controller.getRegions));

router.get('/:email', wrap(controller.sendResetPasswordEmail));
router.patch(
  '/reset_password',
  validator.body(resetPassword),
  wrap(controller.resetPassword)
);
router.patch('/verify/email', wrap(controller.verifyEmail));
router.post('/register', validator.body(userRegister), wrap(controller.create));
router.post('/login', validator.body(userLogin), wrap(controller.login));

router.delete('/logout', Auth.validateRefreshToken, wrap(controller.destroy));
router.get('/refresh', Auth.validateRefreshToken, wrap(controller.refresh));

router.post(
  '/summoner',
  Auth.authenticateToken,
  wrap(controller.addSummmonerAccount)
);

router.get('/', Auth.authenticateToken, Auth.isAdmin, wrap(controller.all));

module.exports = router;

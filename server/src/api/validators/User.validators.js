const Joi = require('@hapi/joi');

module.exports = {
  userRegister: Joi.object({
    username: Joi.string().min(4).max(16).required(),
    password: Joi.string().min(6).max(256).required(),
    password_confirmation: Joi.ref('password'),
    email: Joi.string().email(),
  }),
  userLogin: Joi.object({
    username: Joi.string().min(4).max(16).required(),
    password: Joi.string().min(6).max(256).required(),
  }),
  resetPassword: Joi.object({
    token: Joi.string().required(),
    password: Joi.string().min(6).max(256).required(),
    password_confirmation: Joi.ref('password'),
  }),
};

const { Joi } = require("express-joi");

module.exports = {
  userRegister: {
    username: Joi.string().min(4).max(16).required(),
    password: Joi.string().min(6).max(16).required(),
    password_confirmation: Joi.string().min(6).max(16).required(),
    email: Joi.string().email(),
  },
  userLogin: {
    username: Joi.string().min(4).max(16).required(),
    password: Joi.string().min(6).max(16).required(),
  },
};

// password_confirmation: Joi.string().valid(Joi.ref("password")).required(),

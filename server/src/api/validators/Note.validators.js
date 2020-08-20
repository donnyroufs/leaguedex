const Joi = require('@hapi/joi');

module.exports = {
  createNote: Joi.object({
    content: Joi.string().min(1).max(200).required(),
    tags: Joi.string().allow('').required(),
    matchupId: Joi.string().min(1).max(32).required(),
  }),
};

const { Joi, celebrate } = require('celebrate');

const URL_REGEXP = /^(https?|ftp):\/\/((?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6})([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;

module.exports.validateCardData = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(URL_REGEXP),
  }),
});

module.exports.validateCardById = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

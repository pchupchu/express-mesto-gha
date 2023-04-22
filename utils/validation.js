const { celebrate, Joi } = require('celebrate');

module.exports.validationSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(
      new RegExp('^(https?:\\/\\/)(www\\.)?[^\\s$.?#].[^\\s]*$')
    ),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

module.exports.validationSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

module.exports.validationUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
});

module.exports.validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

module.exports.validationUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(
      new RegExp('^(https?:\\/\\/)(www\\.)?[^\\s$.?#].[^\\s]*$')
    ),
  }),
});

module.exports.validationCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().pattern(
      new RegExp('^(https?:\\/\\/)(www\\.)?[^\\s$.?#].[^\\s]*$')
    ),
  }),
});

module.exports.validationCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

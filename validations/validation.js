const joi = require("joi");

const registerValidation = (data) => {
  const schemaValidation = joi.object({
    username: joi.string().min(3).max(256).required(),
    email: joi.string().min(6).max(256).required().email(),
    password: joi.string().min(6).required(),
  });

  return schemaValidation.validate(data);
};

const loginValidation = (data) => {
  const schemaValidation = joi.object({
    email: joi.string().min(6).max(256).required().email(),
    password: joi.string().min(6).required(),
  });

  return schemaValidation.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

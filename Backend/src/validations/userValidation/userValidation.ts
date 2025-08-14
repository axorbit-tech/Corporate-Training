import Joi from "joi";

export const userSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } }) // validate email format without restricting TLDs
    .pattern(/@(email\.com|gmail\.com|outlook\.com|yahoo\.com|apple\.com)$/)
    .required()
    .messages({
      "string.pattern.base": "Email domain must be one of: email.com, gmail.com, outlook.com, yahoo.com, apple.com",
    }),
  name: Joi.string().required(),
  phone: Joi.number().required(),
  age: Joi.number().optional(),
  sex: Joi.string().optional(),
  subject: Joi.string().optional(),
  message: Joi.string().optional(),
});

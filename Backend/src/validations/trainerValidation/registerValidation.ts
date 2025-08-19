import Joi from "joi";

export const trainerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } }) // validate email format without restricting TLDs
    .pattern(/@(email\.com|gmail\.com|outlook\.com|yahoo\.com|apple\.com)$/)
    .required()
    .messages({
      "string.pattern.base":
        "Email domain must be one of: email.com, gmail.com, outlook.com, yahoo.com, apple.com",
    }),
  phone: Joi.number().required(),
  designation: Joi.string().required(),
  website: Joi.string().optional().allow(""),
  language: Joi.string().required(),
  experience: Joi.number().required(),
  company: Joi.string().required(),
  selectedServices: Joi.array().required(),
  selectedSubServices: Joi.array().required(),
  country: Joi.string().required(),
  state: Joi.string().required(),
});

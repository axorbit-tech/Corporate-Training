import Joi from "joi";

export const languageSchema = Joi.object({
  language: Joi.string().required(),
  code: Joi.string().required(),
});

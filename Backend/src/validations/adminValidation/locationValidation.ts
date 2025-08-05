import Joi from "joi";

export const locationSchema = Joi.object({
  location: Joi.string().required(),
  code: Joi.string().required(),
});

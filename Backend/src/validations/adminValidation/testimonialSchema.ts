import Joi from "joi";

export const testimonialSchema = Joi.object({
  user: Joi.string().required(),
  role: Joi.string().required(),
  content: Joi.string().required(),
});

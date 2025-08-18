import Joi from "joi";

export const eventSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  date: Joi.string().required()
});

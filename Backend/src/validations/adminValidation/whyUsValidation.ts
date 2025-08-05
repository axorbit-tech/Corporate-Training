import Joi from "joi";

export const whyUsSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

import Joi from "joi";

export const blogSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

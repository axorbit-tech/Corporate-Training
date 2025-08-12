import Joi from "joi";

export const serviceValidationSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});
import Joi from "joi";

export const enquirySchema = Joi.object({
  userId: Joi.string().required(),
  message: Joi.string().required(),
  subject: Joi.string().required(),
});

import Joi from "joi";

export const authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const changePassSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(8).required(),
  confirmPassword: Joi.string().min(8).required()
})

export const forgotPassSchema = Joi.object({
  emial : Joi.string().email().required()
})

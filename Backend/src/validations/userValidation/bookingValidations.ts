import Joi, { date } from "joi";

export const bookingSchema = Joi.object({
    service: Joi.string().required(),
    country: Joi.string().required(),
    state: Joi.string().required(),
    age: Joi.number().required(),
    phone: Joi.number().required(),
    email: Joi.string()
        .email({ tlds: { allow: false } }) // validate email format without restricting TLDs
        .pattern(/@(email\.com|gmail\.com|outlook\.com|yahoo\.com|apple\.com)$/)
        .required()
        .messages({
            "string.pattern.base": "Email domain must be one of: email.com, gmail.com, outlook.com, yahoo.com, apple.com",
        }),
    name: Joi.string().required(),
    date: Joi.string().required(),
});

import Joi from "joi";

export const createConsumedWaterSchema = Joi.object({
  amount: Joi.number().required().max(5000),
  date: Joi.string().required(),
});

export const updateConsumedWaterSchema = Joi.object({
  amount: Joi.number().required().max(5000),
  date: Joi.string().required(),
});

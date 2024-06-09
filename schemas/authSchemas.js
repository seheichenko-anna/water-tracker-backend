import Joi from "joi";

import { emailRegexp } from "../constans/user-constans.js";

export const userSignupSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  avatarURL: Joi.string(),
});

export const userSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const userUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().pattern(emailRegexp),
  gender: Joi.string(),
  password: Joi.string().min(6),
  newPassword: Joi.string().min(6),
});

export const userEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

export const userWaterRateSchema = Joi.object({
  waterRate: Joi.number().max(15000).required(),
});

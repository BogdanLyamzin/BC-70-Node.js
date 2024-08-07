import Joi from "joi";

import {emailRegexp} from "../constants/user-constants.js";

export const authSignupSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

export const authSigninSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

export const authEmailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
})

export const authRefreshTokenSchema = Joi.object({
    refreshToken: Joi.string().required(),
})

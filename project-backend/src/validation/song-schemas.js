import Joi from "joi";

import {releaseYearRegexp} from "../constants/song-constants.js";

export const songAddSchema = Joi.object({
    author: Joi.string().required().messages({
        "any.required": "author must be exist"
    }),
    name: Joi.string().required(),
    favorite: Joi.boolean(),
    genre: Joi.string().required(),
    releaseYear: Joi.string().pattern(releaseYearRegexp).required(),
})

export const songUpdateSchema = Joi.object({
    author: Joi.string(),
    name: Joi.string(),
    favorite: Joi.boolean(),
    genre: Joi.string(),
    releaseYear: Joi.string().pattern(releaseYearRegexp),
})

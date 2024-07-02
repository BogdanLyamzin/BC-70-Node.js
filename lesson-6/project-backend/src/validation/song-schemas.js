import Joi from "joi";

import {genreList, releaseYearRegexp} from "../constants/song-constants.js";

export const songAddSchema = Joi.object({
    author: Joi.string().required().messages({
        "any.required": "author must be exist"
    }),
    name: Joi.string().required(),
    favorite: Joi.boolean(),
    genre: Joi.string().valid(...genreList).required(),
    releaseYear: Joi.string().pattern(releaseYearRegexp).required(),
})

export const songUpdateSchema = Joi.object({
    author: Joi.string(),
    name: Joi.string(),
    favorite: Joi.boolean(),
    genre: Joi.string().valid(...genreList),
    releaseYear: Joi.string().pattern(releaseYearRegexp),
})

import {Schema, model} from "mongoose";

import { mongoSaveError, setMongoUpdateSettings } from "./hooks.js";

import {genreList, releaseYearRegexp} from "../../constants/song-constants.js";

const songSchema = new Schema({
    author: {
        type: String,
        required: [true, "Author must be exist"],
    },
    name: {
        type: String,
        required: true,
    },
    favorite: {
        type: Boolean,
        default: false,
        required: true,
    },
    genre: {
        type: String,
        enum: genreList,
        requird: true,
    },
    releaseYear: {
        type: String,
        match: releaseYearRegexp,
        required: true,
    }
}, {versionKey: false, timestamps: true});

songSchema.post("save", mongoSaveError);

songSchema.pre("findOneAndUpdate", setMongoUpdateSettings);

songSchema.post("findOneAndUpdate", mongoSaveError);

const Song = model("song", songSchema);

export default Song;

import {Schema, model} from "mongoose";

import { mongoSaveError, setMongoUpdateSettings } from "./hooks.js";

import { emailRegexp } from "../../constants/user-constants.js";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        match: emailRegexp,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    accessToken: {
        type: String,
    },
    refreshToken: {
        type: String,
    }
}, {versionKey: false, timestamps: true});

userSchema.post("save", mongoSaveError);

userSchema.pre("findOneAndUpdate", setMongoUpdateSettings);

userSchema.post("findOneAndUpdate", mongoSaveError);

const User = model("user", userSchema);

export default User;

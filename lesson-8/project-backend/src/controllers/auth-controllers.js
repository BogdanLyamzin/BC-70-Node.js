import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as authServices from "../services/auth-services.js";

import HttpError from "../utils/HttpError.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

const {JWT_SECRET} = process.env;

const signup = async(req, res)=> {
    const {email, password} = req.body;
    const user = await authServices.findUser({email});
    if(user) {
        throw HttpError(409, "Email already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await authServices.signup({...req.body, password: hashPassword});

    res.status(201).json({
        username: newUser.username,
        email: newUser.email,
    })
}

const signin = async(req, res)=> {
    const {email, password} = req.body;
    const user = await authServices.findUser({email});
    if(!user) {
        throw HttpError(401, "Email or password invalid");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
    }

    const {_id: id} = user;

    const payload = {id};

    const acccessToken = jwt.sign(payload, JWT_SECRET, {expiresIn: "15m"});
    const refreshToken = jwt.sign(payload, JWT_SECRET, {expiresIn: "7d"});

    res.json({
        acccessToken,
        refreshToken,
    })
}

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
}

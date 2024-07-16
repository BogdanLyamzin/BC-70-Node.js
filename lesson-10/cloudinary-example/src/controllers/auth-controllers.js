import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as authServices from "../services/auth-services.js";

import HttpError from "../utils/HttpError.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
    const { email, password } = req.body;
    const user = await authServices.findUser({ email });
    if (user) {
        throw HttpError(409, "Email already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await authServices.signup({ ...req.body, password: hashPassword });

    res.status(201).json({
        username: newUser.username,
        email: newUser.email,
    })
}

const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await authServices.findUser({ email });
    if (!user) {
        throw HttpError(401, "Email or password invalid");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
    }

    const { _id: id } = user;

    const payload = { id };

    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

    await authServices.updateUser({_id: id}, {accessToken, refreshToken});

    res.json({
        accessToken,
        refreshToken,
    })
}

const getCurrent = async(req, res)=> {
    const {username, email} = req.user;

    res.json({
        username,
        email,
    })
}

const refresh = async (req, res) => {
    const { refreshToken: token } = req.body;
    try {
        const { id } = jwt.verify(token, JWT_SECRET);

        const payload = { id };
        const acccessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
        const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

        res.json({
            acccessToken,
            refreshToken,
        })
    }
    catch (error) {
        next(HttpError(403, "Refresh token invalid"));
    }
}

const signout = async(req, res)=> {
    const {_id} = req.user;
    if(!user.refreshToken) {
        throw HttpError(403, "User already signout");
    }

    await authServices.updateUser({_id}, {accessToken: "", refreshToken: ""});

    res.json({
        message: "Signout successfully"
    })
}

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    refresh: ctrlWrapper(refresh),
    signout: ctrlWrapper(signout),
}

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

import * as authServices from "../services/auth-services.js";

import HttpError from "../utils/HttpError.js";
import sendEmail from "../utils/sendEmail.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

const { JWT_SECRET, BASE_URL } = process.env;

const signup = async (req, res) => {
    const { email, password } = req.body;
    const user = await authServices.findUser({ email });
    if (user) {
        throw HttpError(409, "Email already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const verificationCode = nanoid();

    const newUser = await authServices.signup({ ...req.body, password: hashPassword, verificationCode });

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click verify email</a>`
    };

    await sendEmail(verifyEmail);

    res.status(201).json({
        username: newUser.username,
        email: newUser.email,
    })
}

const verify = async(req, res)=> {
    const {verificationCode} = req.params;
    const user = await authServices.findUser({verificationCode});
    if(!user) {
        throw HttpError(400, "User not found or already verify");
    }

    await authServices.updateUser({_id: user._id}, {verify: true, verificationCode: ""});

    res.json({
        message: "Email verify success"
    })
}

const resendVerify = async(req, res)=> {
    const {email} = req.body;
    const user = await authServices.findUser({email});
    if(!user) {
        throw HttpError(404, "Email not found");
    }
    if(user.verify) {
        throw HttpError(400, "Email already verify");
    }

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Click verify email</a>`
    };

    await sendEmail(verifyEmail);

    res.json({
        message: "Verify email resend success"
    })
}

const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await authServices.findUser({ email });
    if (!user) {
        throw HttpError(401, "Email or password invalid");
    }

    if(!user.verify) {
        throw HttpError(401, "Email not verify");
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
    verify: ctrlWrapper(verify),
    resendVerify: ctrlWrapper(resendVerify),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    refresh: ctrlWrapper(refresh),
    signout: ctrlWrapper(signout),
}

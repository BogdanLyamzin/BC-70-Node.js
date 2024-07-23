import { Router } from "express";

import authControllers from "../controllers/auth-controllers.js";

import isEmptyBody from "../middlewares/isEmptyBody.js";
import authenticate from "../middlewares/authenticate.js";

import validateBody from "../decorators/validateBody.js";

import {authSignupSchema, authSigninSchema, authEmailSchema, authRefreshTokenSchema} from "../validation/auth-schemas.js";

const authRouter = Router();

authRouter.post("/signup", isEmptyBody, validateBody(authSignupSchema), authControllers.signup);

authRouter.get("/verify/:verificationCode", authControllers.verify);

authRouter.post("/verify", validateBody(authEmailSchema), authControllers.resendVerify);

authRouter.post("/signin", isEmptyBody, validateBody(authSigninSchema), authControllers.signin);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.post("/refresh", isEmptyBody, validateBody(authRefreshTokenSchema), authControllers.refresh);

authRouter.post("/signout", authenticate, authControllers.signout);

export default authRouter;

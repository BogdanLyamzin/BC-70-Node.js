import { Router } from "express";

import authControllers from "../controllers/auth-controllers.js";

import isEmptyBody from "../middlewares/isEmptyBody.js";

import validateBody from "../decorators/validateBody.js";

import {authSignupSchema, authSigninSchema} from "../validation/auth-schemas.js";

const authRouter = Router();

authRouter.post("/signup", isEmptyBody, validateBody(authSignupSchema), authControllers.signup);

authRouter.post("/signin", isEmptyBody, validateBody(authSigninSchema), authControllers.signin);

export default authRouter;

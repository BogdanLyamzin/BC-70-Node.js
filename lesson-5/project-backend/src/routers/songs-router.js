import {Router} from "express";

import songsControllers from "../controllers/songs-controllers.js";

import isValidId from "../middlewares/isValidId.js";

const songsRouter = Router();

songsRouter.get("/", songsControllers.getSongsController);

songsRouter.get("/:id", isValidId, songsControllers.getSongByIdController);

export default songsRouter;


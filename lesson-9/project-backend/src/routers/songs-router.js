import {Router} from "express";

import songsControllers from "../controllers/songs-controllers.js";

import isValidId from "../middlewares/isValidId.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import authenticate from "../middlewares/authenticate.js";

import validateBody from "../decorators/validateBody.js";

import { songAddSchema, songUpdateSchema } from "../validation/song-schemas.js";

const songsRouter = Router();

songsRouter.use(authenticate);

songsRouter.get("/", songsControllers.getSongsController);

songsRouter.get("/:id", isValidId, songsControllers.getSongByIdController);

songsRouter.post("/", validateBody(songAddSchema), songsControllers.addSongController);

songsRouter.put("/:id", isValidId, isEmptyBody, validateBody(songUpdateSchema), songsControllers.updateSongController);

songsRouter.delete("/:id", isValidId, songsControllers.deleteSongController);

export default songsRouter;


import { Router } from "express";

import genresControllers from "../controllers/genres-controllers.js";

import isValidId from "../middlewares/isValidId.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";

import validateBody from "../decorators/validateBody.js";

import { genreAddSchema, genreUpdateSchema } from "../validation/genre-schemas.js";

const genresRouter = Router();

genresRouter.get("/", genresControllers.getGenres);

genresRouter.post("/", validateBody(genreAddSchema), genresControllers.addGenre);

export default genresRouter;

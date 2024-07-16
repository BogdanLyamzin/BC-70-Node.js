import express from "express";
import cors from "cors";
import path from "node:path";

import logger from "./middlewares/logger.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";

import env from "./utils/env.js";

import authRouter from "./routers/auth-router.js";
import genresRouter from "./routers/genres-router.js";
import songsRouter from "./routers/songs-router.js";

const publicDirPath = path.resolve("src", "public");

const startServer = () => {
    const port = Number(env("PORT", 3000));
    const app = express();

    app.use(cors());
    // app.use(logger);
    app.use(express.json());
    app.use(express.static(publicDirPath));

    app.use("/api/auth", authRouter);
    app.use("/api/genres", genresRouter);
    app.use("/api/songs", songsRouter);

    app.use(notFoundHandler);

    app.use(errorHandler);

    app.listen(port, () => console.log(`Server running on ${port} PORT`));
}

export default startServer;

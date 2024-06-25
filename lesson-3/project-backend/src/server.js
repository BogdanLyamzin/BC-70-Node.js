import express from "express";
import cors from "cors";
import pino from "pino-http";

import db from "./db/db.js";

const startServer = ()=> {
    const app = express();

    const logger = pino({
        transport: {
            target: "pino-pretty"
        }
    });

    app.use(cors());
    app.use(logger);

    app.get("/api/authors", (req, res) => {
        res.json(db.authors);
    })

    app.get("/api/songs", (req, res) => {
        res.json(db.songs);
    })

    app.use((req, res)=> {
        res.status(404).json({
            message: `${req.url} Not Found`
        })
    })

    app.use((error, req, res, next)=> {
        res.status(500).json({
            message: "Server error"
        })
    })

    app.listen(3000, () => console.log("Server running on 3000 PORT"));
}

export default startServer;

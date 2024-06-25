import express from "express";
import cors from "cors";
import pino from "pino-http";

import db from "./db/db.js";

const app = express();

const logger = pino({
    transport: {
        target: "pino-pretty"
    }
});

app.use(cors());
app.use(logger);
// const corsMiddleware = cors();
// app.use(corsMiddleware);
/*
const cors = options => {
    const middleware = (req, res, next)=> {
        // allow CORS with options
        next();
    }

    return middleware;
}
*/

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// })

// app.use((req, res, next)=> {
//     console.log("First middleware");
//     next();
// })

// app.use((req, res, next)=> {
//     console.log("Second middleware");
//     next();
// })

app.get("/authors", (req, res) => {
    res.json(db.authors);
})

app.get("/songs", (req, res) => {
    res.json(db.songs);
})

app.use((req, res)=> {
    res.status(404).json({
        message: `${req.url} Not Found`
    })
})

app.listen(3000, () => console.log("Server running on 3000 PORT"));

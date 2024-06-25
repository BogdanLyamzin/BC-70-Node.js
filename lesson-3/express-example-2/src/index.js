import express from "express";

import db from "./db/db.js";

const app = express();

// app.set("json spaces", 4);

app.get("/songs", (req, res)=> {
    const responseData = null;
    // res.json(responseData);
    // res.send(responseData);
    res.json(db.songs);
    // res.send(db.songs);
});

app.listen(3000, ()=> console.log("Server running on 3000 PORT"));

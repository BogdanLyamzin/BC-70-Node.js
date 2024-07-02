import {Schema, model} from "mongoose";

const songSchema = new Schema({
    author: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

const Song = model("song", songSchema);
// category => categories
// mouse => mice

export default Song;

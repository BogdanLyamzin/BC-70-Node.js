import Song from "../db/models/Song.js";

export const getSongs = ()=> Song.find();

export const getSongById = _id => Song.findOne({_id});

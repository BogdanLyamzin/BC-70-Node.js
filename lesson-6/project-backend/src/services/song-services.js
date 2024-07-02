import Song from "../db/models/Song.js";

export const getSongs = ()=> Song.find();

export const getSong = filter => Song.findOne(filter);

export const addSong = data => Song.create(data);

export const updateSong = (filter, data)=> Song.findOneAndUpdate(filter, data);

export const deleteSong = filter => Song.findOneAndDelete(filter);

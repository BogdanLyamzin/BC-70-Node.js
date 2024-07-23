import Song from "../db/models/Song.js";

export const getSongs = async (query = {})=> {
    const {filter, fields, settings} = query;
    const {page, limit} = settings;
    const skip = (page - 1) * limit;
    const data = await Song.find(filter, fields, {skip, limit}).populate("genre", "title");
    const total = await Song.countDocuments(filter);

    return {
        data,
        total,
    }
};

export const getSong = filter => Song.findOne(filter);

export const addSong = data => Song.create(data);

export const updateSong = (filter, data)=> Song.findOneAndUpdate(filter, data);

export const deleteSong = filter => Song.findOneAndDelete(filter);

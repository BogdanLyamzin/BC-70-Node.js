import * as genreServices from "../services/genre-services.js";

import HttpError from "../utils/HttpError.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getGenres = async(req, res)=> {
    const data = await genreServices.getGenres();

    res.json({
        status: 200,
        message: "Genres find successfully",
        data,
    })
}

const addGenre = async(req, res)=> {
    const {title} = req.body;
    const genre = await genreServices.findGenre({title});
    if(genre) {
        throw HttpError(409, `genre ${title} already exist`);
    }

    const data = await genreServices.addGenre(req.body);

    res.status(201).json({
        status: 201,
        message: "genre add successfully",
        data,
    })
}

export default {
    addGenre: ctrlWrapper(addGenre),
    getGenres: ctrlWrapper(getGenres),
}

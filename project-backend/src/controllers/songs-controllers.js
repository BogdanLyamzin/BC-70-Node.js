import * as songServices from "../services/song-services.js";

import HttpError from "../utils/HttpError.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getSongsController = async (req, res) => {
    const data = await songServices.getSongs();

    res.json({
        status: 200,
        message: "Songs get successfully",
        data,
    });
}

const getSongByIdController = async (req, res) => {
    const { id: _id } = req.params;

    const data = await songServices.getSong({_id});

    if (!data) {
        throw HttpError(404, `Song with id=${id} not found`);
    }

    res.json({
        status: 200,
        message: `Song with id=${id} get successfully`,
        data,
    });
}

const addSongController = async(req, res)=> {
    const data = await songServices.addSong(req.body);

    res.status(201).json({
        status: 201,
        message: `Song add successfully`,
        data,
    });
}

const updateSongController = async(req, res)=> {
    const {id: _id} = req.params;
    const data = await songServices.updateSong({_id}, req.body);
    if (!data) {
        throw HttpError(404, `Song with id=${id} not found`);
    }

    res.json({
        status: 200,
        message: `Song add successfully`,
        data,
    });
}

const deleteSongController = async(req, res)=> {
    const {id: _id} =  req.params;

    const data = await songServices.deleteSong({_id});
    if (!data) {
        throw HttpError(404, `Song with id=${id} not found`);
    }

    // res.status(204).send();

    res.json({
        status: 200,
        message: `Song delete successfully`,
        data,
    });
}

export default {
    getSongsController: ctrlWrapper(getSongsController),
    getSongByIdController: ctrlWrapper(getSongByIdController),
    addSongController: ctrlWrapper(addSongController),
    updateSongController: ctrlWrapper(updateSongController),
    deleteSongController: ctrlWrapper(deleteSongController),
}

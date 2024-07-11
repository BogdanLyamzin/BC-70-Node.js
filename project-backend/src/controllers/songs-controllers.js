import * as songServices from "../services/song-services.js";

import HttpError from "../utils/HttpError.js";
import parsePaginationParams from "../utils/parsePaginationParams.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getSongsController = async (req, res) => {
    const {page, limit} = parsePaginationParams(req.query);
    const settings = {page, limit};
    const {_id: owner} = req.user;
    const filter  = {owner};
    const data = await songServices.getSongs({filter, settings});

    res.json({
        status: 200,
        message: "Songs get successfully",
        data,
    });
}

const getSongByIdController = async (req, res) => {
    const { id: _id } = req.params;
    const {_id: owner} = req.user;
    const data = await songServices.getSong({_id, owner});

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
    const {_id: owner} = req.user;
    const data = await songServices.addSong({...req.body, owner});

    res.status(201).json({
        status: 201,
        message: `Song add successfully`,
        data,
    });
}

const updateSongController = async(req, res)=> {
    const {id: _id} = req.params;
    const {_id: owner} = req.user;
    const data = await songServices.updateSong({_id, owner}, req.body);
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
    const {_id: owner} = req.user;
    const data = await songServices.deleteSong({_id, owner});
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

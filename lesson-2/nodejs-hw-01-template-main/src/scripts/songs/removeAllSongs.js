import {updateSongs} from "./updateSongs.js";

export const removeAllSongs = async () => {
    await updateSongs([]);
};

removeAllSongs();

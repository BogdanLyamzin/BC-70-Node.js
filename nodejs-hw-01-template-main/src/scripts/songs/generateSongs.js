import { createFakeSong } from "../../utils/createFakeSong.js";
import { getAllSongs } from "./getAllSongs.js";
import { updateSongs } from "./updateSongs.js";

const generateSongs = async (number) => {
    const songList = await getAllSongs();
    const newSongList = Array(number).fill(0).map(createFakeSong);
    songList.push(...newSongList);
    // const newData = [...songList, ...newSongList];
    await updateSongs(songList);
};

generateSongs(5);

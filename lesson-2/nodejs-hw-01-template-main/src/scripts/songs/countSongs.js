import { getAllSongs } from "./getAllSongs.js";

export const countSongs = async () => {
    const result = await getAllSongs();
    return result.length;
};

console.log(await countSongs());

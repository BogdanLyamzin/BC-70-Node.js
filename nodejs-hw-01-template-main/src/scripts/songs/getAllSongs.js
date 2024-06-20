import fs from "node:fs/promises";

import { PATH_DB_SONGS } from "../../constants/songs.js";

export const getAllSongs = async () => {
    const data = await fs.readFile(PATH_DB_SONGS, "utf-8");
    return JSON.parse(data);
};


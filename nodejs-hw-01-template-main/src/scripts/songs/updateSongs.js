import fs from "node:fs/promises";

import { PATH_DB_SONGS } from "../../constants/songs.js";

export const updateSongs = songList => fs.writeFile(PATH_DB_SONGS, JSON.stringify(songList, null, 2));

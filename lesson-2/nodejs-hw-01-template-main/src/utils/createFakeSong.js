import { faker } from "@faker-js/faker";

export const createFakeSong = ()=> ({
    id: faker.string.uuid(),
    author: faker.person.fullName(),
    name: faker.music.songName(),
})

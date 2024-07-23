import mongoose from "mongoose";
import request from "supertest";

import startServer from "../server.js";

import env from "../utils/env.js";

import { findUser, deleteAllUser } from "../services/auth-services.js";

const user = env("MONGODB_USER");
const password = env("MONGODB_PASSWORD");
const url = env("MONGODB_URL");
const name = env("MONGODB_TEST_NAME");
const DB_HOST = `mongodb+srv://${user}:${password}@${url}/${name}?retryWrites=true&w=majority&appName=Cluster0`;

describe("test /api/auth/signup route", ()=> {
    let server = null;
    beforeAll(async ()=> {
        await mongoose.connect(DB_HOST);
        server = startServer();
    });

    afterAll(async()=> {
        await mongoose.connection.close();
        server.close();
    })

    afterEach(async()=> {
        await deleteAllUser();
    })

    test("test signup with correct data", async()=> {
        const signupData = {
            username: "Bogdan",
            email: "bogdan@gmail.com",
            password: "123456"
        };

        const {body, statusCode} = await request(server).post("/api/auth/signup").send(signupData);
        expect(statusCode).toBe(201);
        expect(body.username).toBe(signupData.username);
        expect(body.email).toBe(signupData.email);

        const user = await findUser({email: signupData.email});
        expect(user).toBeTruthy();
        if(user) {
            expect(user.email).toBe(signupData.email);
            expect(user.username).toBe(signupData.username);
        }
    })
})

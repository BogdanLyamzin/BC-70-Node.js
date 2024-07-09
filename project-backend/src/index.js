import initMongoDBConnection from "./db/initMongoDBConnection.js";
import startServer from "./server.js";

const bootstrap = async()=> {
    await initMongoDBConnection();
    startServer();
}

bootstrap();


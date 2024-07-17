const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const routes = require("./etc/routes.js");
const db = require("./lib/db/db.js");
const cookieAuth = require("./lib/middlewares/cookieAuth.js");

const main = async () => {
    // Setup env
    dotenv.config();

    // Init DB
    const dbInitErr = await db.init();
    if (dbInitErr) {
        process.exit(2);
    }

    // Create app
    const app = express();

    // Configure middlewares
    app.use(cookieParser());
    app.use(cors({
        origin: "http://localhost:3000",
        credentials: true,
    }));
    app.use(express.json());

    // Register routers
    for (let i = 0; i < routes.length; i++) {
        const { method, path, doAuth, handler } = routes[i];
        switch (method) {
            case "GET": {
                doAuth ? app.get(path, cookieAuth, handler) : app.get(path, handler);
                break;
            }
            case "POST": {
                doAuth ? app.post(path, cookieAuth, handler) : app.post(path, handler);
                break;
            }
            case "PUT": {
                doAuth ? app.put(path, cookieAuth, handler) : app.put(path, handler);
                break;
            }
            case "DELETE": {
                doAuth ? app.delete(path, cookieAuth, handler) : app.delete(path, handler);
                break;
            }
            default: {
                console.error("Undefined route method", routes[i]);
            }
        }
    }

    console.log(`Starting server at port: ${process.env.PORT}`)
    app.listen(process.env.PORT);
};

main();

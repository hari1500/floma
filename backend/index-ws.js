const { WebSocketServer } = require('ws');
const dotenv = require('dotenv');
const uuidv4 = require("uuid").v4;

const db = require("./lib/db/db.js");
const { handler: handleGetDocContent } = require("./lib/handlers/getDocContent.js");
const { handler: handleUpdateDocContent } = require("./lib/handlers/updateDocContent.js");
const { handler: handleSaveDocContent } = require("./lib/handlers/saveDocContent.js");

// THINK: can be moved to some singleton class and handlers can access directly instead of passing in all handlers
// technically this is like our redis cache
let allContents = {};

// TODO: merge both websocket and http server
// TODO: Err handling
const main = async () => {
    // Setup env
    dotenv.config();

    // Init DB
    const dbInitErr = await db.init();
    if (dbInitErr) {
        process.exit(2);
    }

    // Create app
    console.log(`Starting server at port: ${process.env.WS_PORT}`);
    const wss = new WebSocketServer({ port: process.env.WS_PORT });

    wss.on('connection', function connection(ws) {
        const connId = uuidv4();

        ws.on('error', console.error);

        ws.on('message', function message(dat) {
            const data = JSON.parse(dat.toString());
            if (!data?.type) {
                return;
            }
            console.log(connId, "Received message: ", data);

            const { type } = data;
            // TODO: use enums here and move cases to etc/routes
            // FIXME: use accessToken and authenticate
            switch (type) {
                case "INIT": {
                    handleGetDocContent({ data, connId }, allContents, ws);
                    break;
                }
                case "UPDATE": {
                    handleUpdateDocContent({ data, connId }, allContents, ws);
                    break;
                }
                default: {
                    console.error("Undefined message type", type);
                }
            }
        });

        ws.on('close', function close() {
            handleSaveDocContent({ connId }, allContents, ws);
        });
    });
};

main();

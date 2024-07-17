const Document = require("../db/models/Document.js");
const DocContent = require("../db/models/DocContent.js");

// FIXME: Assuming file size is small
const handler = async ({ data, connId }, allContents, ws) => {
    const { username, docId } = data;
    if (!username || !docId) {
        const error = "username or docId is not found";
        console.error(error);
        ws.send(JSON.stringify({ error }));
        return;
    }

    let doc;
    try {
        doc = await Document.findById(docId).exec();
    } catch (error) {
        console.error(error);
        ws.send(JSON.stringify({ error: "Internal Server Error" }));
        return;
    }

    let mode;
    if (doc?.collaborators) {
        mode = doc.collaborators.get(username);
    }
    if (doc?.owner === username) {
        mode = "EDIT";
    }
    console.log(doc, mode, username);

    if (mode !== "VIEW" && mode !== "EDIT") {
        const error = `${username} is unauthorized for ${docId}`;
        console.error(error);
        ws.send(JSON.stringify({ error }));
        return;
    }

    for (const key in allContents) {
        if (key !== docId) {
            continue;
        }

        allContents[docId][mode].push(connId);
        allContents[docId]["ws"].push(ws);
        ws.send(JSON.stringify({ "data": allContents[docId]["data"] }));
        return;
    }

    allContents[docId] = {
        "VIEW": [],
        "EDIT": [],
        "ws": [],
        "data": ""
    };
    allContents[docId][mode].push(connId);
    allContents[docId]["ws"].push(ws);
    try {
        const docContent = await DocContent.findOne({ docId }).exec();
        allContents[docId]["data"] = docContent.content;
        ws.send(JSON.stringify({ "data": allContents[docId]["data"] }));
    } catch (error) {
        console.error(error);
        ws.send(JSON.stringify({ error: "Internal Server Error" }));
    }
};

module.exports = { handler };

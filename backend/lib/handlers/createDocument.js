const DocContent = require("../db/models/DocContent.js");
const Document = require("../db/models/Document.js");

const handler = async ({ user, body }, res) => {
    const username = user?.username;
    if (!username) {
        const error = "user is not logged in";
        console.error(error);
        return res.status(401).json({ error });
    }

    const title = body?.title || `New Document - ${new Date().toISOString()}`;
    try {
        // FIXME: Store user object id instead of username
        // FIXME: make this in one transaction
        const doc = await Document.create({title, owner: username});
        await DocContent.create({ docId: doc._id, content: "" });
        res.status(201).json(doc);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { handler };

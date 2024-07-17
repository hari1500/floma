const Document = require("../db/models/Document.js");

const handler = async ({ user, query }, res) => {
    const username = user?.username;
    if (!username) {
        const error = "user is not logged in";
        console.error(error);
        return res.status(401).json({ error });
    }

    const docId = query?.docId;
    if (!docId) {
        const error = "docId is required";
        console.error(error);
        return res.status(400).json({ error });
    }
    
    try {
        const doc = await Document.findById(docId).exec();
        res.status(200).json(doc);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { handler };

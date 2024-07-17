const Document = require("../db/models/Document.js");

// Assumption: Allowing even owner to update
// TODO: Add more validations on body
const handler = async ({ user, body }, res) => {
    const username = user?.username;
    if (!username) {
        const error = "user is not logged in";
        console.error(error);
        return res.status(401).json({ error });
    }

    if (!body) {
        const error = "body not found";
        console.error(error);
        return res.status(400).json({ error });
    }

    const { _id, title, owner } = body;
    if (!_id || !title || !owner) {
        const error = "_id or title or owner is required";
        console.error(error);
        return res.status(400).json({ error });
    }
    delete body["_id"];

    try {
        const doc = await Document.findByIdAndUpdate(_id, body, { returnDocument: 'after' });
        res.status(200).json(doc);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { handler };

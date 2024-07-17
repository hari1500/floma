const Document = require("../db/models/Document.js");

const handler = async ({ user }, res) => {
    const username = user?.username;
    if (!username) {
        const error = "user is not logged in";
        console.error(error);
        return res.status(401).json({ error });
    }
    
    try {
        // TODO: Add sort and pagination options
        let collCond = {};
        collCond[`collaborators.${username}`] = { $in: ["VIEW", "EDIT"] };

        const docs = await Document.find({ $or:[ { owner: username }, collCond ]}).exec();
        res.status(200).json(docs);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { handler };

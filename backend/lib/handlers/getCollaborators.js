const User = require("../db/models/User.js");

const handler = async ({ user }, res) => {
    const username = user?.username;
    if (!username) {
        const error = "user is not logged in";
        console.error(error);
        return res.status(401).json({ error });
    }
    
    try {
        // TODO: Add logic to filter collaborators
        let users = await User.find().exec();
        users = users.map((user) => {
            delete user["password"];
            return user;
        });
        // TODO: filter some on docId
        users = users.filter(user => user.username !== username);
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { handler };

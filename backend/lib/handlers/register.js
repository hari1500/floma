const bcrypt = require('bcrypt');

const User = require("../db/models/User.js");

const handler = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        const error = "username and password are required";
        console.error(error);
        return res.status(400).json({ error });
    }

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username }).exec();
    if (duplicate) {
        const error = "username already taken";
        console.error(error);
        return res.status(409).json({ error });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({username, password: hashedPassword});

        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = { handler };

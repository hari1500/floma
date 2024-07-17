const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require("../db/models/User.js");

// TODO: Add token refresh, token expiry and logout logic

const handler = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        const error = "username and password are required";
        console.error(error);
        return res.status(400).json({ error });
    }

    const found = await User.findOne({ username }).exec();
    if (!found) {
        console.error(`username not found ${username}`);
        return res.sendStatus(401);
    }
    
    try {
        const match = await bcrypt.compare(password, found.password);
        if (!match) {
            console.error(`password didn't match for ${username}`);
            return res.sendStatus(401);
        }

        const user = { "username": found.username, "_id": found._id }

        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        
        res.cookie("accessToken", accessToken, { httpOnly: true });
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
};

module.exports = { handler };

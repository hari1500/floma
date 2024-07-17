const jwt = require("jsonwebtoken");

const cookieAuth = (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = user;
        next();
    } catch (error) {
        res.clearCookie("accessToken");
        return res.sendStatus(401);
    }
};

module.exports = cookieAuth;

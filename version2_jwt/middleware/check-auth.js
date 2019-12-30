const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, "i_am_the_private_key");
        req.userData = decode;
    } catch (err) {
        return res.status(401).json({
            message: "Auth failed",
            redirect: "login page"
        })
    }
    next();
}
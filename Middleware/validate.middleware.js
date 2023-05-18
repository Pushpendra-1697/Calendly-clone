//middleware for validate Unauthorized user
const jwt = require('jsonwebtoken');

const validate = (req, res, next) => {
    const { token } = req.headers;

    if (token) {
        let expTime = jwt.decode(token, process.env.secret_key).exp;
        let currTime = Math.floor(Date.now() / 1000);
        if (currTime > expTime) {
            res.send({ "status": "NO", "msg": "Unauthorized Please Login First" });
        } else {
            next();
        }
    } else {
        res.send({ "status": "NO", "msg": "Unauthorized Please Login First" });
    }
}

module.exports = { validate };
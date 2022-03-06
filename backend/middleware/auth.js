require("dotenv").config({ path: '.env'});
const jwt = require("jsonwebtoken");

export const auth = (req, res, next) => {

    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, process.env.SECRET, (err, result) => {
            if (err){
                res.status(401).json({
                    msg: 'Cannot verify token'
                });
            }
            else {
                req.user = result;
                next();
            }
        });
    }
    else {
        res.status(401).json({
            msg: "Cannot access this route, you are not authorized"
        });
    }
}
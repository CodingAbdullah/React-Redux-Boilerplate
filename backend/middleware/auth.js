require("dotenv").config({ path: '../.env'});
const jwt = require("jsonwebtoken");

export const auth = (req, res, next) => {

    // Check to see if headers contain the token for verification
    if (req.body.headers.authorization) {
        const token = req.body.headers.authorization.split(" ")[1];

        jwt.verify(token, process.env.SECRET, (err, result) => {
            if (err){
                res.status(401).json({
                    msg: 'Cannot verify token'
                });
            }
            else {
                // If validated, move onto the next piece of middleware
                req.body.user = result;
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
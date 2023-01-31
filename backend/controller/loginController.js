require("dotenv").config({ path: '../.env' });
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.loginController = (req, res) => {
    const { email, password } = JSON.parse(req.body.body);

    User.findOne({
        email: email
    }, (err, user) => {
        if (err){
            res.status(400).json({
                msg: err
            });
        }
        else {
            if (user == null){
                res.status(401).json({
                    msg: 'User does not exist!'
                });
            }
            else {
                bcrypt.compare(password, user.password)
                .then(check => {
                    if (check){    
                        jwt.sign({ user }, process.env.SECRET, { expiresIn: 3600 }, (err, token) => {
                            if (err) {
                                res.status(400).json({
                                    msg: "There is an error creatin JWT token" + err
                                });
                            }
                            else {
                                res.status(201).json({
                                    msg: 'Passwords match!',
                                    token: token,
                                    user: {
                                        firstName: user.firstName,
                                        lastName: user.lastName,
                                        email: user.email
                                    }
                                });
                            }
                        });
                    }
                    else {
                        res.status(401).json({
                            msg: "Passwords DO NOT match!"
                        });
                    }
                })
                .catch(err => {
                    res.status(400).json({
                        msg: err
                    });
                });    
            }
        }
    }
)}
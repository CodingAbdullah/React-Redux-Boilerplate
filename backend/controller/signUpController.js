const User = require("../model/User");
const bcrypt = require("bcryptjs");

exports.signUpController = (req, res) => {
    const { firstName, lastName, email, password } = JSON.parse(req.body.body);

    User.findOne({
        email: email
    }, (err, user) => {
        if (err) {
            res.status(400).json({
                msg: 'Error querying database. ' + err
            });
        }
        else {
            if (user == null) {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err){
                        res.status(400).json({
                            msg: err
                        });
                    }
                    else {
                        bcrypt.hash(password, salt, (err, hash) => {
                            if (err){
                                res.status(400).json({
                                    msg: err
                                });
                            }
                            else {
                                let newUser = new User({
                                    firstName: firstName, lastName: lastName, email: email, password: hash
                                });  

                                newUser.save()
                                .then(data => {                        
                                    res.status(201).json({
                                        msg: data
                                    });
                                })
                                .catch(err => {                                        
                                    res.status(400).json({
                                        msg: err
                                    });
                                });
                            }
                        });
                    }
                });
            }
            else {
                res.status(400).json({
                    msg: "User already exists!",
                });
            }
        }
    });
}
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./../models/userModel');
const UserProfile = require('./../models/userProfile');
const helpers = require('./../constantFunctions/helpers');

//login fxn
exports.login = (req, res, next) => {
    const usrIdReq = req.body.usrId;
    const passwordReq = req.body.password;
    if (!(usrIdReq && passwordReq)) {
        res.status(200).json({
            status: "error",
            message: "Please provide correct credentials."
        });
    }

    User.findOne({ $or: [{ email: usrIdReq }, { mobile: usrIdReq }] })
        .exec()
        .then(user => {
            if (!user) {
                res.status(401).json({
                    status: 'error',
                    message: 'Auth failed!'
                })
            } else {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        res.status(500).json({
                            status: 'error',
                            message: 'Auth failed!'
                        })
                    } else {
                        if (result) {
                            token = helpers.authToken(user);
                            res.status(200).json({
                                status: "success",
                                message: "Auth successful",
                                token: token
                            });
                        } else {
                            res.status(200).json({
                                status: "error",
                                message: "Auth failed!"
                            });
                        }
                    }
                })
            }
        })
        .catch(err => {
            res.status(200).json({
                status: "error",
                message: err
            });
        })
}

//signup fxn
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            var userId = mongoose.Types.ObjectId();
            const user = new User({
                _id: userId,
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                mobile: req.body.mobile,
                password: hash
            });

            user.save()
                .then(result => {
                    console.log(result._id);

                    const profile = new UserProfile({
                        _id: userId,
                        mobile: result.mobile
                    });
                    profile.save()
                        .then(() => {
                            const token = helpers.authToken(result);
                            res.status(201).json({
                                status: "success",
                                message: "Registration successful",
                                token: token
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            User.deleteOne({ "_id": userId })
                                .then(() => {
                                    if (err.code === 11000) {
                                        res.status(200).json({
                                            status: "success",
                                            message: err.errmsg
                                        });
                                    } else {
                                        res.status(200).json({
                                            status: err
                                        });
                                    }
                                })
                        });

                })
                .catch(err => {
                    console.log(err);
                    if (err.code === 11000) {
                        res.status(200).json({
                            status: "success",
                            message: "User already registered"
                        });
                    } else {
                        res.status(200).json({
                            status: err
                        });
                    }
                });
        }
    })
}
const User = require('../models/users');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const axios = require('axios')
require('dotenv').config()

const register = function (req, res) {
    User.findOne({
        email: req.body.email
    })
        .then(function (dataUser) {
            if (!dataUser) {
                let { name, email, password } = req.body
                User.create(
                    {
                        name: name,
                        email: email,
                        password: password
                    }
                )
                    .then(function (data) {
                        res.status(200).json(
                            {
                                message: "new user added",
                                newUser: data
                            }
                        )
                    }
                    )
                    .catch(function (err) {
                        res.status(500).json(
                            {
                                message: "register failed", error: err.message
                            }
                        )
                    }
                    )
            } else {
                res.status(400).json(
                    {
                        message: "email has been used"
                    }
                )
            }
        })
        .catch(function (err) {
            res.status(401).json({ err })
        })
}

const login = function (req, res) {
    User.findOne(
        {
            email: req.body.email
        }
    )
        .then(function (dataUser) {
            // console.log(dataUser._id);
            if (dataUser) {
                let token = jwt.sign(
                    {
                        id: dataUser._id,
                        name: dataUser.name,
                        email: dataUser.email
                    }
                    , process.env.JWT_KEY)
                let decodedPass = bcrypt.compare(req.body.password, dataUser.password)
                if (decodedPass) {
                    res.status(200).json({ token })
                } else {
                    res.status(400).json({ message: "email/password is wrong" })
                }
            }
        }
        )
        .catch(function (err) {
            res.status(500).json(
                {
                    message: 'email not found',
                    err: err
                }
            )
        }
        )
}

const loginFb = function (req, res) {
    let authResponse = req.body
    let url_user_info = `https://graph.facebook.com/me?fields=id,name,email&access_token=${authResponse.accessToken}`
    axios({
        method: "GET",
        url: url_user_info
    })
        .then(function ({ data }) {
            User.findOne({
                email: data.email
            })
                .then(function (user) {
                    if (user === null) {
                        User.create({
                            name: data.name,
                            email: data.email,
                            facebookId: data.id
                        })
                            .then(function (newUser) {
                                let token = jwt.sign({ id: newUser._id, name: newUser.name, email: newUser.email }, process.env.JWT_KEY)
                                res.status(200).json({ token, newUser })
                            })
                            .catch(function (err) {
                                res.status(400).json({
                                    message: "eror create user",
                                    error: err.message
                                })
                            })
                    } else {
                        let token = jwt.sign({ name: user.name, email: user.email }, process.env.JWT_KEY)
                        res.status(200).json({ token })
                    }
                })
                .catch(function (err) {
                    res.status(400).json({
                        message: "user not found",
                        error: err.message
                    })
                })
        })
        .catch(function (err) {
            res.status(500).json({
                message: "error login fb",
                error: err.message
            })
        })
}


module.exports = { register, login, loginFb }
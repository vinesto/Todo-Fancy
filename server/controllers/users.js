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



module.exports = { register, login }
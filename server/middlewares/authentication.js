const User = require('../models/users')
const jwt = require('jsonwebtoken')
require('dotenv').config()



const authentication = (req, res, next) => {
    console.log('masuuk auth');
    let token = req.headers.token
    if (token) {
        let decode = jwt.verify(token, process.env.JWT_KEY)
        User.findOne({ _id: decode.id })
            .then((data) => {
                if (data) {
                    // console.log('masuk then auth');
                    req.user = data
                    next()
                } else {
                    res.status(400).json({
                        message: "User not found"
                    })
                }
            })
            .catch((err) => {
                res.status(400).json({
                    message: 'Login failed'
                })
            });

    } else {
        res.status(400).json({
            message: 'User must be Log In'
        })
    }
}

module.exports = authentication
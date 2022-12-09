const jwt = require('jsonwebtoken')
const User = require('../models/user')

const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1]
    try {   
        const tokenData = jwt.verify(token, process.env.JWT_SECRET_KEY)
        User.findById(tokenData._id)
            .then((user) => {
                req.user = user
                next()
            })
            .catch((err) => {
                res.status(401).json(err)
            })
    } catch (err) {   
        res.status(401).json(err.message)
    }
}

module.exports = {
    authenticateUser
}
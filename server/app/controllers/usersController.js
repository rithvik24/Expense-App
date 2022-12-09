const usersController = {}
const User = require('../models/user')
const omit  = require('lodash/omit')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Budget = require('../models/budget')

usersController.register = (req, res) => {
    const body = req.body
    const user = new User(body)
    const budget = new Budget({amount: 0, user: new User()._id})
    budget.save()
        .then((budget) => {
            console.log(budget)
            user.save()
            .then((user) => {
                const obj = JSON.parse(JSON.stringify(user))
                res.json(omit(obj,['password']))
            })
            .catch((err) => {
                res.json(err)
            })
        })
        .catch((err) => {
            res.json(err)
        })
}

usersController.login = (req, res) => {
    User.findOne({email: req.body.email})
        .then((user) => {
            if(!user){
                res.json({
                    errors : 'invalid email or password'
                })
            }
            
            bcrypt.compare(req.body.password, user.password)
                .then((match) => {
                    if(match){
                        const tokenData = {
                            _id: user._id,
                            username: user.username,
                            email: user.email
                        }
                        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY,{expiresIn: '2d'})
                        res.json({
                            token: token
                        })
                    }else{
                        res.json({
                            errors: 'invalid email or password'
                        })
                    }
                })
        })
}

usersController.account = (req, res) => {
    const obj = JSON.parse(JSON.stringify(req.user))
    res.json(omit(obj,['password']))
}

module.exports = usersController 
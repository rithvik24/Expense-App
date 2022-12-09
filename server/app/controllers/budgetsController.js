const budgetsController = {}
const Budget = require('../models/budget')

budgetsController.create = (req, res) => {
    const body = req.body
    const budget = new Budget(body)
    budget.user = req.user._id
    budget.save()
        .then((budget) => {
            res.json(budget)
        })
        .catch((err) => {
            res.json(err)
        })
}

budgetsController.show = (req, res) => {
    const id = req.params.id
    Budget.findOne({_id: id, user: req.user._id})
        .then((budget) => {
            res.json(budget)
        })
        .catch((err) => {
            res.json(err)
        })
}

budgetsController.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Budget.findOneAndUpdate({_id: id, user: req.user._id}, body, {new: true, runValidators: true})
        .then((budget) => {
            res.json(budget)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports = budgetsController
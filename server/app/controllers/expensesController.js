const expensesController = {}
const Expense = require('../models/expense')

expensesController.list = (req, res) => {
    Expense.find({user: req.user._id, isDeleted: false}).populate('category',['name'])
        .then((expenses) => {
            res.json(expenses)
        })
        .catch((err) => {
            res.json(err)
        })
}

expensesController.listDeleted = (req, res) => {
    Expense.find({user: req.user._id, isDeleted: true}).populate('category',['name'])
        .then((expenses) => {
            res.json(expenses)
        })
        .catch((err) => {
            res.json(err)
        })
}

expensesController.create = (req, res) => {
    const body = req.body
    const expense = new Expense(body)
    expense.user = req.user._id
    expense.save()
        .then((expense) => {
            res.json(expense)
        })
        .catch((err) => {
            res.json(err)
        })
}

expensesController.show = (req, res) => {
    const id = req.params.id
    Expense.findOne({_id: id, user: req.user._id}).populate('category',['name'])
        .then((expense) => {
            res.json(expense)
        })
        .catch((err) => {
            res.json(err)
        })
}

expensesController.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Expense.findOneAndUpdate({_id: id, user: req.user._id}, body, {new: true, runValidators: true}).populate('category',['name'])
        .then((expense) => {
            res.json(expense)
        })
        .catch((err) => {
            res.json(err)
        })
}

expensesController.remove = (req, res) => {
    const id = req.params.id
    Expense.findOneAndUpdate({_id: id, user: req.user._id}, {isDeleted: true}, {new: true, runValidators: true}).populate('category',['name'])
        .then((expense) => {
            res.json(expense)
        })
        .catch((err) => {
            res.json(err)
        })
}

expensesController.restore = (req, res) => {
    const id = req.params.id
    Expense.findOneAndUpdate({_id: id, user: req.user._id}, {isDeleted: false}, {new: true, runValidators: true}).populate('category',['name'])
        .then((expense) => {
            res.json(expense)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports = expensesController
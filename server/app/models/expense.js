const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expenseSchema = new Schema({
    name: {
        type: String,
        required: [true,"name is required"]
    },
    amount: {
        type: Number,
        required: [true, "amount is required"]
    },
    date: {
        type: Date,
        required: [true, "date is required"]
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{timestamps: true})

const Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense
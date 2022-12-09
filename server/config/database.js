const mongoose = require('mongoose')

const configureDB = () => {
    mongoose.connect('mongodb://localhost:27017/expense-tracker')
        .then(() => {
            console.log('connected to database')
        })
        .catch((err) => {
            console.log(err.message)
        })
}

module.exports = configureDB
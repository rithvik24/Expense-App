const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())
require('dotenv').config()
const configureDB = require('./config/database')
configureDB()
const port = process.env.PORT
const router = require('./config/routes')
app.use(router)

app.listen(port, () => {
    console.log('listening to port',port)
})
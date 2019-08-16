const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const router = require('./router')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('client/build'))

app.use(router)

mongoose
    .connect('mongodb://vito:qwerty123@ds263127.mlab.com:63127/films', { useNewUrlParser: true })
    .then(() => console.log('Connected successfully to db server!'))
    .catch(err => console.log(err))

app.listen(process.env.PORT || 5000, () => console.log('Example app listening on port 5000!'))
const express = require('express')
const config = require('./config')
const app = express()

app.listen(config.port)

//middlewares
app.use(express.json())

app.use(require('./routes/kit.routes'))
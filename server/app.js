const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = 5000
const {MONGOURI} = require('./keys')

mongoose.set("strictQuery", false);
mongoose.connect(MONGOURI)
mongoose.connection.on('connected', () => {
    console.log("Mongodb connected successfully!")
})
mongoose.connection.on('error', (error) => {
    console.log("Mongodb error:", error)
})

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))

app.listen(PORT, ()=>{
    console.log("Server is runnig on", `http://192.168.8.124:${PORT}`)
})
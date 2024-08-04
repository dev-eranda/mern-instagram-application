require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const PORT = 5000

const MONGOURI = process.env.MONGOURI;

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

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))

app.listen(PORT, ()=>{
    console.log("Server is runnig on", `http://localhost:${PORT}`)
})
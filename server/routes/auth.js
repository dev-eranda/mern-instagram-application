const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../keys')

router.post('/singup', (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.status(422).json({ error: "plase add all the fiedls" })
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "user already exist with that email" })
            }
            bcrypt.hash(password, 12)
                .then(hashedpassword => {
                    const user = new User({
                        name,
                        email,
                        password: hashedpassword
                    })
                    user.save()
                        .then(user => {
                            res.json({ message: "signup successfully" })
                        })
                        .catch(error => {
                            console.log(error)
                        })
                })
        })
        .catch(error => {
            console.log(error)
        })
})

router.post('/singin', (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(422).json({ error: "please add email or password" })
    }
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "invalid email or password" })
            }
            bcrypt.compare(password, savedUser.password)
                .then(match => {
                    if (match) {
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                        const { _id, name, email } = savedUser
                        res.json({ token, user: { _id, name, email }})
                    }
                    else {
                        return res.status(422).json({ error: "invalid email or password" })
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        })
        .catch(error => {
            console.log(error)
        })
})

module.exports = router

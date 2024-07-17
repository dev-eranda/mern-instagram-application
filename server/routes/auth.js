const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../keys')


router.post('/signup', async(req, res) => {
    const { name, email, password } = req.body

    try{ 
        const savedUser = await User.findOne({ email: email})
        if(savedUser){
            return res.status(422).json({ error: "User alreasy exists with that email"})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({
            name, 
            email, 
            password
        })

        await user.save()
        return res.status(201).json({message: "Siginup successful"})
    }
    catch(error){
        console.error(error);

        if (error.name === "ValidationError") {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ error: errors });
        }

        res.status(500).json({ error: 'Internal server error' });
    }
})

router.post('/signin', (req, res) => {
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
                        res.json({ token, user: { _id, name, email } })
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
            // console.log(error)
            // if(error.name === "ValidationError"){
            //     const error = object.value(error.errors.map(err => err.message))
            //     console.log(error)
            //     return res.status(400).json({error})
            // }
            // res.status(500).send('500 Internal server error')
        })
})

module.exports = router

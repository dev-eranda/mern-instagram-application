const express = require('express')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const router = express.Router()
const bcrypt = require('bcryptjs')
const joi = require('joi')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../keys')

const signupSchema = joi.object({
    name: joi.string().alphanum().min(3).max(50).required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
})

router.post('/signup', async (req, res) => {
    const {error, value} = signupSchema.validate(req.body)
    if(error){
        return res.status(422).json({ error: error.details[0].message})
    }
    
    const { name, email, password } = value

    try {
        const savedUser = await User.findOne({ email: email })
        if (savedUser) {
            return res.status(422).json({ error: "User alreasy exists with that email" })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({
            name,
            email,
            password: hashedPassword
        })

        await user.save()
        return res.status(201).json({ message: "Siginup successful" })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
})

const signinSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
})

router.post('/signin', async (req, res) => {
    const { error, value } = signinSchema.validate(req.body)
    if (error) {
        return res.status(422).json({ error: error.details[0].message })
    }

    const { email, password } = value

    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(422).json({ error: "Invalid credentials" })
        }

        const match = await bcrypt.compare(password, user.password)
        if (match) {
            const token = jwt.sign(
                { _id: user._id, name: user.name, email: user.email },
                JWT_SECRET,
                { expiresIn: '15m' }
            )
            const { _id, name, email } = user
            return res.status(200).json({ token, user: { _id, name, email } })
        } else {
            return res.status(422).json({ error: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send('500 Internal server error')
    }
})

module.exports = router

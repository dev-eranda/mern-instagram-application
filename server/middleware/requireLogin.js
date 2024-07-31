const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../keys')
const mongoose = require('mongoose')
const User = mongoose.model("User")

module.exports = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: "You must be logged in" })
    }

    // const token = authorization.replace("Bearer ", "")
    const token = authorization.split(" ")[1]

    try {
        const payload = jwt.verify(token, JWT_SECRET, (error, user) => {

            if (error) {
                return res.status(401).json("Token is not valid!")
            }
            req.user = user;
            next();
        })

        // const { _id } = payload

        // const currentUser = await User.findById(_id);
        // if (!currentUser) {
        //     return res.status(401).json({ error: 'User not found' });
        // }

        // req.user = currentUser;
        // next();
    }
    catch (error) {
        console.error('Error verifying token or finding user:', error);
        return res.status(401).json({ error: "You must be logged in" })
    }
} 
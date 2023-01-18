const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Post = mongoose.model('Post')
const requireLogin = require('../middleware/requireLogin') 


router.get('/allpost', (req, res) => {
    Post.find()
    .populate("postedBy", "_id name")
    .then(posts => {
        res.json({ posts })
    })
    .catch(error => {
        console.log(error)
    })
})

router.post('/createpost', requireLogin, (req, res) => {
    const {title, body, photoURI} = req.body
    if(!title || !body || !photoURI) {
        return res.status(422).json({error: "plase add all the fiedls"})
    }
    req.user.password = undefined
    const post = new Post ({
        title,
        body,
        photo: photoURI,
        postedBy: req.user
    })
    post.save().then(result => {
        res.json({ post: result })
    })
    .catch(error => {
        console.log(error)
    }) 
})

router.get('/mypost', requireLogin, (req, res) => {
    Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then( mypost => {
        res.json({ mypost })
    })
    .catch( error => {
        console.log(error)
    })
})


module.exports = router
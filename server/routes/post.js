const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Post = mongoose.model('Post')
const requireLogin = require('../middleware/requireLogin') 


router.get('/allpost', requireLogin, (req, res) => {
    Post.find()
    .populate("postedBy", "_id name")
    .populate("comments.commentedBy", "_id name")
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

router.put('/like', requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $push: {likes: req.user._id}
    }, {
        new: true
    }).exec((error, result) => {
        if(error){
            return res.status(422).json({error: error})
        }
        else{
            res.json(result)
        }
    })
})

router.put('/unlike', requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull: {likes: req.user._id}
    }, {
        new: true
    }).exec((error, result) => {
        if(error){
            return res.status(422).json({error: error})
        }
        else{
            res.json(result)
        }
    })
})

router.put('/comment', requireLogin, (req, res) => {

    comment = {
        text: req.body.text,
        commentedBy: req.user._id
    }

    Post.findByIdAndUpdate(req.body.postId, {
        $push: {comments: comment}
    }, {
        new: true
    })
    .populate("postedBy", "_id name")
    .populate("comments.commentedBy", "_id name")
    .exec((error, result) => {

        console.log(result)
        if(error){
            return res.status(422).json({error: error})
        }
        else{
            res.json(result)
        }
    })
})

router.delete('/deletepost/:postId', requireLogin, (req, res) => {
    Post.findOne({_id:req.params.postId})
    .populate("postedBy", "_id")
    .exec((error, post) => {
        if(error || !post){
            return res.json(422).json({error: error})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
            post.remove()
            .then(result => {
                res.json({result})
            }).catch(error => {
                console.log(error)
            })
        }
    })
})

module.exports = router
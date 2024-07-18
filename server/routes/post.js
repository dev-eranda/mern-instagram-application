const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Post = mongoose.model('Post')
const requireLogin = require('../middleware/requireLogin')
const joi = require('joi')


router.get('/allpost', requireLogin, async (req, res) => {
    try {
        const post = await Post.find()
            .populate("postedBy", "_id name")
            .populate("comments.commentedBy", "_id name")
        return res.status(200).json({ post })
    }
    catch (error) {
        console.log("cannot find all post:", error)
        return res.status(500).send("500 Internal server error")
    }
})

const createpostSchema = joi.object({
    title: joi.string().min(1).max(50).required(),
    body: joi.string().min(1).max(100).required(),
    image_url: joi.string().required()
})

router.post('/createpost', requireLogin, async (req, res) => {
    const { error, value } = createpostSchema.validate(req.body)
    if (error) {
        return res.status(422).json({ error: error.details[0].message })
    }

    try {
        const { title, body, image_url } = value
        const user = req.user
        user.password = undefined

        const postObj = new Post({
            title,
            body,
            photo: image_url,
            postedBy: user
        })

        const post = await postObj.save()
        return res.status(200).json({ post })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send("500 Internal server error")
    }
})

router.get('/mypost', requireLogin, async (req, res) => {
    const { _id } = req.user

    try {
        const post = await Post.find({ postedBy: _id }).populate("postedBy", "_id name")
        return res.status(200).json({ post })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send("500 Internal server error")
    }
})

const likeSchema = joi.object({
    postId: joi.string().length(24).hex().required()
});

router.put('/like', requireLogin, async (req, res) => {
    const { error, value } = likeSchema.validate(req.body);
    if (error) {
        return res.status(422).json({ error: error.details[0].message })
    }

    try {
        const { postId } = value
        const { _id } = req.user

        const post = await Post.findByIdAndUpdate(
            postId,
            { $addToSet: { likes: _id } }, // add like only once 
            { new: true }
        )

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        return res.status(200).json({ post })

    } catch (error) {
        console.log(error)
        return res.status(500).send("500 Internal server error")
    }
})

router.put('/unlike', requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    }, {
        new: true
    }).exec((error, result) => {
        if (error) {
            return res.status(422).json({ error: error })
        }
        else {
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
        $push: { comments: comment }
    }, {
        new: true
    })
        .populate("postedBy", "_id name")
        .populate("comments.commentedBy", "_id name")
        .exec((error, result) => {
            if (error) {
                return res.status(422).json({ error: error })
            }
            else {
                res.json(result)
            }
        })
})

router.delete('/deletepost/:postId', requireLogin, (req, res) => {
    Post.findOne({ _id: req.params.postId })
        .populate("postedBy", "_id")
        .exec((error, post) => {
            if (error || !post) {
                return res.json(422).json({ error: error })
            }
            if (post.postedBy._id.toString() === req.user._id.toString()) {
                post.remove()
                    .then(result => {
                        res.json({ result })
                    }).catch(error => {
                        console.log(error)
                    })
            }
        })
})

module.exports = router
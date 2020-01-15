const router = require('express').Router();

const User = require('../models/user.model.js');
const Post = require('../models/post.model.js');

router.get('/:userId', async (req, res) => {

    let {userId} = req.params;

    try {
        
        const user = await User.findById(userId);
        const posts = await Post.find({author: userId}).sort({createdAt: -1}).populate({path: 'comments', populate: {path: 'author'}}).populate('author');

        res.render('profile', {user, posts});

    } catch (err) {
        console.error(err)
    }
    
});







module.exports = router;
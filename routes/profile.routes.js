const router = require('express').Router();

const User = require('../models/user.model.js');
const Post = require('../models/post.model.js');

const {protect, authorize} = require('../middlewares/auth.middleware');


/**
 * @desc Profile page
 * @route GET /profile/:userId
 * @access Private
 */

router.get('/:userId', [protect, authorize('IRONHACKER', 'STAFF')], async (req, res) => {

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
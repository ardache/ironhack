const router = require('express').Router();

const User = require('../models/user.model.js');
const Post = require('../models/post.model.js');
const Comment = require('../models/comment.model.js');

const {protect, authorize} = require('../middlewares/auth.middleware');


/**
 * @desc Create a comment
 * @route Post /comment/:postId
 * @access Private
 */

router.post('/:postId', [protect, authorize('IRONHACKER', 'STAFF')], async (req, res) => {

    try {

        let {content} = req.body;
        let user = req.session.currentUser;

        const post = await Post.findById(req.params.postId);
        const comment = await Comment.create({content, author: user._id, post: req.params.postId});

        post.comments.push(comment);
        post.save();

        res.redirect('/feed');

    } catch (err) {
        console.error(err);
    }

});


module.exports = router;
const router = require('express').Router();

const Post = require('../models/post.model');
const {protect, authorize} = require('../middlewares/auth.middleware');


/**
 * @desc Feed page
 * @route GET /feed
 * @access Private
 */

router.get('/', [protect, authorize('IRONHACKER', 'STAFF')], async (req, res) => {

    try {
        const user = req.session.currentUser;
        const post = await Post.find().sort({createdAt: -1}).populate({path: 'comments', populate: {path: 'author'}}).populate('author');
        res.render('feed', {user, post});

    } catch (err) {
        console.error(err)
    }
    
});


/**
 * @desc Get a post
 * @route Get /feed/post/:postId
 * @access Private
 */

router.get('/post/:postId', [protect, authorize('IRONHACKER', 'STAFF')], async (req, res) => {

    try {

        const post = await Post.findById(req.params.postId).populate('comments');
        res.render('feed', {post});

    } catch (err) {
        console.error(err);
    }

});


/**
 * @desc Create a post from feed
 * @route POST /feed/post/:postId
 * @access Private
 */

router.post('/', [protect, authorize('IRONHACKER', 'STAFF')], async (req, res) => {

    const {content} = req.body
    await Post.create({content, author: req.session.currentUser});
    res.redirect('/feed');

});


/**
 * @desc Update a post
 * @route POST /feed/postUpdate/:postId
 * @access Private
 */

router.post('/postUpdate/:postId', [protect, authorize('IRONHACKER', 'STAFF')], async (req, res) => {

    try {
        
        await Post.findByIdAndUpdate(req.params.postId, {content: req.body.content}, {new: true});
        res.redirect(`/post/${req.params.id}`);
        
    } catch (err) {
        console.error(err);
    }

});


/**
 * @desc Delete a post
 * @route POST /feed/post/:postId
 * @access Private
 */

router.post('/postDelete/:postId', [protect, authorize('IRONHACKER', 'STAFF')], async (req, res) => {

    try {

        await Post.findByIdAndDelete(req.params.postId);
        res.redirect('/');

    } catch (err) {
        console.error(err);
    }

});




module.exports = router;
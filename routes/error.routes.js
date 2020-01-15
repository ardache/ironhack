const router = require('express').Router()


/**
 * @desc Error page
 * @route GET /error
 * @access Public
 */

router.get('/', (req, res) => {

    res.render('error');
    
});

module.exports = router;
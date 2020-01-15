
exports.protect = (req, res, next) => {
    
    if (req.session.currentUser) {
        next();
    } else {
        res.redirect("/");
    }

};


exports.authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.session.currentUser.role)) {
            res.render('index', {message: 'Acceso denegado.'});
            return;
        }
        next();
    }
}
const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');


router.get('/', async (req, res) => {

    if (req.session.currentUser && req.session.currentUser !== undefined) {
        res.redirect("/feed");
    }

    res.render('index');
    
});


router.post('/signup', async (req, res) => {

    try {

        const {name, password, email, birthday, gender} = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);

        if (name === "" || password === "" || email === "" || birthday === "" || gender === "") {
            return res.render("index", {
              message: "Todos los campos son requeridos."
            });
        }

        const emailExists = await User.findOne({email});

        if (emailExists) {
            return res.render("index", {
                message: "Este usuario ya existe."
            });
        }

        await User.create({name, email, password: hashPass, birthday, gender});
        res.redirect('/');

    } catch (err) {
        console.error(err);
    }
    
});



router.post('/login', async (req, res) => {

    try {

        const {email, password} = req.body;

        if(email === '' || password === '') {
            return res.render("index", {
                message: "Todos los campos son obligatorios."
            });
        }

        const user = await User.findOne({email});

        if(!user) {
            return req.render("index", {
                message: "El usuario no existe."
            });
        }

        if (bcrypt.compareSync(password, user.password)) {
            req.session.currentUser = user;
            res.redirect("/feed");
        } else {
            res.render("index", {
              errorMessage: "Los campos no coinciden."
            });
        }
        
    } catch (err) {
        console.error(err);
    }

});



router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/");
    });
});


module.exports = router;
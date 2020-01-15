// CONFIG
require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");
const morgan = require('morgan');
const hbs = require('hbs');
const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cookieParser = require('cookie-parser');

const app = express();

const connectDB = require('./config/db');

app.set('PORT', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');


// Helpers
hbs.registerHelper('dateFormat', require('handlebars-dateformat'));

hbs.registerHelper('ifCond', function(v1, v2, options) {
    if(v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});


//CONNECTION
connectDB();


// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

app.use(session({
    secret: "1r0nhacker2019",
    cookie: { maxAge: 7 * 24 * 60 * 60 },
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 7 * 24 * 60 * 60
    })
}));

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


// ROUTES
app.use('/', require('./routes/auth.routes'));
app.use('/feed', require('./routes/index.routes'));
app.use('/profile', require('./routes/profile.routes'));
app.use('/comment', require('./routes/comment.routes'));
app.use('/error', require('./routes/error.routes'));

app.all('*', (req, res, next) => {
    res.redirect('/error');
});


// LISTEN
app.listen(app.get('PORT'), () => console.log(`Servidor listo en el puerto ${app.get('PORT')}`));
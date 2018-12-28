const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
require('sexy-require');

const passport = require('./passport');
const apiRouter = require('./routes/api');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());


/* START PASSPORT */
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});
/* END PASSPORT */

/* START STATICS */
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
} else {
    app.use(express.static(path.join(__dirname, 'client/public')));
}
/* END STATICS */

/* START API */
app.use('/api', apiRouter);
/* END API */

/* START REDIRECTS */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});
/* END REDIRECTS */

module.exports = app;

const express = require('express');
const router = express.Router();
const passport = require('/passport');
const user = require('./user');

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.use('/user', user);

module.exports = router;

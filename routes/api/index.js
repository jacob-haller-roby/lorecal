const express = require('express');
const router = express.Router();
const passport = require('/passport');
const user = require('./user');

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err || !user) return res.status(401);
        req.login(user, (err) => {
            if (err) res.status(401);
            return res.status(200);
        })
    })
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.use('/user', user);

module.exports = router;

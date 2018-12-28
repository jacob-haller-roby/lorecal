const express = require('express');
const router = express.Router();
const passport = require('/passport');
const user = require('./user');

router.post('/login', (req, res, next) => {
        console.log('moving to authentication');
        passport.authenticate('local', (err, user, info) => {
            console.log(err, user, info);
            console.log('moving to validation)')
            if (err || !user) return res.status(401).json();
            req.login(user, (err) => {
                if (err) res.status(401).json();
                return res.status(200).json(user);
            })
        })(req, res, next);

    }
);

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.use('/user', user);

module.exports = router;

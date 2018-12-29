const express = require('express');
const router = express.Router();
const error = require('./error');
const authenticate = require('/authenticate');
const User = require('../../db/dao/User');

router.get('/', (req, res) => {
    User.getAll()
        .then(users => res.json(users))
        .catch((err) => error(err, res));
});

router.post('/', (req, res) => {
    User.create(req.body)
        .then(user => res.json(user))
        .catch((err) => error(err, res));
});

router.patch('/:id', (req, res) => {
    User.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch((err) => error(err, res));

});

router.get('/me', authenticate.loggedIn,
    function (req, res) {
        res.json(req.user);
    }
);

module.exports = router;
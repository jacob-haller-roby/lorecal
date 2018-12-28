const express = require('express');
const router = express.Router();
const authenticate = require('/authenticate');
const User = require('../../db/dao/User');

router.get('/', (req, res) => {
    User.getAllUsers()
        .then(users => res.json(users))
        .catch(() => res.err());
});

router.post('/', (req, res) => {
    User.create(req.body)
        .then(user => res.json(user))
        .catch(() => res.err());
});

router.patch('/:id', (req, res) => {
    User.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(() => res.err());

});

router.get('/me', authenticate.loggedIn,
    function (req, res) {
        res.json(req.user);
    }
);

module.exports = router;
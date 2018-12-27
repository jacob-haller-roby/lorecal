const express = require('express');
const router = express.Router();
const User = require('../db/dao/User');

router.get('/users', (req,res) => {
    console.log('inside users api')
    User.getAllUsers((err, users) => {
        res.json(users);
    });
});

router.get('/getList', (req,res) => {
    var list = ["item1", "item2", "item3"];
    res.json(list);
    console.log('Sent list of items');
});

module.exports = router;

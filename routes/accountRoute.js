// accountRoute.js - Account route module.

const express = require('express');
const router = express.Router();

const accountManager = require('../lib/account');

router.post('/login', (req, res) => {
    res.redirect('/ok');
});

router.post('/register', (req, res) => {
    accountManager.register(req.body.username, req.body.email, req.body.password, req.body.passwordrepeat, (info) => {
        if (info === 'exists') {
            res.redirect('/register', {info: "exists"});
        } else if (info === 'pwnomatch') {
            res.redirect('/register', {info: "pwnomatch"});
        } else if (info === 'success') {
            res.redirect('/ok');
        }
    });
});

module.exports = router;
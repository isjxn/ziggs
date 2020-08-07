// indexRoute.js - Index route module.

const express = require('express');
const config = require('../lib/config');
const accountManager = require('../lib/account');
const notification = require('../lib/notification');
const router = express.Router();

router.get('/', (req, res) => {
  res.send("INDEX");
});

router.get('/about', (req, res) => {
  res.send("ABOUT");
});

router.get('/login', (req, res) => {
  res.render('pages/login');
});

router.get('/register', (req, res) => {
  res.render('pages/register', {info: '', name: config.name});
});

router.get('/ok', (req, res) => {
  res.render('pages/ok');
});

// Account handling
router.post('/login', (req, res) => {
    accountManager.login(req.body.username, req.body.password, (info) => {
      if (info === 'success') {
        notification.sendNotification('Login', `${req.body.username} logged in`);
        res.redirect('pages/ok');
      } else {
          res.render('pages/login', {info: info, name: config.name});
      }
    });
});

router.post('/register', (req, res) => {
    accountManager.register(req.body.username, req.body.email, req.body.password, req.body.rpassword, (info) => {
        if (info === 'success') {
            res.redirect('pages/ok');
        } else {
            res.render('pages/register', {info: info, name: config.name});
        }
    });
});



module.exports = router;
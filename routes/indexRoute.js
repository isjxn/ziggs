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

router.get('/home', (req, res) => {
  if (req.session.username != undefined) {
    accountManager.getRank(req.session.username, (rank) => {
      res.render('pages/home', {username: req.session.username, rank: rank, name: config.name, users: { amount: 10 }});
    });
  } else {
    res.redirect('/login');
  }
});

router.get('/profile', (req, res) => {
  if (req.session.username != undefined) {
    accountManager.getRank(req.session.username, (rank) => {
      res.render('pages/profile', {username: req.session.username, rank: rank, name: config.name});
    });
  } else {
    res.redirect('/login');
  }
});

// Account handling
router.post('/login', (req, res) => {
    accountManager.login(req.body.username, req.body.password, (info) => {
      if (info === 'success') {
        accountManager.getRank(req.body.username, (rank) => {
          notification.sendNotification('Login', `${req.body.username} logged in`);
          req.session.username = req.body.username;
          req.session.rank = rank
          res.redirect('/home');
        });
      } else {
          res.render('pages/login', {info: info, name: config.name});
      }
    });
});

router.post('/register', (req, res) => {
    accountManager.register(req.body.username, req.body.email, req.body.password, req.body.rpassword, (info) => {
        if (info === 'success') {
            accountManager.createSession(req.body.username, req.session);
            req.session.username = req.body.username;
            req.session.rank = accountManager.getRank(req.body.username);
            res.redirect('/home');
        } else {
            res.render('pages/register', {info: info, name: config.name});
        }
    });
});



module.exports = router;
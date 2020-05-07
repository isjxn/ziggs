// indexRoute.js - Index route module.

const express = require('express');
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
  res.render('pages/register');
});

router.get('/ok', (req, res) => {
  res.render('pages/ok');
});

module.exports = router;
// indexRoute.js - Index route module.

const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  res.send("INDEX");
});

router.get('/about', function (req, res) {
  res.send("ABOUT");
});

module.exports = router;
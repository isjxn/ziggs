const logger = require('./log');
const config = require('./config');
const port = config.express_port;
const name = config.name;
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/',function(req,res) {
    res.render('pages/index', {title: name});
});

const server = app.listen(port, () => {
    logger.log(`Webserver is listening in port: ${port}`);
});

module.exports.server = server;
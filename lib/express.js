const logger = require('./log');
const config = require('./config');
const port = config.express_port;
const name = config.name;
const express = require('express');
const app = express();

const router = require('../routes');
router.setup(express, app);

const server = app.listen(port, () => {
    logger.log(`listening on port: ${port}`, 'Webserver');
});

module.exports.app = app;
module.exports.server = server;

const logger = require('./log');
const server = require('./express').server;

const config = require('./config');
const path = config.socket_path;

const io = require('socket.io')(server, {
    path: path,
    serveClient: true,
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
});

logger.log(`listening on path: ${path}`, 'Websocket');
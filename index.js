const logger = require('./lib/log');

setTimeout(() => {
    const express = require('./lib/express');
    const io = require('./lib/websocket');
    const mysql = require('./lib/mysql');
    const accountManager = require('./lib/account');
}, 500);

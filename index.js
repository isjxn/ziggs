/**
 * ===-<[MAIN ENTRY POINT OF ZIGGS APPLICATION]>-===
 * 
 * [CAUTION]: The use of certai features can be disabled, 
 * HOWEVER there is no guarantee whatsoever that the application will still work.
 * 
 * [EXAMPLE]: node index.js --nomysql (To disable Mysql)
 *          node index.js --nows (To disable WebSockets)
 *          node index.js --nolog (To disable Logging)
*/

const args = process.argv;

if (!args.includes('--nolog')) {
    const logger = require('./lib/log');
}

// Timeout needed for proper sequence of the application
setTimeout(() => {
    const express = require('./lib/express');

    // Load WebSocket requiring fies
    if (!args.includes('--nows')) {
        const io = require('./lib/websocket');
    }

    // Load Mysql requiring files
    if (!args.includes('--nomysql')) {
        const mysql = require('./lib/mysql');
        const accountManager = require('./lib/account');
    }
}, 500);

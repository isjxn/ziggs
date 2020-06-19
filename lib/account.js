const logger = require('./log');
const mysql = require('./mysql');
const bcrypt = require('bcrypt');
const sqlstring = require('sqlstring');

class AccountManager {
    constructor() {
        logger.log('started..', 'AccountManager');
    }

    exists(username) {
        mysql.query(`SELECT username FROM users WHERE username = '${sqlstring.escape(username)}'`);
    }

    register(username, email, password, passwordrepeat, callback) {
        if(this.exists(username)) {
            callback('exists');
        }
    }

    login() {

    }
}

module.exports = new AccountManager();
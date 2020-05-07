const logger = require('./log');
const mysql = require('./mysql');
const bcrypt = require('bcrypt');
const sqlstring = require('sqlstring');

class AccountManager {
    constructor() {
        logger.log('started..', 'AccountManager');
    }

    exists(username) {  // u dont need the `` xD just say SELECT username FROM users WHERE username = "smmth";   ik feels like better practive though
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
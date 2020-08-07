const logger = require('./log');
const mysql = require('./mysql');
const bcrypt = require('bcrypt');
const sqlstring = require('sqlstring');

class AccountManager {
    constructor() {
        logger.log('started..', 'AccountManager');
    }

    exists(username, callback)  {
        mysql.select(`username FROM users WHERE username = ${sqlstring.escape(username)};`, (result, fields) => {
            if (result.length >= 1) {
                callback(true);
            } else {
                callback(false);

            }
        });
    }

    register(username, email, password, passwordrepeat, callback) {
        this.exists(username, (exists) => {
            if(exists) {
                callback('exists');
            } else {
                if (password != passwordrepeat) {
                    callback('pwnomatch');
                } else if (!email.includes('@')) {
                    callback('emailwrong');
                } else {
                    bcrypt.hash(password, 10, (err, hash) => {
                        if (err) throw err;
                        mysql.insert(`users (username, email, password) VALUES (${sqlstring.escape(username)}, ${sqlstring.escape(email)}, ${sqlstring.escape(hash)});`, (result) => {
                            callback('success');
                        });
                    });
                }
            }
        });
    }

    login() {
        /**
         * TODO: login
         */

        //bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
            // result == true
        //});
    }
}

module.exports = new AccountManager();
const logger = require('./log');
const mysql = require('./mysql');
const bcrypt = require('bcrypt');
const sqlstring = require('sqlstring');

class AccountManager {
    constructor() {
        logger.log('started..', 'AccountManager');
    }

    exists(username) {
        mysql.select(`username FROM users WHERE username = ${sqlstring.escape(username)};`, (result, fields) => {
            console.log(result.length);
            /**
             * TODO: fix this mess
             */
            if (result.length > 0) {
                return false;
            } else {
                return true;

            }
        });
    }

    register(username, email, password, passwordrepeat, callback) {
        if(this.exists(username)) {
            console.log("EXISTS");
            callback('exists');
        } else {
            if (password != passwordrepeat) {
                callback('pwnomatch');
            } else if (!email.includes('@')) {
                callback('emailwrong');
            } else {
                console.log("DOESNT");
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) throw err;
                    mysql.insert(`users (username, email, password) VALUES (${sqlstring.escape(username)}, ${sqlstring.escape(email)}, ${sqlstring.escape(hash)});`, (result) => {
                        callback('success');
                    });
                });
            }
        }
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
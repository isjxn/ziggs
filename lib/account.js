const logger = require('./log');
const mysql = require('./mysql');
const bcrypt = require('bcrypt');
const sqlstring = require('sqlstring');

class AccountManager {
    constructor() {
        logger.log('started..', 'AccountManager');
    }

    exists(username)  {
        mysql.select(`username FROM users WHERE username = ${sqlstring.escape(username)};`, (result, fields) => {
            /**
             * TODO: fix this mess
             */
            if (result.length >= 1) {
                console.log("true");
                return true;
            } else {
                console.log("false");
                return false;

            }
        });
    }

    register(username, email, password, passwordrepeat, callback) {
        if(this.exists(username) === true) {
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
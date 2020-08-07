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

    login(username, password, callback) {
        /**
         * TODO: Add functionality for the edge cases
         */
        this.exists(username, (exists) => {
            if (exists) {
                mysql.select(`password FROM users WHERE username = ${sqlstring.escape(username)};`, (result, fields) => {
                    console.log(result[0].password);
                    bcrypt.compare(password, result[0].password, (err, res) => {
                        console.log(err);
                        console.log(res);
                        if (res) {
                            console.log("Hi");
                            callback('success');
                        } else{
                            console.log("Bye");
                            callback('wrongpw');
                        }
                    });
                });
            } else {

            }
        });
    }

    getRank(username) {
        mysql.select(`rank FROM users WHERE username = ${sqlstring.escape(username)};`, (result, fields) => {
            if (result.length > 0 ) {
                return result[0].rank;
            } else {
                // This should'nt happen
            }
        });
    }
}

module.exports = new AccountManager();
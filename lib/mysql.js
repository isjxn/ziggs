const mysql = require('mysql');

const logger = require('./log');
const config = require('./config');

class Mysql {
    constructor() {
        this.pool  = mysql.createPool({
            connectionLimit : 10,
            host            : config.mysql_host,
            port            : config.mysql_port,
            user            : config.mysql_user,
            password        : config.mysql_password,
            database        : config.mysql_database
        });
        this.testConnection(err => {
            if(err) throw err;
            logger.log('connection successfully established', 'MYSQL');
        });
    }

    testConnection(callback) {
        this.pool.getConnection(function(err, connection) {
            if(callback && Mysql.isCallingback(callback)) {
                callback(err);
            }
            connection.release();
        });
    }

    query(query, callback) {
        this.pool.query(query, (err, rows) => {
            if (err) {
                if(callback && Mysql.isCallingback(callback)) {
                    callback(err);
                }
            } else {
                if(callback && Mysql.isCallingback(callback)) {
                    callback(rows);
                }            
            }
        });
    }
    
    select(query, callback) {
        this.pool.query(`SELECT ${query}`, (err, result, fields) => {
            if (err) throw err;
            callback(result, fields);
        });
    }

    insert(query, callback) {
        this.pool.query(`INSERT INTO ${query}`, (err, result) => {
            if (err) throw err;
            callback(result);
        });
    }

    static isCallingback(callback) {
        if(typeof callback == 'function') {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = new Mysql();
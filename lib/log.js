const figlet = require('figlet');
const chalk = require('chalk');
const clear = require('clear');
const fs = require('fs');

const config = require('./config');
const name = config.name;

let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

class Logger {
    constructor() {
        this.version = '0.1a';
        clear();
        this.header(name);
        setTimeout(() => {
            console.log('');
            this.log(`Using version ${this.version}`);
            this.log(`Logger started..`);
        }, 500);
    }

    header(message) {
        figlet(message, (err, data) => {
            if (err) {
                this.log('Something went wrong...');
                console.dir(chalk.red(err));
                return;
            }

            console.log(chalk.bold.cyan(data));
        });
    }

    log(message) {
        console.log(chalk.bold.cyan(`[${name}] `) + chalk.blue(message));
        fs.appendFileSync(`logs/log-${date}.txt`, `[${time}] [${name}] ${message}\n`);
    }
}

module.exports = new Logger();
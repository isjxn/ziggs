const bodyParser = require('body-parser')
const logger = require('../lib/log');

const setup = (_express, _app) => {
    let app = _app;

    app.set('view engine', 'ejs');
    app.use(bodyParser.json());     // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
        extended: true
    })); 

    app.use((req, res, next) => {
        logger.log(`Request PATH: "${req.path}", METHOD: "${req.method}"`, 'Express');
        next();
    });

    app.use(_express.static('public'));
    const index = require('./indexRoute.js');
    app.use('/', index);
}

module.exports.setup = setup;

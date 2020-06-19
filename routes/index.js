const bodyParser = require('body-parser')
const logger = require('../lib/log');

const setup = (express) => {
    let app = express;

    app.set('view engine', 'ejs');
    app.use(bodyParser.json());     // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
        extended: true
    })); 

    app.use((req, res, next) => {
        logger.log(`Request PATH: "${req.path}", METHOD: "${req.method}"`, 'Express');
        next();
    });

    const index = require('./indexRoute.js');
    app.use('/', index);
    const account = require('./accountRoute.js');
    app.use('/account', account);
}

module.exports.setup = setup;

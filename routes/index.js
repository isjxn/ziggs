const logger = require('../lib/log');

const setup = (express) => {
    let app = express;

    app.set('view engine', 'ejs');

    app.use((req, res, next) => {
        logger.log(`Request PATH: "${req.path}", METHOD: "${req.method}"`, 'Express');
        next();
    });

    const index = require('./indexRoute.js');
    app.use('/', index);
}

module.exports.setup = setup;

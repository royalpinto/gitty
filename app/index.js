'use strict';


const http = require('http');
const Router = require('./router');
const errors = require('./../errors');
const middlewares = require('./middlewares');
const events = require('./../routes/events');
const actors = require('./../routes/actors');
const repos = require('./../routes/repos');

const router = new Router();

router.use(/(?:)/, middlewares.log);
router.use(/(?:)/, middlewares.easyResponse);
router.use(/(?:)/, middlewares.querystring);
router.use(/(?:)/, middlewares.paginate(10, 50));
router.use(/(?:)/, middlewares.filter);

router.use(/^\/api\/events\//, events);
router.use(/^\/api\/actors\//, actors);
router.use(/^\/api\/repos\//, repos);

router.use(/(?:)/, (req, res) => {
    errors.handle(req, res, new errors.NotFound('Not found.'));
});


const server = http.createServer((req, res) => {
    router.dispatch(req, res);
});


module.exports = server;

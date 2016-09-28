const http = require('http');
const Router = require('./router');
const middlewares = require('./middlewares');
const events = require('./../routes/events');
const actors = require('./../routes/actors');

const router = new Router();

router.use(/(?:)/, middlewares.log);
router.use(/(?:)/, middlewares.easyResponse);
router.use(/(?:)/, middlewares.querystring);
router.use(/(?:)/, middlewares.paginate(10, 50));
router.use(/(?:)/, middlewares.filter);

router.use(/^\/api\/events\//, events);
router.use(/^\/api\/actors\//, actors);

router.use(/(?:)/, (req, res) => {
    res.end('Hi');
});


const server = http.createServer(function(req, res) {
    router.dispatch(req, res);
});


module.exports = server;

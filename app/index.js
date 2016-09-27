const http = require('http');
const Router = require('./router');
const middlewares = require('./middlewares');
const events = require('./../routes/events');

const router = new Router();

router.use(/(?:)/, middlewares.log);
router.use(/^\/api\/events\//, events);

router.use(/(?:)/, (req, res) => {
    res.end('Hi');
});


const server = http.createServer(function(req, res) {
    router.dispatch(req, res);
});


module.exports = server;

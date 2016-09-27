const http = require('http');
const Router = require('./router');
const middlewares = require('./middlewares');

const router = new Router();

router.use(/(?:)/, middlewares.log);
router.use(/(?:)/, (req, res) => {
    res.end('Hi');
});


const server = http.createServer(function(req, res) {
    router.dispatch(req, res);
});


module.exports = server;

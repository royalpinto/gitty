const Router = require('./../app/router');
const router = new Router();


router.get(/^\/api\/events\//, (req, res, next) => {
    res.end('Events Get');
});


module.exports = router;

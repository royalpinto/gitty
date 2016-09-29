'use strict';


const errors = require('./../errors');
const Router = require('./../app/router');
const router = new Router();
const Controller = require('./../controllers/event');
const controller = new Controller();


router.get(/^\/api\/events\//, (req, res, next) => {
    let query = req.query;
    controller.get(query.filter, query.limit, query.skip, query.order)
    .then(data => {
        res.json(data);
    })
    .catch(error => {
        errors.handle(req, res, error);
    })
    ;
});


module.exports = router;

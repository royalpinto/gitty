'use strict';


const errors = require('./../errors');
const Router = require('./../app/router');
const router = new Router();
const Controller = require('./../controllers/repo');


router.get(/^\/api\/repos\//, (req, res, next) => {
    let controller = new Controller();
    let query = req.query;
    controller.get(query.filter, query.limit, query.skip, query.order)
    .then(data => {
        console.log(data);
        res.json(data);
    })
    .catch(error => {
        errors.handle(req, res, error);
    })
    ;
});


module.exports = router;

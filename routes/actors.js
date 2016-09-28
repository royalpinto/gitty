'use strict';


const Router = require('./../app/router');
const router = new Router();
const Controller = require('./../controllers/actor');


router.get(/^\/api\/actors\//, (req, res, next) => {
    let controller = new Controller();
    controller.getById('mattholl')
    .then(data => {
        res.json(data);
    })
    ;
});


module.exports = router;

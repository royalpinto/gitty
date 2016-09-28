'use strict';


const Router = require('./../app/router');
const router = new Router();
const Controller = require('./../controllers/actor');


router.get(/^\/api\/actors\/(\w+)\/repos\/top\/$/, (req, res, next) => {
    let id = req.params[0];
    let controller = new Controller();
    controller.getTopRepo(id)
    .then(data => {
        res.json(data);
    })
    ;
});


module.exports = router;

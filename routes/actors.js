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


router.get(/^\/api\/actors\/(\w+)\/$/, (req, res, next) => {
    let id = req.params[0];
    let controller = new Controller();
    controller.getById(id)
    .then(data => {
        res.json(data);
    })
    .catch(console.error)
    ;
});


router.delete(/^\/api\/actors\/(\w+)\/events\/$/, (req, res, next) => {
    let id = req.params[0];
    let controller = new Controller();
    controller.deleteEvents(id)
    .then(() => {
        res.status(204).end();
    })
    .catch(console.error)
    ;
});


module.exports = router;

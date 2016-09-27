'use strict';


module.exports = {
    log: (req, res, next) => {
        console.log('Incoming request %s:%s', req.method, req.url);
        next();
    },
};

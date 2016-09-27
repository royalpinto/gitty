'use strict';


module.exports = {
    log: (req, res, next) => {
        res.on('finish', () => {
            return console.log('%s %d %s', req.method, res.statusCode, req.url);
        });
        next();
    },
};

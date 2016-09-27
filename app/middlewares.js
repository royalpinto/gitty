'use strict';


const url = require('url');
const querystring = require('querystring');


module.exports = {
    log: (req, res, next) => {
        res.on('finish', () => {
            return console.log('%s %d %s', req.method, res.statusCode, req.url);
        });
        next();
    },

    easyResponse: (req, res, next) => {
        res.json = data => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
        };

        next();
    },

    querystring: (req, res, next) => {
        req.query = querystring.parse(url.parse(req.url).query);
        next();
    },
};

'use strict';


const url = require('url');
const querystring = require('querystring');


const _parseNumber = (value, defaultValue, max) => {
    if (value instanceof Array) {
        value = value[0];
    }

    value = parseInt(value, 10);
    value = value ? value : defaultValue;
    if (max && value > max) {
        value = max;
    }
    return value;
};


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

        res.status = status => {
            res.statusCode = status;
            return res;
        };

        next();
    },

    querystring: (req, res, next) => {
        req.query = querystring.parse(url.parse(req.url).query);
        next();
    },

    paginate: (defaultLimit, maxLimit) => {
        return (req, res, next) => {
            req.query.limit = _parseNumber(req.query.limit,
                defaultLimit, maxLimit);
            req.query.skip = _parseNumber(req.query.skip, 0);
            next();
        };
    },

    filter: (req, res, next) => {
        let filter = {};
        for (let key in req.query) {
            if (!key) {
                continue;
            }
            if (['limit', 'skip'].indexOf(key) > -1) {
                continue;
            }
            let value = req.query[key];
            if (value instanceof Array) {
                filter[key] = {
                    $in: value,
                };
            } else {
                filter[key] = value;
            }
        }

        req.query.filter = filter;
        next();
    },
};

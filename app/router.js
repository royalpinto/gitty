'use strict';


const url = require('url');


class Router {
    constructor() {
        this._patterns = [];
    }

    use(regex, cb) {
        this._patterns.push([regex, cb]);
    }

    post(regex, cb) {
        this._patterns.push([regex, cb, 'POST']);
    }

    get(regex, cb) {
        this._patterns.push([regex, cb, 'GET']);
    }

    put(regex, cb) {
        this._patterns.push([regex, cb, 'PUT']);
    }

    delete(regex, cb) {
        this._patterns.push([regex, cb, 'DELETE']);
    }

    dispatch(req, res, next) {
        let path = url.parse(req.url).pathname;
        let instance = this;

        let patternmatcher = function(sindex) {
            let matched = false;
            let index;

            let _next = function() {
                patternmatcher(index + 1);
            };

            for (index = sindex; index < instance._patterns.length; index++) {
                let pattern = instance._patterns[index];
                let regex = pattern[0];
                let method = pattern[2];

                // Skip if defined method is not matching with the incoming method.
                if (method && method !== req.method) {
                    continue;
                }

                // Skip if defined regex is not matching with the incoming url.
                let exec = regex.exec(path);
                if (exec) {
                    req.params = exec.slice(1);
                } else {
                    continue;
                }

                let cb = pattern[1];
                if (cb.constructor === Router) {
                    cb.dispatch(req, res, _next);
                } else {
                    cb(req, res, _next);
                }
                matched = true;
                break;
            }

            if (!matched) {
                next();
            }
        };

        patternmatcher(0);
    }

}


module.exports = Router;

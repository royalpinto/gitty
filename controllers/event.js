'use strict';


const collectionName = 'events';
const models = require('./../models');
const Controller = require('./controller');


class EventController extends Controller {

    get(query, limit, skip, order) {
        return models
        .collection(collectionName)
        .then(collection => {
            return collection
            .find(query).sort(order || {}).limit(limit).skip(skip)
            ;
        })
        .then(cursor => {
            return Promise.all([
                cursor.count(),
                cursor.toArray(),
            ])
            ;
        })
        .then(values => {
            return {
                count: values[0],
                data: values[1],
            };
        })
        ;
    }

}


module.exports = EventController;

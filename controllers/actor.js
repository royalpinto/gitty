// db.events.aggregate();

'use strict';


const errors = require('./../errors');
const collectionName = 'events';
const models = require('./../models');
const Controller = require('./controller');


class ActorController extends Controller {

    // Aggregate and fetch unique repos for the given actor.
    getRepos(id) {
        return models
        .collection(collectionName)
        .then(collection => {
            return new Promise((resolve, reject) => {
                collection
                .aggregate([
                    {$match: {'actor.login': id}},
                    {$group: {_id: '$repo.id', repo: {$first: '$repo'}}},
                    {$project: {_id: 0, repo: 1}},
                ], (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                })
                ;
            });
        })
        ;
    }

    getById(id) {
        return models
        .collection(collectionName)
        .then(collection => {
            return Promise.all([

                // Fetch actor info any of matching document.
                collection.findOne({
                    'actor.login': id,
                }, {
                    _id: 0,
                    actor: true,
                }),

                this.getRepos(id),
            ]);
        })
        .then(result => {
            let user = result[0];
            if (!user) {
                throw new errors.NotFound("Actor not found.");
            }

            let userinfo = user.actor;
            userinfo.repos = result[1].map(doc => {
                return doc.repo;
            });
            return user;
        })
        ;
    }

    // Fetch Top repository of an actor by number of events and created dates.
    getTopRepo(id) {
        return models
        .collection(collectionName)
        .then(collection => {
            return new Promise((resolve, reject) => {
                collection
                .aggregate([
                    // Take only given actors activities.
                    {$match: {'actor.login': id}},

                    // Group by repo and take the following:
                    // - count(number of activities).
                    // - createdAt.
                    {$group: {
                        _id: '$repo.id',
                        createdAt: {$first: '$created_at'},
                        repo: {$first: '$repo'},
                        count: {$sum: 1},
                    }},
                    // Sort by desc count and then desc createdAt.
                    {$sort: {count: -1, createdAt: -1}},

                    // Limit by one.
                    {$limit: 1},

                    // Knock off unwanted fields.
                    {$project: {_id: 0, repo: 1}},
                ], (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    let doc = result[0];
                    resolve(doc ? doc.repo : null);
                })
                ;
            });
        })
        ;
    }

    deleteEvents(id) {
        return models
        .collection(collectionName)
        .then(collection => {
            collection.deleteMany({
                'actor.login': id,
            })
            ;
        })
        ;
    }

}


module.exports = ActorController;

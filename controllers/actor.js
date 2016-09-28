// db.events.aggregate();

'use strict';


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
            let user = result[0].actor;
            user.repos = result[1].map(doc => {
                return doc.repo;
            });
            return user;
        })
        ;
    }

}


module.exports = ActorController;

'use strict';


const collectionName = 'events';
const models = require('./../models');
const Controller = require('./controller');


class RepoController extends Controller {

    getCount() {
        return models
        .collection(collectionName)
        .then(collection => {
            return new Promise((resolve, reject) => {
                collection.aggregate([
                    {$group: {_id: "$repo.id"}},
                    {$group: {_id: 1, count: {$sum: 1}}},
                ], (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
            });
        })
        .then(result => {
            return result[0].count;
        });
    }

    get(query, limit, skip, order) {
        return models
        .collection(collectionName)
        .then(collection => {
            return Promise.all([
                this.getCount(),
                new Promise((resolve, reject) => {
                    let pipeline = [{
                        // Take contributions by each actor for each repo.
                        $group: {
                            _id: {repo: '$repo.id', actor: '$actor.login'},
                            repo: {$first: '$repo'},
                            actor: {$first: '$actor'},
                            contributions: {$sum: 1},
                        },
                    }, {
                        // Remove unwanted fields.
                        $project: {_id: 0, repo: 1, actor: 1, contributions: 1},
                    }, {
                        // Sort by repo and contributions desc.
                        $sort: {'repo.id': 1, 'contributions': -1},
                    }, {
                        // Finally group by repo and take the first actor
                        // (highest contributions as sorted in the prev stage.)
                        $group: {
                            _id: '$repo.id',
                            repo: {$first: '$repo'},
                            actor: {$first: '$actor'},
                        },
                    }, {
                        $skip: skip,
                    }, {
                        $limit: limit,
                    }];
                    collection.aggregate(pipeline, (err, result) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve(result.map(doc => {
                            doc.repo.topContributor = doc.actor;
                            return doc.repo;
                        }));
                    });
                }),
            ]);
        })
        .then(result => {
            let count = result[0];
            return {
                count: count,
                data: result[1],
            };
        })
        ;
    }

}


module.exports = RepoController;

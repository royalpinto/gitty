'use strict';


const mongodb = require('mongodb');
const config = require('./../config');


let dbPromise;
const init = () => {
    if (!dbPromise) {
        dbPromise = mongodb.MongoClient.connect(config.db.uri);
    }
    // This promise can be used here to initialize models.
    // But for this assessment, not using any models.
};

init();


const models = {

    destroy: () => {
        dbPromise
        .then(db => {
            db.close();
            dbPromise = null;
        })
        .catch(console.error)
        ;
    },

    collection: name => {
        // Init only for the first time.
        if (!dbPromise) {
            models.init();
        }

        return dbPromise
        .then(db => {
            return db.collection(name);
        })
        ;
    },

};


module.exports = models;

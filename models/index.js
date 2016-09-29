'use strict';


const mongodb = require('mongodb');
const config = require('./../config');


let dbPromise;
const init = () => {
    dbPromise = mongodb.MongoClient.connect(config.db.uri);
    // This promise can be used here to initialize models.
    // Ideally this would initialize models and
    // later models can be accessed using syntax: models.<ModelName>
    // Ex: models.User
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
        return dbPromise
        .then(db => {
            return db.collection(name);
        })
        ;
    },

};


module.exports = models;

'use strict';

const fs = require('fs');
const models = require('./models');
const readline = require('readline');

const filename = process.argv[process.argv.length - 1];
console.log("Filename: %s", filename);

models.collection('events')
.then(collection => {
    return new Promise((resolve, reject) => {
        let counter = 0;
        let batch = collection.initializeOrderedBulkOp();
        readline.createInterface({
            input: fs.createReadStream(filename),
        })
        .on('line', line => {
            console.log("Processing line: %d", ++counter);
            let doc = JSON.parse(line);
            batch.insert(doc);
        })
        .on('close', () => {
            resolve(batch);
        })
        .on('SIGINT', () => {
            reject(new Error('Interrupted'));
        })
        .on('SIGSTP', () => {
            reject(new Error('Terminal Stop Signal'));
        })
        ;
    });
})
.then(batch => {
    return new Promise((resolve, reject) => {
        console.log('Inserting documents, please wait...');
        batch.execute((err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
})
.then(result => {
    console.log('Inserted %d documents', result.nInserted);
    models.destroy();
})
.catch(console.error)
;

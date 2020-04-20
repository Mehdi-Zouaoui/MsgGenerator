const mongo = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/messageGenerator';
let db = null;
let collection = null;

function connect() {
    mongo.connect(url, function (error, client) {
        if (error) console.log(error);
        console.log('Connecté à la base de données');
        db = client.db('messageGenerator');
        collection = db.collection('generators');
    })
}

async function getData() {

    collection.find({}).toArray(function (error, result) {
        console.log('res', result);
        if (error) {
            return error;
        } else if (result.length) {
            return result;
        } else {
            return 'No document found';
        }
    });
}

function insertOne(item) {

    db.collection('generators').insertOne(item, function (error, result) {
        if (error) {
            console.log(error)
        } else {
            console.log('Done', item);
        }
    });
}

module.exports = {
    connect,
    insertOne,
    getData

};

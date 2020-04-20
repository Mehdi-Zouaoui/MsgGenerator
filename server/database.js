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

function getData() {
    return collection.find({}).toArray().then((item) => {
            if(item.length) return(item);
            else return('error');
    })
}

function insertOne(item) {

    db.collection('generators').insertOne(item, function (error) {
        if (error) {
            console.log(error)
        } else {
            console.log('Done', item);
        }
    });
}
function deleteOne(id){
    collection.deleteOne({'_id': id});
}

module.exports = {
    connect,
    insertOne,
    getData,
    deleteOne

};

const mongo = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/messageGenerator';
let db = null;
let collection = null;

function connect() {
    return mongo.connect(url).then((client) => {
        console.log('Connecté à la base de données');
        return {
            db: client.db('messageGenerator'),
            collection: client.db('messageGenerator').collection('generators')
        }
    })

}

function insertOne(item) {


}

function deleteOne(id) {
    collection.deleteOne({'_id': id});
}

module.exports = {
    connect,
    insertOne,
    deleteOne

};

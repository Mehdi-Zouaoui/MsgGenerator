const mongoose = require("mongoose");
const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/messageGenerator';

const generatorSchema = new mongoose.Schema(
    {
        name: String,
        link: String,
        createdAt: Date,
        socialNetwork: String,
        keyword: Array,
        range: Number,
        model: Array,
        speed: Number,
        users: {
            number: Number,
            commentRange: Number
        }
    }
);

function getGenerators() {

}

function getGenerator() {

}

function createGenerator() {

}

function deleteGenerator(id) {
    mongo.connect(url, function (error, client) {
        if (error) console.log(error);
        console.log('Connecté à la base de données');
        const db = client.db('messageGenerator');
        const collection = db.collection('generators');
        collection.deleteOne({'_id': id});
    })
}



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

function getGenerators(collection) {
    return collection.find({}).toArray().then((item) => {
        if(item.length) return(item);
        else return('error');
    })
}

function createGenerator(collection , item){
   collection.insertOne(item, function (error) {
        if (error) {
            console.log(error)
        } else {
            console.log('Done', item);
        }
    });
}
function getGenerator() {

}

function createGenerator() {

}

function deleteGenerator(id) {
        collection.deleteOne({'_id': id});
}

module.exports = {
    getGenerators,
    deleteGenerator
};


const mongoose = require("mongoose");
const mongo = require('mongodb');
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
   collection.insertOne(item)
       .then(res => console.log('Element as been pushed to database' , res))
           .catch(err => console.error('failed to push to dabase' , err))
}
function getGenerator() {

}
function deleteGenerator(collection , id) {
        console.log('deleted');
        collection.deleteOne({_id: new mongo.ObjectID(id)})
            .then(res => console.log('Deleted' , res))
            .catch(err => console.error('failed with error' , err));
}

module.exports = {
    getGenerators,
    deleteGenerator,
    createGenerator
};


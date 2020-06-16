const mongo = require('mongodb');
const ObjectId = require('mongodb').ObjectID;

function getGenerators(collection) {
    return collection.find({}).toArray().then((item) => {
        if (item.length) return (item);
        else return ([]);
    }).catch(err => console.error(err));
}

function createGenerator(collection, item) {
    return collection.insertOne(item)
        .then(res => console.log('Element as been pushed to database'))
        .catch(err => console.error('failed to push to dabase', err))
}

function getGenerator(collection, id) {
    return collection.findOne({_id: new mongo.ObjectID(id)}).then((item) => {
        // console.log(`item de l'api` + item);
        return item;
    }).catch(err => console.log(err))
}

function updateGenerator(collection, id, objectUpdated) {
    console.log('object', objectUpdated);
    return collection.replaceOne({_id: ObjectId(id)}, objectUpdated).then((res) => {
        // console.log('Updated', res);
        return res
    }).catch((err) => {
        console.error('failed with error', err);
        throw err
    });
}

function deleteGenerator(collection, id) {
    console.log('deleted');
    return collection.deleteOne({_id: new mongo.ObjectID(id)})
        .then((res) => {
            console.log('Deleted');
            return res
        })
        .catch((err) => {
            console.error('failed with error', err);
            throw err

        });
}


module.exports = {
    getGenerators,
    deleteGenerator,
    createGenerator,
    getGenerator,
    updateGenerator,

};


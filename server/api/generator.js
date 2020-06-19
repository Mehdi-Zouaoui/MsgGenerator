const MessageFactory = require('./messageFactory');
const mongo = require('mongodb');
const ObjectId = require('mongodb').ObjectID;
const {Connection} = require('../database');
let collection = null;
Connection.connect().then(client => collection = client.collection);

class Generator {
    constructor(id, authorArray, speed, socialNetwork, keywords, model, minNumber, maxNumber) {
        this.id = id;
        this.isStarted = false;
        this.minNumber = minNumber;
        this.maxNumber = maxNumber;
        this.authorArray = authorArray;
        this.speed = speed;
        this.socialNetwork = socialNetwork;
        this.keywords = keywords.split('\n');
        this.model = model.split('\n');
        this.message = new MessageFactory(this.keywords, this.model, this.minNumber, this.maxNumber);
        this.timeout = null;
    }

    static getAll() {
        return collection.find({}).toArray().then((item) => {
            if (item.length) return (item);
            else return ([]);
        }).catch(err => console.error(err));
    }

    static create(item) {
        return collection.insertOne(item)
            .then(res => console.log('Element as been pushed to database'))
            .catch(err => console.error('failed to push to dabase', err))
    }

    static delete(id) {
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

    static getById(id) {
        return collection.findOne({_id: new mongo.ObjectID(id)}).then((item) => {
            // console.log(`item de l'api` + item);
            return item;
        }).catch(err => console.log(err))
    }

    static save(id, objectUpdated) {
        return collection.replaceOne({_id: ObjectId(id)}, objectUpdated).then((res) => {
            // console.log('Updated', res);
            return res
        }).catch((err) => {
            console.error('failed with error', err);
            throw err
        });
    }

    start() {
        this.isStarted = true;
        this.author = this.authorArray[Math.floor(Math.random() * this.authorArray.length)];
        console.log(this.author + ' says :  ' + this.message.generateMessage());
        this.timeout = setTimeout(this.start.bind(this), (60000 / this.speed));
    }

    stop() {
        this.isStarted = false;
        clearTimeout(this.timeout);
        console.log(`Flow ${this.id} stopped`);
    }
}

module.exports = Generator;

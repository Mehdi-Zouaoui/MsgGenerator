const MessageFactory = require('./messageFactory');
const mongo = require('mongodb');
const ObjectId = require('mongodb').ObjectID;
const {Connection} = require('../database');
const nameArray = require('../data/prenom');
let collection = null;
Connection.connect().then(client => collection = client.collection);

class Generator {
    constructor({_id, name, speed, socialNetworks, keywords, model, minNumber, maxNumber}) {
        this.id = _id;
        this.name = name;
        this.isStarted = false;
        this.minNumber = minNumber;
        this.maxNumber = maxNumber;
        this.speed = speed;
        this.socialNetworks = socialNetworks;
        this.keywords = keywords;
        this.model = model;
        this.message = new MessageFactory(this.keywords, this.model, this.minNumber, this.maxNumber);
        this.timeout = null;
    }

    static getAll() {
        const generatorsArray = [];
        return collection.find({}).toArray().then((items) => {
            if (items.length) {
                items.forEach(item => {
                    generatorsArray.push(new Generator(item));
                });
                return generatorsArray;
            } else return ([]);
        })
    };

    static create(item) {
        return collection.insertOne(item)
            .then(res => console.log('Element as been pushed to database'))
            .catch(err => console.error('failed to push to dabase', err))
    }

    delete(id) {
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
            console.log('Generator', item);
            return new Generator(item);
        });
    }

    save(id, objectUpdated) {
        return collection.replaceOne({_id: ObjectId(id)}, objectUpdated).then((res) => {
            // console.log('Updated', res);
            return res
        }).catch((err) => {
            console.error('failed with error', err);
            throw err
        });
    }

    update() {
    }

    start() {
        this.author = nameArray[Math.floor(Math.random() * nameArray.length)];
        console.log(this.author + ' says :  ' + this.message.generateMessage());
        this.timeout = setTimeout(() => {
            this.start()
        }, (60000 / this.speed));
        console.log(this.timeout)
    }

    stop() {
        clearTimeout(this.timeout);
        console.log(`Flow ${this.id} stopped`);
    }
}

module.exports = Generator;

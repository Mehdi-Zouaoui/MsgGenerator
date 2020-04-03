const mongoose = require("mongoose");

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

function deleteGenerator() {

}



const mongoose = require("mongoose");

const generatorSchema = new mongoose.Schema(
    {
        id: ObjectID,
        name: String,
        link: String,
        createdAt: Date,
        socialNetwork: String,
        config: {
            keyword: Array,
            range: Number,
            model: Array,
            speed: Number,
            users: {
                number: Number,
                commentRange: Number
            }
        }
    }
);

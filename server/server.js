const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const events = require('events');
const eventEmitter = new events.EventEmitter();
const password = "CliclicTV";
const database = require('./database');
let db = null ;
let collection = null;
const generator = require('./models/generator');
const token = "zkjndpzkjn";
app.use(cookieParser());
app.use(bodyParser());

database.connect().then((client) => {
     db = client.db;
     collection = client.collection;
});

console.log(collection);
// app.use(function (req, res, next) {
//     res.cookie('token', token ,{maxAge: 900000, httpOnly: true});
//     console.log('cookie created successfully', req.cookies);
//     next();
// });


app.listen(port, () => console.log(`Listening on port ${port}`));

app.post('/login', function (req, res) {
    console.log('password', req.body.password);
    if (password === req.body.password) {
        res.cookie('token', token, {maxAge: 900000, httpOnly: true});
        res.status(200).json({logged: true});
        console.log('WELCOME TO MESSAGE GENERATOR');
    } else res.status(400).send({error: 'YOUR PASSWORD IS NOT DEFINED'}); // error 500 c'est pour les erreurs inattendues côté serveur. Pour un mauvais mot de passe on met plutot : 400 ou 401. Voici là liste des code : https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP
});

app.get('/generators', function (req, res) {
    // console.log('collection' , collection);
    generator.getGenerators(collection).then((value) => {
        console.log('data' , value);
        res.json({'generators': value});
    });
});
app.delete('/generators',function (req,res) {
    console.log(req);
    console.log('delete method');

    // generator.deleteGenerator()
});

app.get('/generators/:id', function (req, res) {

    console.log(req.params.id);
    // generator.deleteGenerator(req.params.id);
});
//put
app.post('/generator', function (req, res) {

    console.log("HEY HELLO");
    console.log('Data', req.body);
    let generator = {
        name: req.body.name,
        socialNetworks: req.body.socialNetworks,
        speed: req.body.speed,
        keywords: req.body.keywords,
        minNumber: req.body.minNumber,
        maxNumber: req.body.maxNumber,
        generatorModel: req.body.generatorModel
    };
    database.insertOne(generator);

});
app.delete('/generator/:id', function (req, res) {

});

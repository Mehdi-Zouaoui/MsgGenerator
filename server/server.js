const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const events = require('events');
// // const eventEmitter = new events.EventEmitter();
const password = "CliclicTV";
const database = require('./database');
let db = null;
let collection = null;
const generator = require('./api/generator');
const token = "zkjndpzkjn";
app.use(cookieParser());
app.use(bodyParser());

database.connect().then((client) => {
    db = client.db;
    collection = client.collection;
});

console.log(collection);

let tokenCheck = function (req, res, next) {
    if(req.cookies.token){
        console.log('token middleware', req.cookies.token);
        next();
    } else res.redirect('/login');

};


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
        res.json({'generators': value});
    });
});

app.delete('/generator/:id', tokenCheck ,function (req, res, err) {

    console.log('I receive a delete request');
    console.log(req.params.id);
    if (!req.params.id) {
        const error = new Error('missing id');
        res.status(404);
        res.json({
            error: {
                message: error
            }
        })
    } else {
        generator.deleteGenerator(collection, req.params.id).then((item) => {
            console.log('item', item);
        })
            .catch((err) => {
                console.error('something went wrong', err);
            });
    }

});

app.put('/generator', function (req, res) {

    console.log("HEY HELLO");
    console.log('Data', req.body);
    let newGenerator = {
        name: req.body.name,
        socialNetworks: req.body.socialNetworks,
        speed: req.body.speed,
        keywords: req.body.keywords,
        minNumber: req.body.minNumber,
        maxNumber: req.body.maxNumber,
        generatorModel: req.body.generatorModel
    };
    generator.createGenerator(collection, newGenerator);

});


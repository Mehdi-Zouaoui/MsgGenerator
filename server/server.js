const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const password = "CliclicTV";
const database = require('./database');
const token = "zkjndpzkjn";
app.use(cookieParser());
app.use(bodyParser());
database.connect();
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
   let data = database.getData();
   console.log('data' , database.result);
    res.json({'generators': data});

});

app.get('/generator/:id', function (req, res) {

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

    // mongo.connect(url, function (error, client) {
    //
    //     const db = client.db('messageGenerator');
    //     if (error) {
    //         console.log('Unable to connect to server', error)
    //     } else {
    //         console.log('Connected to server');
    //     }
    //
    //     db.collection('generators').insertOne(generator, function (error, result) {
    //         if (error) {
    //             console.log(error)
    //         } else {
    //             console.log('Done', generator);
    //         }
    //     });
    //
    //
    // })
    // Use body middleware to get axios request from front

});
app.delete('/generator/:id', function (req, res) {

});

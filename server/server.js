const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const password = "CliclicTV";
const token = "zkjndpzkjn";
app.use(cookieParser());
app.use(bodyParser());
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

});
app.get('/generator/:id', function (req, res) {

});
app.put('/generator', function (req, res) {
    console.log('password', req.body.password);
});
app.delete('/generator/:id', function (req, res) {

});

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


app.post('/' , function(req , res){
    console.log('password', req.body.password);
});

app.get('/express_backend', (req, res) => {
    res.send({express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT'});
});
app.post('/express_backend', (req, res) => {
});
app.get('login' , function(req,res){
    res.json({express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT'});
});
app.post('/login', function (req, res) {
    console.log('password', req.body.password);
    if (password === req.body.password) {
        res.cookie('token', token, {maxAge: 900000, httpOnly: true});
        res.json({logged: true});
        console.log('WELCOME TO MESSAGE GENERATOR');
    } else res.send('YOUR PASSWORD IS NOT DEFINED');

});

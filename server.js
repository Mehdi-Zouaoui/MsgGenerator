const express = require('express');
const app = express();
const path = __dirname + '/views/';
// app.use(express.static('views'));

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path +'index.html');
});

app.get('/login', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path +'login.html');
});


app.listen(8080);

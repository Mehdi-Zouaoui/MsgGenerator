const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const password = "CliclicTV";
const timeout = require('connect-timeout');
const Generator = require('./api/generator');
const {Connection} = require('./database');

let flows = [];
const token = "zkjndpzkjn";

app.use(cookieParser());
app.use(bodyParser());
app.use(timeout(1000000000));

let tokenCheck = function (req, res, next) {
    if (req.cookies.token) {
        next();
    } else {
        res.sendStatus(401);
        next(new Error('Un-Authorized'));
    }
};

async function initServer() {
    app.listen(port, function () {
        Connection.connect().then(() => {
            Generator.getAll().then(items => {
                let startedGenerators = items.filter(dbGenerator => dbGenerator.isStarted === true);
                startedGenerators.forEach((dbGenerator) => {
                    dbGenerator.start();
                    flows.push(dbGenerator)
                })
            })
        });
        console.log(`Listening on port ${port}`);
    });
}

app.post('/login', function (req, res) {
    console.log('password', req.body.password);
    if (password === req.body.password) {
        console.log('req', req.body.password);
        res.cookie('token', token, {maxAge: 900000, httpOnly: true});

        res.json({logged: true});
        console.log('WELCOME TO MESSAGE GENERATOR');
    } else res.status(400).send({error: 'YOUR PASSWORD IS NOT DEFINED'}); // error 500 c'est pour les erreurs inattendues côté serveur. Pour un mauvais mot de passe on met plutot : 400 ou 401. Voici là liste des code : https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP
});

app.get('/generators', tokenCheck, function (req, res, err) {

    Generator.getAll().then((value) => {
        res.json({'generators': value});
    }).catch((err) => {
        res.sendStatus(500)
    });

});

app.delete('/generator/:id', tokenCheck, function (req, res, err) {

    Generator.getById(req.params.id, req, res).then((item) => {
        // console.log('Item here ' , item);
        item.delete(item.id)
    }).catch((err) => {
        if (!req.params.id) {
            res.sendStatus(404).catch(err => {
                return err
            });
        } else {
            res.sendStatus(500).catch(err => {
                return err
            });
        }
        console.error('something went wrong', err);
    });


});

app.get('/generator/:id', tokenCheck, function (req, res) {
    console.log('get id', req.params.id);
    Generator.getById(req.params.id, req, res).then((item) => {
        res.json({'updatedGenerator': item});
    }).catch((err) => {
        if (!req.params.id) {
            res.sendStatus(404);
        } else {
            res.sendStatus(500);
        }
        console.error('something went wrong', err);
    });
});

app.get('/generator/:id/start', tokenCheck, function (req, res) {
    console.log(`we're in start`);
    Generator.getById(req.params.id, req, res).then((item) => {
        console.log(req.params.id);
        item.start();
        flows.push(item);
        item.save(item.id,
            {
                name: item.name,
                socialNetworks: item.socialNetworks,
                speed: item.speed,
                keywords: item.keywords,
                minNumber: item.minNumber,
                maxNumber: item.maxNumber,
                model: item.model,
                isStarted: true,
            }).then((item) => {

            res.json({'startedGenerator': item});
        });

    }).catch((err) => {
        if (!req.params.id) {
            res.sendStatus(404)
        } else {
            res.sendStatus(500)
        }
        console.error('something went wrong', err);
    });
});

app.get('/generator/:id/stop', tokenCheck, function (req, res) {
    console.log(`we're in stop`);

    Generator.getById(req.params.id, req, res).then((item) => {

        flows.forEach(flow => {
            console.log(item.id + '/' + flow.id);
            if (JSON.stringify(flow.id) === JSON.stringify(item.id)) {
                flow.stop();
            }
        });
        item.save(item.id,
            {
                name: item.name,
                socialNetworks: item.socialNetworks,
                speed: item.speed,
                keywords: item.keywords,
                minNumber: item.minNumber,
                maxNumber: item.maxNumber,
                model: item.model,
                isStarted: false
            }).then((item) => {
            res.json({'stoppedGenerator': item});
        });

    }).catch((err) => {
        if (!req.params.id) {
            res.sendStatus(404)
        } else {
            res.sendStatus(500)
        }
        console.error('something went wrong', err);
    });
});

app.put('/generator/:id', tokenCheck, function (req, res) {
    console.log(req.params.id);
    let updatedGenerator = {
        name: req.body.name,
        socialNetworks: req.body.socialNetworks,
        speed: req.body.speed,
        keywords: req.body.keywords,
        minNumber: req.body.minNumber,
        maxNumber: req.body.maxNumber,
        model: req.body.model
    };
    console.log('Update', updatedGenerator);
    Generator.getById(req.params.id, req, res).then((item) => {
        item.save(item.id, updatedGenerator).then(() => {
            res.sendStatus(200);
        }).catch((err) => {
            if (!req.params.id) {
                res.sendStatus(404);
            } else {
                res.sendStatus(500);
            }
            console.error('something went wrong', err);
        });
    });
});

app.put('/generator', tokenCheck, function (req, res) {
    console.log("HEY HELLO");
    console.log('Data', req.body);
    let newGenerator = {
        name: req.body.name,
        socialNetworks: req.body.socialNetworks,
        speed: req.body.speed,
        keywords: req.body.keywords,
        minNumber: req.body.minNumber,
        maxNumber: req.body.maxNumber,
        model: req.body.model,
        isStarted: false
    };
    Generator.create(newGenerator).then((item) => {
        console.log(item);
        res.sendStatus(200);
    }).catch((err) => {
        res.sendStatus(500);
        console.error('something went wrong', err);
    });
});
initServer().then(() => {
    console.log('Server is ')
});


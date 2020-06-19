const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const password = "CliclicTV";
const database = require('./database');
const timeout = require('connect-timeout');
const Generator = require('./api/generator');
const {Connection} = require('./database');

let flows = [];
const nameArray = require('./data/prenom');
let db = [];
let collection = null;
const generator = require('./api/generator');
const token = "zkjndpzkjn";

app.use(cookieParser());
app.use(bodyParser());
app.use(timeout(10000000));

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
            Generator.getAll().then((items) => {
                console.log('Static', items);
                let startedGenerators = items.filter(dbGenerator => dbGenerator.isStarted === true);
                startedGenerators.forEach((dbGenerator) => {
                    const generator = new Generator(dbGenerator._id, nameArray, dbGenerator.speed, dbGenerator.socialNetworks, dbGenerator.keywords, dbGenerator.generatorModel, dbGenerator.minNumber, dbGenerator.maxNumber)
                    generator.start();
                    flows.push(generator)
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
        res.sendStatus(500).catch((err) => console.error(err));
        console.error(err)
    });

});

app.delete('/generator/:id', tokenCheck, function (req, res, err) {

    Generator.delete(req.params.id).then((item) => {
        const currentFlow = flows.filter(item => item.id === req.params.id)[0];
        if (currentFlow) currentFlow.stop();
        flows = flows.filter(function (item) {
            return item.id !== req.params.id;
        });
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

app.get('/generator/:id', tokenCheck, function (req, res) {
    console.log('get id', req.params.id);
    Generator.getById(req.params.id, req, res).then((item) => {
        res.json({'updatedGenerator': item});
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

app.get('/generator/:id/start', tokenCheck, function (req, res) {
    console.log(`we're in start`);
    Generator.getById(req.params.id, req, res).then((item) => {
        const newFlow = new Generator(req.params.id, nameArray, item.speed, item.socialNetworks, item.keywords, item.generatorModel, item.minNumber, item.maxNumber);
        Generator.save(req.params.id,
            {
                name: item.name,
                socialNetworks: item.socialNetworks,
                speed: item.speed,
                keywords: item.keywords,
                minNumber: item.minNumber,
                maxNumber: item.maxNumber,
                generatorModel: item.generatorModel,
                isStarted: true
            }).then((item) => {
            res.json({'startedGenerator': item});
        });
        flows.push(newFlow);
        newFlow.start();
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
        console.log(flows);
        flows.forEach(flow => {
            if (JSON.stringify(flow.id) === JSON.stringify(item._id)) {
                flow.stop();
                const indexFlow = flows.indexOf(flow);
                if (indexFlow >= 0) {
                    console.log('index du flow courant' + indexFlow);
                    flows.splice(indexFlow, 1);
                    console.log(flows)
                }
            }
        });
        Generator.save(req.params.id,
            {
                name: item.name,
                socialNetworks: item.socialNetworks,
                speed: item.speed,
                keywords: item.keywords,
                minNumber: item.minNumber,
                maxNumber: item.maxNumber,
                generatorModel: item.generatorModel,
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
        generatorModel: req.body.generatorModel
    };
    console.log('Update', updatedGenerator);
    Generator.save(req.params.id, updatedGenerator).then(() => {
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
        generatorModel: req.body.generatorModel,
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


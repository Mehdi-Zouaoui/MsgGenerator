const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const password = "CliclicTV";
const database = require('./database');
const timeout = require('connect-timeout');
const Flow = require('./api/flow');
let flows = null;
const nameArray = require('./data/prenom');
let db = [];
let collection = null;
let flowsCollection = null
const generator = require('./api/generator');
const token = "zkjndpzkjn";

app.use(cookieParser());
app.use(bodyParser());
app.use(timeout(100000));

database.connect('generators').then((client) => {
    db = client.db;
    collection = client.collection;
    db.createCollection('flows').then((data) => {
        flowsCollection = data;
    }).catch((err) => {
        console.log(err)
    })

});

async function createFlow(item) {
    return await generator.createGenerator(flowsCollection, item)
}


let tokenCheck = function (req, res, next) {
    if (req.cookies.token) {
        next();
    } else {
        res.sendStatus(401);
        next(new Error('Un-Authorized'));
    }
};

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
    console.log('mes flows', flows);

});

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
    generator.getGenerators(collection).then((value) => {
        res.json({'generators': value});
    }).catch((err) => {
        res.sendStatus(500).catch((err) => console.error(err));
        console.error(err)
    });
});

app.delete('/generator/:id', tokenCheck, function (req, res, err) {
    console.log('I receive a delete request');
    console.log(req.params.id);

    generator.deleteGenerator(collection, req.params.id).then((item) => {
        console.log(item);
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
    generator.getGenerator(collection, req.params.id, req, res).then((item) => {
        console.log('Server item', item);
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

    generator.getGenerator(collection, req.params.id, req, res).then((item) => {
        console.log('Server item', item);
        const newFlow = new Flow(req.params.id, nameArray, item.speed, item.socialNetworks, item.keywords, item.generatorModel, item.minNumber, item.maxNumber);
        newFlow.start();
        if (!flows.includes(req.params.id)) flows.push(newFlow);
        createFlow({id: req.params.id, isStarted: newFlow.isStarted}).then(r => console.log(r))
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
app.get('/generator/:id/stop', tokenCheck, function (req, res) {
    console.log(`we're in stop`);
    console.log('All the flows', flows);
    const currentFlow = flows.filter(item => item.id === req.params.id)[0];
    currentFlow.stop();
    flows = flows.filter(function (item) {
        return item.id !== req.params.id;
    });
    console.log('All the flows', flows);
    res.sendStatus(200)

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
    generator.updateGenerator(collection, req.params.id, updatedGenerator).then(() => {
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
        generatorModel: req.body.generatorModel
    };
    generator.createGenerator(collection, newGenerator).then((item) => {
        console.log(item);
        res.sendStatus(200);
    }).catch((err) => {
        res.sendStatus(500);
        console.error('something went wrong', err);
    });
});


'use strict';

const express = require('express');

const user = require('../lib/endpoints/users');
const testObject = require('../lib/endpoints/testObjects');

const appConfig = require('./appConfig')

const app = express();

app.use(express.json());

app.get('/users/', user.getUsers);
app.post('/users/', user.addUser);
app.delete('/users/', user.deleteUser);

app.get('/test/', testObject.getObjects);
app.post('/test', testObject.addObject);
app.delete('/test/', testObject.deleteObject)

app.listen(appConfig.port, appconfig.host);
console.log('Running on http://' + appconfig.host + ':' + appconfig.port);
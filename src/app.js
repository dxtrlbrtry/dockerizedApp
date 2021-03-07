'use strict';

const express = require('express');
const user = require('../lib/endpoints/users');
const testObject = require('../lib/endpoints/testObjects');
const DbService = require('../lib/dbService').DbService
// Constants
const PORT = 1234;
const HOST = '0.0.0.0';
const app = express();

exports.db = new DbService({
    'host': '172.18.0.2',
    'port': 33060,
    'user': 'root',
    'password': 'password'
})

app.use(express.json());

app.get('/users/', user.getUsers);
app.post('/users/', user.addUser);
app.delete('/users/', user.deleteUser);

app.get('/test/', testObject.getObjects);
app.post('/test', testObject.addObject);
app.delete('/test/', testObject.deleteObject)

app.listen(PORT, HOST);
console.log('Running on http://' + HOST + ':' + PORT);
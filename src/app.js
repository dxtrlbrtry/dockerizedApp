'use strict';

const user = require('./endpoints/users');
const testObject = require('./endpoints/testObjects');

const express = require('express');
const app = express();

app.use(express.json());

app.get('/users/', user.getUsers);
app.post('/users/', user.addUser);
app.delete('/users/', user.deleteUser);

app.get('/test/', testObject.getObjects);
app.post('/test', testObject.addObject);
app.delete('/test/', testObject.deleteObject)

app.listen(process.env.APP_PORT, process.env.APP_HOST);
console.log('Running on http://' + process.env.APP_HOST + ':' + process.env.APP_PORT);
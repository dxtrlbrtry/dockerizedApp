'use strict';

const logger = require('../lib/logger')

const admin = require('../endpoints/admin')
const user = require('../endpoints/users');
const testObject = require('../endpoints/testObjects');

const express = require('express');
const app = express();

app.use(express.json());

app.post('/admin/usersTable/', admin.createUsersTable);
app.post('/admin/testTable/', admin.createTestTable);
app.delete('/admin/usersTable', admin.deleteUsersTable);
app.delete('/admin/testTable', admin.deleteTestTable);

app.get('/users/', user.getUsers);
app.post('/users/', user.addUser);
app.delete('/users/', user.deleteUser);

app.get('/test/', testObject.getObjects);
app.post('/test', testObject.addObject);
app.delete('/test/', testObject.deleteObject)

app.listen(process.env.APP_PORT, process.env.APP_HOST);
logger.log('Running on http://' + process.env.APP_HOST + ':' + process.env.APP_PORT);
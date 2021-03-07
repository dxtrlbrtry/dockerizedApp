var schemas = require('../schemas');
var app = require('../../src/app')

exports.getUsers = function(req, res) {
  app.db.getTable(schemas.user)
    .then(result => res.send({ statusCode: 200, result: result }))
    .catch(err => res.send({ statusCode: 400, 'error: ': err }));
  };
  
exports.addUser = function(req, res) {
  app.db.insertItem(schemas.user, req.body)
    .then(result =>  res.send({ statusCode: 202, result: result }))
    .catch(err => res.send({ statusCode: 400, 'error: ': err }));
  }
  
exports.deleteUser = function(req, res) {
  app.db.deleteItem(schemas.user, req.body)
    .then(result => res.send({ statusCode: 200, result: result })) 
    .catch(err => res.send({ statusCode: 400, 'error: ': err }));
  }
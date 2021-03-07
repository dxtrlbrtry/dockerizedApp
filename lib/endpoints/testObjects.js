var schemas = require('../schemas');
var app = require('../../src/app')

exports.getObjects = function(req, res) {
  app.db.getTable(schemas.testObject)
    .then(result => res.send({ statusCode: 200, result: result }))
    .catch(err => res.send({ statusCode: 400, 'error: ': err }));
  };
  
exports.addObject = function(req, res) {
  app.db.insertItem(schemas.testObject, req.body)
    .then(result =>  res.send({ statusCode: 202, result: result }))
    .catch(err => res.send({ statusCode: 400, 'error: ': err }));
  }
  
exports.deleteObject = function(req, res) {
  app.db.deleteItem(schemas.testObject, req.body)
    .then(result => res.send({ statusCode: 200, result: result })) 
    .catch(err => res.send({ statusCode: 400, 'error: ': err }));
  }
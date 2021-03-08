const db = require('../../lib/dbService');
const schemas = db.schemas;

exports.getObjects = function(req, res) {
  db.getTable(schemas.testObject)
    .then(result => res.send({ statusCode: 200, result: result }))
    .catch(err => res.send({ statusCode: 400, 'error: ': err }));
  };
  
exports.addObject = function(req, res) {
  db.insertItem(schemas.testObject, req.body)
    .then(result =>  res.send({ statusCode: 202, result: result }))
    .catch(err => res.send({ statusCode: 400, 'error: ': err }));
  }
  
exports.deleteObject = function(req, res) {
  db.deleteItem(schemas.testObject, req.body)
    .then(result => res.send({ statusCode: 200, result: result })) 
    .catch(err => res.send({ statusCode: 400, 'error: ': err }));
  }
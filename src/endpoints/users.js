const db = require('../../lib/dbService')
const schemas = db.schemas;

exports.getUsers = function(req, res) {
  db.getTable(schemas.user)
    .then(result => res.send({ statusCode: 200, result: result }))
    .catch(err => res.send({ statusCode: 400, 'error: ': err }));
  };
  
exports.addUser = function(req, res) {
  db.insertItem(schemas.user, req.body)
    .then(result =>  res.send({ statusCode: 202, result: result }))
    .catch(err => res.send({ statusCode: 400, 'error: ': err }));
  }
  
exports.deleteUser = function(req, res) {
  db.deleteItem(schemas.user, req.body)
    .then(result => res.send({ statusCode: 200, result: result })) 
    .catch(err => res.send({ statusCode: 400, 'error: ': err }));
  }
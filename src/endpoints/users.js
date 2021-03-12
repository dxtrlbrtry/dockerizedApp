const db = require('../../lib/dbService')
const schemas = db.schemas;
const logger = require('../../lib/logger')

exports.getUsers = function(req, res) {
  logger.log(`GET request received at /users/`)
  db.getTable(schemas.user)
    .then(result => res.send({ statusCode: 200, result: result }))
    .catch(err => {
      logger.error(err);
      res.send({ statusCode: 400, 'error: ': err });
    })
  };
  
exports.addUser = function(req, res) {
  logger.log(`POST request received at /users/`)
  db.insertItem(schemas.user, req.body)
    .then(result =>  res.send({ statusCode: 202, result: result }))
    .catch(err => {
      logger.error(err);
      res.send({ statusCode: 400, 'error: ': err });
    })
  }
  
exports.deleteUser = function(req, res) {
  logger.log(`DELETE request received at /users/`)
  db.deleteItem(schemas.user, req.body)
    .then(result => res.send({ statusCode: 200, result: result }))
    .catch(err => {
      logger.error(err);
      res.send({ statusCode: 400, 'error: ': err });
    })
  }
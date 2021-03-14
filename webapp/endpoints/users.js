const { getTable, insertItem, deleteItem, tables } = require('../lib/dbService');
const logger = require('../../common/logger')

exports.getUsers = function(req, res) {
  logger.log(`GET request received at /users/`)
  getTable(tables.USERS, req.query)
    .then(result => res.send({ statusCode: 200, body: result }))
    .catch(err => {
      logger.error(err);
      res.send({ statusCode: 400, body: err });
    })
  };
  
exports.addUser = function(req, res) {
  logger.log(`POST request received at /users/`)
  insertItem(tables.USERS, req.body)
    .then(result =>  res.send({ statusCode: 202, body: result }))
    .catch(err => {
      logger.error(err);
      res.send({ statusCode: 400, body: err });
    })
  }
  
exports.deleteUser = function(req, res) {
  logger.log(`DELETE request received at /users/`)
  deleteItem(tables.USERS, req.body)
    .then(result => res.send({ statusCode: 200, body: result }))
    .catch(err => {
      logger.error(err);
      res.send({ statusCode: 400, body: err });
    })
  }
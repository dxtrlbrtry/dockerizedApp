const db = require('../dbService')
const schemas = require('../../common/schemas')
const logger = require('../../common/logger')

exports.createUsersTable = function(req, res) {
  logger.log(`POST request received at /admin/usersTable`)
  db.createTable(schemas.user)
    .then(result => res.send({ statusCode: 200, result: result }))
    .catch(err => {
      logger.error(err);
      res.send({ statusCode: 400, 'error: ': err });
    })
  };
  
exports.createTestTable = function(req, res) {
  logger.log(`POST request received at /admin/testTable`)
  db.createTable(schemas.testObject)
    .then(result => res.send({ statusCode: 200, result: result }))
    .catch(err => {
      logger.error(err);
      res.send({ statusCode: 400, 'error: ': err });
    })
  };

exports.deleteUsersTable = function(req, res) {
  logger.log(`DELETE request received at /admin/usersTable`)
  db.dropTable(schemas.user)
    .then(result => res.send({ statusCode: 200, result: result }))
    .catch(err => {
      logger.error(err);
      res.send({ statusCode: 400, 'error: ': err });
    })
  };
    
exports.deleteTestTable = function(req, res) {
  logger.log(`DELETE request received at /admin/testTable`)
  db.dropTable(schemas.testObject)
    .then(result => res.send({ statusCode: 200, result: result }))
    .catch(err => {
      logger.error(err);
      res.send({ statusCode: 400, 'error: ': err });
    })
  };
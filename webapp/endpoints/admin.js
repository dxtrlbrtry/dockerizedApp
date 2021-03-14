const { createTable, dropTable, tables } = require('../lib/dbService')
const logger = require('../../common/logger')

exports.createUsersTable = function(req, res) {
  logger.log(`POST request received at /admin/usersTable`)
  createTable(tables.USERS)
    .then(result => res.send({ statusCode: 200, body: result }))
    .catch(err => {
      logger.error(err);
      res.send({ statusCode: 400, body: err });
    })
  };
  
exports.createTestTable = function(req, res) {
  logger.log(`POST request received at /admin/testTable`)
  createTable(tables.TESTOBJECT)
    .then(result => res.send({ statusCode: 200, body: result }))
    .catch(err => {
      logger.error(err);
      res.send({ statusCode: 400, body: err });
    })
  };

exports.deleteUsersTable = function(req, res) {
  logger.log(`DELETE request received at /admin/usersTable`)
  dropTable(tables.USERS)
    .then(result => res.send({ statusCode: 200, body: result }))
    .catch(err => {
      logger.error(err);
      res.send({ statusCode: 400, body: err });
    })
  };
    
exports.deleteTestTable = function(req, res) {
  logger.log(`DELETE request received at /admin/testTable`)
  dropTable(tables.TESTOBJECT)
    .then(result => res.send({ statusCode: 200, body: result }))
    .catch(err => {
      logger.error(err);
      res.send({ statusCode: 400, body: err });
    })
  };
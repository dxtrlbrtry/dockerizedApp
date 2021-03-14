const db = require('../lib/dbService');
const logger = require('../../common/logger')

exports.getObjects = function(req, res) {
  logger.log(`GET request received at /test/`)
  db.getTable(db.tables.TESTOBJECT, req.query)
    .then(result => res.send({ statusCode: 200, body: result }))
    .catch(err => {
      logger.error(err);
      res.send({ statusCode: 400, body: err });
    })
  };
  
exports.addObject = function(req, res) {
  logger.log(`POST request received at /test/`)
  db.insertItem(db.tables.TESTOBJECT, req.body)
    .then(result =>  res.send({ statusCode: 202, body: result }))
    .catch(err => {
      logger.error(err);
      res.send({ statusCode: 400, body: err });
    })
  }
  
exports.deleteObject = function(req, res) {
  logger.log(`DELETE request received at /test/`)
  db.deleteItem(db.tables.TESTOBJECT, req.body)
    .then(result => res.send({ statusCode: 200, body: result })) 
    .catch(err => {
      logger.error(err);
      res.send({ statusCode: 400, body: err });
    })
  }
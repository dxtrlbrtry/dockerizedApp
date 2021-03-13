const db = require('../lib/dbService');
const logger = require('../lib/logger')

exports.getObjects = function(req, res) {
  logger.log(`GET request received at /test/`)
  db.getTable(db.tables.TESTOBJECT)
    .then(result => res.send({ statusCode: 200, result: result }))
    .catch(err => {
      logger.error(err);
      res.send({ statusCode: 400, 'error: ': err });
    })
  };
  
exports.addObject = function(req, res) {
  logger.log(`POST request received at /test/`)
  db.insertItem(db.tables.TESTOBJECT, req.body)
    .then(result =>  res.send({ statusCode: 202, result: result }))
    .catch(err => {
      logger.error(err);
      res.send({ statusCode: 400, 'error: ': err });
    })
  }
  
exports.deleteObject = function(req, res) {
  logger.log(`DELETE request received at /test/`)
  db.deleteItem(db.tables.TESTOBJECT, req.body)
    .then(result => res.send({ statusCode: 200, result: result })) 
    .catch(err => {
      logger.error(err);
      res.send({ statusCode: 400, 'error: ': err });
    })
  }
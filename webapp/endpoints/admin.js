const db = require('../lib/dbService');
const logger = require('../lib/logger');
const app = require('../bin/app');

app.post('/admin/usersTable/', function(req, res) {
  logger.log(`POST request received at /admin/usersTable`)
  db.createTable(db.tables.USER)
    .then(result => res.send({ statusCode: 200, result: result }))
    .catch(err => {
      logger.error(err);
      res.send({ statusCode: 400, 'error: ': err });
    })
});
  
app.post('/admin/testTable', function(req, res) {
  logger.log(`POST request received at /admin/testTable`)
  db.createTable(db.tables.TESTOBJECT)
    .then(result => res.send({ statusCode: 200, result: result }))
    .catch(err => {
      logger.error(err);
      res.send({ statusCode: 400, 'error: ': err });
    })
});

app.delete('/admin/testTable/', function(req, res) {
  logger.log(`DELETE request received at /admin/usersTable`)
  db.dropTable(db.tables.USER)
    .then(result => res.send({ statusCode: 200, result: result }))
    .catch(err => {
      logger.error(err);
      res.send({ statusCode: 400, 'error: ': err });
    })
});
    
app.delete('/admin/testTable', function(req, res) {
  logger.log(`DELETE request received at /admin/testTable`)
  db.dropTable(db.tables.TESTOBJECT)
    .then(result => res.send({ statusCode: 200, result: result }))
    .catch(err => {
      logger.error(err);
      res.send({ statusCode: 400, 'error: ': err });
    })
});
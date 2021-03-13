const db = require('../lib/dbService')
const logger = require('../lib/logger')
const app = require('../bin/app')

app.get('/users/', function(req, res) {
  logger.log(`GET request received at /users/`)
  db.getTable(db.tables.USERS)
    .then(result => res.send({ statusCode: 200, result: result }))
    .catch(err => {
      logger.error(err);
      res.send({ statusCode: 400, 'error: ': err });
    })
});
  
app.post('/users/', function(req, res) {
  logger.log(`POST request received at /users/`)
  db.insertItem(db.tables.USERS, req.body)
    .then(result =>  res.send({ statusCode: 202, result: result }))
    .catch(err => {
      logger.error(err);
      res.send({ statusCode: 400, 'error: ': err });
    })
});
  
app.delete('/users/', function(req, res) {
  logger.log(`DELETE request received at /users/`)
  db.deleteItem(db.tables.USERS, req.body)
    .then(result => res.send({ statusCode: 200, result: result }))
    .catch(err => {
      logger.error(err);
      res.send({ statusCode: 400, 'error: ': err });
    })
});
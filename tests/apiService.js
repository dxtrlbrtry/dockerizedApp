const request = require('request-promise');
const schemas = require('../lib/dbService').schemas;
var Logger = require('../lib/logger').Logger;
var logger = new Logger(module.filename)

const baseUrl = 'http://' + process.env.APP_HOST + ':' + process.env.APP_PORT;

exports.getAll = async function (schema) {
  let endpoint =
    schema == schemas.user ? 'users/' :
    schema == schemas.testObject ? 'test/' : '';
  const options = {
    method: 'GET',
    url: baseUrl + '/' + endpoint,
    json: false,
    resolveWithFullResponse: false
  }
  logger.log(`Sending request ${JSON.stringify(options)}`)
  return await request(options)
    .then(resp => {
      logger.log('Received response ' + JSON.stringify(resp)) 
      return JSON.parse(resp)
    }).catch(err => logger.error(err));
}

exports.addItem = async function(schema, item) {
  let endpoint =
    schema == schemas.user ? 'users/' :
    schema == schemas.testObject ? 'test/' : '';
  const options = {
    method: 'POST',
    url: baseUrl + '/' + endpoint,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
    json: false,
    resolveWithFullResponse: false
  }
  logger.log(`Sending request ${JSON.stringify(options)}`)
  return await request(options)
    .then(resp => {
      logger.log('Received response ' + JSON.stringify(resp))
      return JSON.parse(resp)
    }).catch(err => logger.error(err));
}

exports.deleteItem = async function(schema, item) {
  let endpoint =
    schema == schemas.user ? 'users/' :
    schema == schemas.testObject ? 'test/' : '';
  const options = {
    method: 'DELETE',
    url: baseUrl + '/' + endpoint,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
    json: false,
    resolveWithFullResponse: false
  }
  logger.log(`Sending request ${JSON.stringify(options)}`)
  return await request(options)
    .then(resp => {
      logger.log('Received response ' + JSON.stringify(resp))
      return JSON.parse(resp)
    }).catch(err => logger.error(err));
}
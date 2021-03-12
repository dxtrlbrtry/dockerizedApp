const request = require('request-promise');
const schemas = require('../lib/schemas');
const logger = require('../lib/logger');

const baseUrl = 'http://' + process.env.APP_HOST + ':' + process.env.APP_PORT;

async function sendRequest(options) {
  logger.log('dont rebuild me lol')
  logger.log(`Sending request ${JSON.stringify(options)}`)
  return await request(options)
    .then(resp => {
      logger.log(`Received response ${JSON.stringify(resp)}`)
      return JSON.parse(resp)
    }).catch(err => logger.error(err));
}

exports.createTable = async function(schema) {
  let endpoint =
    schema == schemas.user ? 'admin/usersTable/' :
    schema == schemas.testObject ? 'admin/testTable/' : '';
  return await sendRequest({
    method: 'POST',
    url: baseUrl + '/' + endpoint,
    json: false,
    resolveWithFullResponse: false
  });
}

exports.deleteTable = async function(schema) {
  let endpoint =
    schema == schemas.user ? 'admin/usersTable/' :
    schema == schemas.testObject ? 'admin/testTable/' : '';
  return await sendRequest({
    method: 'DELETE',
    url: baseUrl + '/' + endpoint,
    json: false,
    resolveWithFullResponse: false
  });
}

exports.getAll = async function (schema) {
  let endpoint =
    schema == schemas.user ? 'users/' :
    schema == schemas.testObject ? 'test/' : '';
  return await sendRequest({
    method: 'GET',
    url: baseUrl + '/' + endpoint,
    json: false,
    resolveWithFullResponse: false
  });
}

exports.addItem = async function(schema, item) {
  let endpoint =
    schema == schemas.user ? 'users/' :
    schema == schemas.testObject ? 'test/' : '';
  return await sendRequest({
    method: 'POST',
    url: baseUrl + '/' + endpoint,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
    json: false,
    resolveWithFullResponse: false
  });
}

exports.deleteItem = async function(schema, item) {
  let endpoint =
    schema == schemas.user ? 'users/' :
    schema == schemas.testObject ? 'test/' : '';
  return await sendRequest({
    method: 'DELETE',
    url: baseUrl + '/' + endpoint,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
    json: false,
    resolveWithFullResponse: false
  });
}
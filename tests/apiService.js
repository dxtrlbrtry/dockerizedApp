const request = require('request-promise');
const schemas = require('../lib/dbService').schemas;

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
  return await request(options)
    .then(resp => { return JSON.parse(resp)})
    .catch(err => console.log(err));
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
  return await request(options)
    .then(resp => { return JSON.parse(resp)})
    .catch(err => console.log(err));
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
  return await request(options)
    .then(resp => { return JSON.parse(resp)})
    .catch(err => console.log(err));
}
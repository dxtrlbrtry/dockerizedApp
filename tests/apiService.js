const request = require('request-promise');
const schemas = require('../lib/schemas');

exports.getAll = async function (schema) {
  let endpoint =
    schema == schemas.user ? 'users/' :
    schema == schemas.testObject ? 'test/' : '';
  const options = {
    method: 'GET',
    url: 'http://localhost:1234/' + endpoint,
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
    url: 'http://localhost:1234/' + endpoint,
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
    url: 'http://localhost:1234/' + endpoint,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
    json: false,
    resolveWithFullResponse: false
  }
  return await request(options)
    .then(resp => { return JSON.parse(resp)})
    .catch(err => console.log(err));
}
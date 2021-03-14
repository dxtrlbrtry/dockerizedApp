const request = require('request-promise');
const logger = require('../../common/logger');

const baseUrl = 'http://' + process.env.APP_HOST + ':' + process.env.APP_PORT;

async function sendRequest(options) {
  logger.log(`Sending request ${JSON.stringify(options)}`)
  return await request(options)
    .then(resp => {
      logger.log(`Received response ${JSON.stringify(resp)}`)
      return JSON.parse(resp)
    }).catch(err => logger.error(err));
}

exports.get = async function (endpoint, params) {
  if (params) endpoint = `${endpoint}?${Object.keys(params).map(k => `${k}=${params[k]}`).join('&')}`
  return await sendRequest({
    method: 'GET',
    url: baseUrl + endpoint,
    json: false,
    resolveWithFullResponse: false
  });
}

exports.post = async function(endpoint, body) {
  return await sendRequest({
    method: 'POST',
    url: baseUrl + endpoint,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    json: false,
    resolveWithFullResponse: false
  });
}

exports.delete = async function(endpoint, body) {
  return await sendRequest({
    method: 'DELETE',
    url: baseUrl +  endpoint,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    json: false,
    resolveWithFullResponse: false
  });
}
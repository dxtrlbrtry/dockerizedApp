const request = require('request-promise');
const schemas = require('../lib/schemas');

module.exports = { getAll, addItem, deleteItem }

async function getAll(schema) {
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

async function addItem(schema, item) {
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

async function deleteItem(schema, item) {
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
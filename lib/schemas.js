const user = {
    'name': 'user',
    'type': 'object',
    'properties': {
        'name': { 'type': 'string' }
    }
}
const testObject = {
    'name': 'testObject',
    'type': 'object',
    'properties': {
        'prop1': { 'type': 'string' },
        'prop2': { 'type': 'string' }
    }
}

module.exports = { user, testObject }
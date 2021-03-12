const schemas = {
    definitions: {
        user: {
            'name': 'users',
            'type': 'object',
            'properties': {
                'name': { 'type': 'string' }
            }
        },
        testObject: {
            'name': 'testTable',
            'type': 'object',
            'properties': {
                'prop1': { 'type': 'string' },
                'prop2': { 'type': 'string' }
            }
        }
    }
}

module.exports = schemas.definitions
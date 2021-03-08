const schemas = {
    definitions: {
        user: {
            'name': 'user',
            'type': 'object',
            'properties': {
                'name': { 'type': 'string' }
            }
        },
        testObject: {
            'name': 'testObject',
            'type': 'object',
            'properties': {
                'prop1': { 'type': 'string' },
                'prop2': { 'type': 'string' }
            }
        }
    }
}

module.exports = schemas.definitions
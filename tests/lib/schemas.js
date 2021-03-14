const Validator = require('jsonschema').Validator
const schemas = {
    definitions: {
        message: {
            'type': 'string',
            'required': true
        },
        users: {
            'type': 'array',
            'items': {
                'type': 'object',
                'properties': {
                    'id': { 'type': 'number' },
                    'name': { 'type': 'string' }
                },
                'required': ['id', 'name']
            }
        },
        testObjects: {
            'type': 'array',
            'items': {
                'type': 'object',
                'properties': {
                    'prop1': { 'type': 'string' },
                    'prop2': { 'type': 'string' }
                },
                'required': ['prop1', 'prop2']
            }
        }
    }
}

module.exports = { validator: new Validator(), schemas: schemas.definitions }
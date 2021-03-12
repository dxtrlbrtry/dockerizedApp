const apiService = require('../apiService');
const dbService = require('../../lib/dbService');
const logger = require('../../lib/logger')
const schemas = dbService.schemas;

fixture`GetTest`
    .beforeEach(t => {
        logger.log("Running test: " + t.testRun.test.name)
    })
    .after(() => logger.log('All tests finished'))

test('CRUD user tests', async t => {
    var user = { name: 'Alex' };
    await apiService.getAll(schemas.user)
        .then(async resp => {
            await t.expect(resp.statusCode).eql(200)
                .expect(resp.result.some(u => u.name == user.name)).notOk();
            logger.log('get successful')
        });

    await apiService.addItem(schemas.user, user)
        .then(async resp => {
            await t.expect(resp.statusCode).eql(202);
            logger.log('add successful')
        });
    await apiService.addItem(schemas.user, user)
        .then(async resp => {
            await t.expect(resp.statusCode).eql(202)
            logger.log('add successful')
        });

    await apiService.getAll(schemas.user)
        .then(async resp => {
            await t.expect(resp.statusCode).eql(200)
                .expect(resp.result.some(u => u.name == user.name)).ok()
                .expect(resp.result.reduce((acc, v) => (v.name === user.name ? acc + 1 : acc), 0)).eql(2)
            logger.log('get successful')
        })

    await apiService.deleteItem(schemas.user, user)
        .then(async resp => {
            await t.expect(resp.statusCode).eql(200);
            logger.log('delete successful')
        })

    await apiService.getAll(schemas.user)
        .then(async resp => {
            await t.expect(resp.statusCode).eql(200)
                .expect(resp.result.some(u => u.name == user.name)).notOk();
            logger.log('get successful')
        });
})

test.after(async () => await dbService.dropTable(schemas.testObject))
    ('CRUD testObject tests', async t => {

    await apiService.getAll(schemas.testObject)
        .then(async resp => {
            await t.expect(resp.statusCode).eql(400)
            logger.log('Inexistent database error handling validated')
        })

    await dbService.createTable(schemas.testObject)

    var testObject1 = { prop1: "testprop11", prop2: "testprop12" };
    var testObject2 = { prop1: "testprop21", prop2: "testprop22" };

    
    await apiService.getAll(schemas.testObject)
        .then(async resp => {
            await t.expect(resp.statusCode).eql(200)
                .expect(resp.result == 0).ok();
            logger.log('empty db validated')
        });

    await apiService.addItem(schemas.testObject, testObject1)
        .then(async resp => {
            await t.expect(resp.statusCode).eql(202)
            logger.log('objects added')
        });
    await apiService.addItem(schemas.testObject, testObject2)
        .then(async resp => {
            await t.expect(resp.statusCode).eql(202)
            logger.log('objects added')
        });

    await apiService.getAll(schemas.testObject)
        .then(async resp => {
            await t.expect(resp.statusCode).eql(200)
                .expect(resp.result.some(o => o.prop1 == testObject1.prop1 && o.prop2 == testObject1.prop2)).ok()
                .expect(resp.result.some(o => o.prop1 == testObject2.prop1 && o.prop2 == testObject2.prop2)).ok()
            logger.log('added objects validated')
        });

    await apiService.deleteItem(schemas.testObject, testObject1)
        .then(async resp => {
            await t.expect(resp.statusCode).eql(200)
            logger.log('objects deleted')
        });
    await apiService.deleteItem(schemas.testObject, testObject2)
        .then(async resp => {
            await t.expect(resp.statusCode).eql(200)
            logger.log('objects deleted')
        });

    await apiService.getAll(schemas.testObject)
        .then(async resp => {
            await t.expect(resp.statusCode).eql(200)
                .expect(resp.result == 0).ok();
            logger.log('empty db validated')
        });
})
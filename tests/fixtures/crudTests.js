const schemas = require('../../lib/schemas');
const apiService = require('../apiService');
const DbService = require('../../lib/dbService').DbService
var dbService = new DbService({
    'host': '127.0.0.1',
    'port': 33060,
    'user': 'root',
    'password': 'password'
})

fixture`GetTest`
    .beforeEach(t => {
        console.log("Running test: " + t.testRun.test.name)
    })
    .after(() => console.log('All tests finished'))

test('CRUD user tests', async t => {
    var user = { name: 'Alex' };
    await apiService.getAll(schemas.user)
        .then(async resp => {
            await t.expect(resp.statusCode).eql(200)
                .expect(resp.result.some(u => u.name == user.name)).notOk();
        });
    console.log('get successful')

    await apiService.addItem(schemas.user, user)
        .then(async resp => await t.expect(resp.statusCode).eql(202));
    await apiService.addItem(schemas.user, user)
        .then(async resp => await t.expect(resp.statusCode).eql(202));
    console.log('add successful')

    await apiService.getAll(schemas.user)
        .then(async resp => {
            await t.expect(resp.statusCode).eql(200)
                .expect(resp.result.some(u => u.name == user.name)).ok()
                .expect(resp.result.reduce((acc, v) => (v.name === user.name ? acc + 1 : acc), 0)).eql(2)
        })
    console.log('get successful')

    await apiService.deleteItem(schemas.user, user)
        .then(async resp => await t.expect(resp.statusCode).eql(200));
    console.log('delete successful')

    await apiService.getAll(schemas.user)
        .then(async resp => {
            await t.expect(resp.statusCode).eql(200)
                .expect(resp.result.some(u => u.name == user.name)).notOk();
        });
    console.log('get successful')
})

test.before(async () => await dbService.createTable(schemas.testObject))
    .after(async () => await dbService.dropTable(schemas.testObject))
    ('CRUD testObject tests', async t => {
    var testObject1 = { prop1: "testprop11", prop2: "testprop12" };
    var testObject2 = { prop1: "testprop21", prop2: "testprop22" };

    
    await apiService.getAll(schemas.testObject)
        .then(async resp => {
            await t.expect(resp.statusCode).eql(200)
                .expect(resp.result == 0).ok();
        });
    console.log('empty db validated')

    await apiService.addItem(schemas.testObject, testObject1)
        .then(async resp => await t.expect(resp.statusCode).eql(202));
    await apiService.addItem(schemas.testObject, testObject2)
        .then(async resp => await t.expect(resp.statusCode).eql(202));
    console.log('objects added')

    await apiService.getAll(schemas.testObject)
        .then(async resp => {
            await t.expect(resp.statusCode).eql(200)
                .expect(resp.result.some(o => o.prop1 == testObject1.prop1 && o.prop2 == testObject1.prop2)).ok()
                .expect(resp.result.some(o => o.prop1 == testObject2.prop1 && o.prop2 == testObject2.prop2)).ok()
        });
    console.log('added objects validated')

    await apiService.deleteItem(schemas.testObject, testObject1)
        .then(async resp => await t.expect(resp.statusCode).eql(200))
    await apiService.deleteItem(schemas.testObject, testObject2)
        .then(async resp => await t.expect(resp.statusCode).eql(200))
    console.log('objects deleted')

    await apiService.getAll(schemas.testObject)
    .then(async resp => {
        await t.expect(resp.statusCode).eql(200)
            .expect(resp.result == 0).ok();
    });
    console.log('empty db validated')
})
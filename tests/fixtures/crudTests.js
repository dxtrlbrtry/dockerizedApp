const apiService = require('../lib/apiService');
const { schemas, validator } = require('../lib/schemas');
const logger = require('../../common/logger');

fixture`Smoke Test`
    .beforeEach(t => {
        logger.log("\n\n######### Running test: " + t.testRun.test.name + "#########\n")
    })
    .after(() => logger.log('\n\n######### All tests finished #########\n'))

test('CRUD user tests', async t => {
    var user = { name: 'Alex' };
    await apiService.get('/users/')
        .then(async resp => {
            await t.expect(resp.statusCode).eql(200)
                .expect(validator.validate(resp.body, schemas.users).valid).ok()
                .expect(resp.body.some(u => u.name == user.name)).notOk();
            logger.log('get successful');
        });

    await apiService.post('/users/', [user, user])
        .then(async resp => {
            await t.expect(resp.statusCode).eql(202)
                .expect(validator.validate(resp.body, schemas.message).valid).ok();
            logger.log('add successful');
        });

    await apiService.get('/users/', user)
        .then(async resp => {
            await t.expect(resp.statusCode).eql(200)
                .expect(validator.validate(resp.body, schemas.users).valid).ok()
                .expect(resp.body.some(u => u.name == user.name)).ok();
            logger.log('get by name successful');
        })

    await apiService.get('/users/')
        .then(async resp => {
            await t.expect(resp.statusCode).eql(200)
                .expect(validator.validate(resp.body, schemas.users).valid).ok()
                .expect(resp.body.some(u => u.name == user.name)).ok()
                .expect(resp.body.reduce((acc, v) => (v.name === user.name ? acc + 1 : acc), 0)).eql(2);
            logger.log('get successful');
        })

    await apiService.delete('/users/', user)
        .then(async resp => {
            await t.expect(resp.statusCode).eql(200)
                .expect(validator.validate(resp.body, schemas.message).valid).ok();
            logger.log('delete successful')
        })

    await apiService.get('/users/')
        .then(async resp => {
            await t.expect(resp.statusCode).eql(200)
                .expect(validator.validate(resp.body, schemas.users).valid).ok()
                .expect(resp.body.some(u => u.name == user.name)).notOk();
            logger.log('get successful')
        });
})

test.after(async () => await apiService.delete('/admin/testTable/'))
    ('CRUD testObject tests', async t => {

    await apiService.get('/test/')
        .then(async resp => {
            await t.expect(resp.statusCode).eql(400)
            logger.log('Inexistent database error handling validated')
        })

    await apiService.post('/admin/testTable/')

    var testObject1 = { prop1: "testprop11", prop2: "testprop12" };
    var testObject2 = { prop1: "testprop21", prop2: "testprop22" };

    await apiService.get('/test/')
        .then(async resp => {
            await t.expect(resp.statusCode).eql(200)
                .expect(validator.validate(resp.body, schemas.message).valid).ok();
            logger.log('empty db validated');
        });

    await apiService.post('/test/', [testObject1, testObject2])
        .then(async resp => {
            await t.expect(resp.statusCode).eql(202)
                .expect(validator.validate(resp.body, schemas.message).valid).ok();
            logger.log('objects added')
        });

    await apiService.get('/test/', testObject1)
        .then(async resp => {
            await t.expect(resp.statusCode).eql(200)
                .expect(validator.validate(resp.body, schemas.testObjects).valid).ok()
                .expect(resp.body.some(o => o.prop1 = testObject1.prop1 && o.prop2 == testObject1.prop2)).ok()
            logger.log('get single object successful')
        })

    await apiService.get('/test/')
        .then(async resp => {
            await t.expect(resp.statusCode).eql(200)
                .expect(validator.validate(resp.body, schemas.testObjects).valid).ok()
                .expect(resp.body.some(o => o.prop1 == testObject1.prop1 && o.prop2 == testObject1.prop2)).ok()
                .expect(resp.body.some(o => o.prop1 == testObject2.prop1 && o.prop2 == testObject2.prop2)).ok();
            logger.log('added objects validated')
        });

    await apiService.delete('/test/', testObject1)
        .then(async resp => {
            await t.expect(resp.statusCode).eql(200)
                .expect(validator.validate(resp.body, schemas.message).valid).ok();
            logger.log('objects deleted');
        });
    await apiService.delete('/test/', testObject2)
        .then(async resp => {
            await t.expect(resp.statusCode).eql(200)
                .expect(validator.validate(resp.body, schemas.message).valid).ok();
            logger.log('objects deleted')
        });

    await apiService.get('/test/')
        .then(async resp => {
            await t.expect(resp.statusCode).eql(200)
                .expect(validator.validate(resp.body, schemas.message).valid).ok();
            logger.log('empty db validated')
        });
})
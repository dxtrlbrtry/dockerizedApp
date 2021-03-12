const mysqlx = require('@mysql/xdevapi');
const logger = require('./logger');

var schemas = require('./schemas');
exports.schemas = schemas;

async function createSession() {
  logger.log('Requesting DB session');
  return mysqlx.getSession({
    "host": process.env.DB_HOST,
    "user": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD
  }).then(async session => {
      logger.log('DB session created successfully');
      await session.sql('USE ' + process.env.MYSQL_DATABASE).execute();
      return session;
  }).catch(err => logger.error(err))
}

exports.createTable = async function(schema) {
  return createSession().then(async session => {
    try {
      logger.log(`Creating table for schema ${schema.name}`)
      switch (schema) {
        case schemas.user: {
          return getQueryResult(
            await session.sql('CREATE TABLE users ( id INT PRIMARY KEY AUTO_INCREMENT, name varchar(255));').execute());
        }
        case schemas.testObject: {
          return getQueryResult(
            await session.sql('CREATE TABLE testTable ( prop1 varchar(255), prop2 varchar(255));').execute());
        }
        default: {
          throw `Schema ${JSON.stringify(schema)} not implemented`
        }
      }
    } catch (err) {
      throw `Failed to create table for schema ${schema.name} due to: ${err}`
    } finally {
      session.close();
    }
  });            
}

exports.dropTable = async function(schema) {
  return createSession().then(async session => {
    try {
      logger.log(`Dropping table for schema ${schema.name}`)
      switch (schema) {
        case schemas.user: {
          return getQueryResult(
            await session.sql('DROP TABLE users').execute());
        }
        case schemas.testObject: {
          return getQueryResult(
            await session.sql('DROP TABLE testTable').execute());
        }
        default: {
          throw `Schema ${JSON.stringify(schema)} not implemented`
        }
      }
    } catch (err) {
      throw `Failed dropping table for schema ${schema.name} due to: ${err}`
    } finally {
      session.close();
    }
  });
}

exports.insertItem = async function(schema, item) {
  return await createSession() .then(async session => {
    try {
      logger.log(`Inserting item ${JSON.stringify(item)} to table ${schema.name}`)
      switch (schema) {
        case schemas.user: {
          return getQueryResult(
            await session.sql('INSERT INTO users(name) VALUES ("' + item.name + '")').execute());
        }
        case schemas.testObject: {
          return getQueryResult(
            await session.sql('INSERT INTO testTable(prop1, prop2) VALUES ("' + item.prop1 + '", "' + item.prop2 + '")').execute());
        }
        default: {
          throw `Schema ${JSON.stringify(schema)} not implemented`
        }
      }
    } catch (err) {
      throw `Failed inserting item ${JSON.stringify(item)} to table ${schema.name} due to ${err}`
    } finally {
      session.close();
    }
  });
}

exports.getTable = async function(schema) {
  return await createSession().then(async session => {
    try {
      logger.log(`Getting table for schema ${schema.name}`)
      switch (schema) {
        case schemas.user: {
          return getQueryResult(
            await session.sql('SELECT * FROM users').execute());
        }          
        case schemas.testObject: {
          return getQueryResult(
            await session.sql('SELECT * FROM testTable').execute());
        }
        default: {
          throw `Schema ${JSON.stringify(schema)} not implemented`
        }
      }
    } catch (err) {
      throw `Failed getting table for schema ${schema.name}`
    } finally {
      session.close();
    }
  });
}

exports.deleteItem = async function(schema, item) {
  return await createSession().then(async session => {
    try {
      logger.log(`Deleting item ${JSON.stringify(item)} from table ${schema.name}`)
      switch (schema) {
        case schemas.user: {
          return getQueryResult(
            await session.sql('DELETE FROM users WHERE name="' + item.name + '"').execute());
        }
        case schemas.testObject: {
          return getQueryResult(
            await session.sql('DELETE FROM testTable WHERE prop1="' + item.prop1 + '"').execute());
        }
        default: {
          throw `Schema ${JSON.stringify(schema)} not implemented`
        }
      }
    } catch(err) {
      throw `Failed deleting item ${JSON.stringify(item)} from table ${schema.name} due to ${err}`
    } finally {
      session.close();
    }
  });
}

function getQueryResult(res) {
  var result = [];
  if (res.hasData()) {
    var columns = res.getColumns();
    var record = res.fetchOne();
    while (record) {
      var item = {};
      for (var i = 0; i < columns.length; i++) {
        var propertyName = columns[i].getColumnName();
        var propertyValue = record[i];
        item[propertyName] = propertyValue;
      }
      result.push(item)
      record = res.fetchOne();
    }
  }    
  return result;
}
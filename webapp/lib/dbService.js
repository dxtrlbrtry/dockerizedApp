const mysqlx = require('@mysql/xdevapi');
const logger = require('../../common/logger');

const tables = {
  USERS: 'users',
  TESTOBJECT: 'testTable'
}

exports.tables = tables;

async function createSession() {
  return mysqlx.getSession({
    "host": process.env.DB_HOST,
    "user": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD
  }).then(async session => {
      await session.sql('USE ' + process.env.MYSQL_DATABASE).execute();
      return session;
  }).catch(err => { throw `Failed establishing db session due to: ${err}`})
}

exports.createTable = async function(table) {
  return createSession().then(async session => {
    try {
      logger.log(`Creating table for schema ${table}`)
      switch (table) {
        case tables.USERS: {
          return getQueryResult(
            await session.sql(`CREATE TABLE ${table} ( id INT PRIMARY KEY AUTO_INCREMENT, name varchar(255));`).execute());
        }
        case tables.TESTOBJECT: {
          return getQueryResult(
            await session.sql(`CREATE TABLE ${table} ( prop1 varchar(255), prop2 varchar(255));`).execute());
        }
        default: {
          throw `Schema ${JSON.stringify(table)} not implemented`
        }
      }
    } catch (err) {
      throw `Failed to create table for schema ${table} due to: ${err}`
    } finally {
      session.close();
    }
  });            
}

exports.dropTable = async function(table) {
  return createSession().then(async session => {
    try {
      logger.log(`Dropping table for schema ${table}`)
      return getQueryResult(
        await session.sql(`DROP TABLE ${table}`).execute());
    } catch (err) {
      throw `Failed dropping table for schema ${table} due to: ${err}`
    } finally {
      session.close();
    }
  });
}

exports.getTable = async function(table, params) {
  return await createSession().then(async session => {
    try {
      logger.log(`Getting table for schema ${table}`)
      return getQueryResult(
        await session.sql(composeGetQuery(table, params)).execute());
    } catch (err) {
      throw `Failed getting table for schema ${table} due to ${err}`
    } finally {
      session.close();
    }
  });
}

exports.insertItem = async function(table, items) {
  return await createSession().then(async session => {
    try {
      logger.log(`Inserting item ${JSON.stringify(items)} to table ${table}`)
      return getQueryResult(
        await session.sql(composeInsertQuery(table, items)).execute());
    } catch (err) {
      throw `Failed inserting items ${JSON.stringify(items)} to table ${table} due to ${err}`
    } finally {
      session.close();
    }
  });
}

exports.deleteItem = async function(table, items) {
  return await createSession().then(async session => {
    try {
      logger.log(`Deleting item ${JSON.stringify(items)} from table ${table}`)
      return getQueryResult(
        await session.sql(composeDeleteQuery(table, items)).execute());
    } catch(err) {
      throw `Failed deleting item ${JSON.stringify(items)} from table ${table} due to ${err}`
    } finally {
      session.close();
    }
  });
}

function composeGetQuery(table, params) {
  if (Object.keys(params).length > 0) {
    return `SELECT * FROM ${table} WHERE (${Object.keys(params).map(p => `${p}="${params[p]}"`).join(' AND ')})`
  }
  return `SELECT * FROM ${table}`
}

function composeInsertQuery(table, items) {
  if (!Array.isArray(items)) items = [items];
  return `INSERT INTO ${table} (${Object.keys(items[0]).join(',')}) VALUES (${items.map(item => Object.keys(item).map(p => `"${item[p]}"`).join(',')).join('),(')})`
}

function composeDeleteQuery(table, items) {
  if (!Array.isArray(items)) items = [items];
  return `DELETE FROM ${table} WHERE (${items.map(item => Object.keys(item).map(p => `${p}="${item[p]}"`).join(' AND ')).join(') OR (')})`
}

function getQueryResult(res) {
  if (res.hasData()) {
    var result = [];
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
    return result;
  }    
  return "Rows affected: " + res.getAffectedItemsCount();
}
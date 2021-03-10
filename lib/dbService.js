var mysqlx = require('@mysql/xdevapi');
var schemas = require('./schemas');
   
exports.schemas = schemas;

function createSession() {
  console.log(process.env.DB_HOST)
  return mysqlx.getSession({
    "host": process.env.DB_HOST,
    "user": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE
  })
}

exports.createTable = async function(schema) {
  return createSession().then(async session => {
    var result;
    try {
      switch (schema) {
        case schemas.user: {
          result = getQueryResult(
            await session.sql('CREATE TABLE db.users ( id INT PRIMARY KEY AUTO_INCREMENT, name varchar(255));').execute())
        }
        case schemas.testObject: {
          result = getQueryResult(
            await session.sql('CREATE TABLE db.testTable ( prop1 varchar(255), prop2 varchar(255));').execute())
        }
      }
    } finally {
      session.close();
      return result;
    }
  });            
}

exports.dropTable = async function(schema) {
  return createSession().then(async session => {
    var result;
    try {
      switch (schema) {
        case schemas.user: {
          result = getQueryResult(
            await session.sql('DROP TABLE db.users').execute());
        }
        case schemas.testObject: {
          result = getQueryResult(
            await session.sql('DROP TABLE db.testTable').execute());
        }
      }
    } finally {
      session.close();
      return result;
    }
  });
}

exports.insertItem = async function(schema, item) {
  return createSession() .then(async session => {
    var result;
    try {
      switch (schema) {
        case schemas.user: {
          result = getQueryResult(
            await session.sql('INSERT INTO db.users(name) VALUES ("' + item.name + '")').execute());
        }
        case schemas.testObject: {
          result = getQueryResult(
            await session.sql('INSERT INTO db.testTable(prop1, prop2) VALUES ("' + item.prop1 + '", "' + item.prop2 + '")').execute());
        }
      }
    } finally {
      session.close();
      return result;
    }
  });
}

exports.getTable = async function(schema) {
  return createSession().then(async session => {
    var result;
    try {
      switch(schema) {
        case schemas.user: {
          result = getQueryResult(
            await session.sql('SELECT * FROM db.users').execute());
        }
        case schemas.testObject: {
          result = getQueryResult(
            await session.sql('SELECT * FROM db.testTable').execute());
        }
      }
    } finally {
      session.close();
      return result;
    }
  });
}

exports.deleteItem = async function(schema, item) {
  return createSession().then(async session => {
    var result;
    try {
      switch (schema) {
        case schemas.user: {
          result = getQueryResult(
            await session.sql('DELETE FROM db.users WHERE name="' + item.name + '"').execute());
        }
        case schemas.testObject: {
          result = getQueryResult(
            await session.sql('DELETE FROM db.testTable WHERE prop1="' + item.prop1 + '"').execute());
        }
      }
    } finally {
      session.close();
      return result;
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
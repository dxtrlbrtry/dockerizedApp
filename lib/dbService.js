var mysqlx = require('@mysql/xdevapi');
var schemas = require('./schemas');
var dbConfig = require('./dbConfig');
    
function createSession() {
    return mysqlx.getSession(dbConfig)
}

async function createTable(schema) {
    return createSession()
        .then(async session => {
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

async function dropTable(schema) {
    return createSession()
        .then(async session => {
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

async function insertItem(schema, item) {
    return createSession()
        .then(async session => {
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

async function getTable(schema) {
    return createSession()
        .then(async session => {
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

async function deleteItem(schema, item) {
    return createSession()
        .then(async session => {
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

module.exports = { createTable, dropTable, getTable, insertItem, deleteItem }
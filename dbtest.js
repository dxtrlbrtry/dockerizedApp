var mysqlx = require('@mysql/xdevapi');
var request = require('request-promise')
var dbService = require('./lib/dbService')

function createSession() {
    args = process.argv.slice(2);
    return mysqlx.getSession({
      "host": argv[0],
      "user": "root",
      "password": "password",
      "database": "db"
    })
  }

(async () => { await createSession()
        .then(session => {
            console.log("db success")
        })
        .catch(err => console.log(err));
        const options = {
            method: 'GET',
            url: argv[1] + '/users/',
            json: false,
            resolveWithFullResponse: false
          }
          await request(options)
            .then(resp => { console.log(JSON.parse(resp))})
            .catch(err => console.log(err));
    })();
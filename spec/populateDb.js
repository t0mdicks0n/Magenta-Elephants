const Promise = require('bluebird');
const db = Promise.promisifyAll(require('../models/index'));
const directDb = require('../database/index.js');
const mysql = require('mysql');

var dbConnection;
var tableNames = ['QuestionTags', 'Tags', 'Messages', 'Questions', 'Users', 'Sessions'];
var clearDB = function(connection, tablenames) {
  tablenames.forEach(function(tablename) {
    connection.query('DROP TABLE IF EXISTS ' + tablename);
  });
};

module.exports = function() {

  dbConnection = mysql.createConnection({
    user: 'b12eb2bede6b4d',
    password: 'ad517216',
    database: 'heroku_689621e8f649711',
    host: 'us-cdbr-iron-east-03.cleardb.net'
  });

  dbConnection.connect(function(err) {
    if (err) {
      return err ;
    } else {
      dbConnection.query('SELECT * FROM Messages;', function(err, result) {
        console.log(result);
      })
      dbConnection.query('SHOW PROCESSLIST;', function(err, result) {
        if (result.length > 8) {
          for (var i = 0; i < result.length - 1; i++) {
            dbConnection.query(`KILL ${result[i].Id}`);
            console.log(result[i].Id);
          }
        }
      });
      setTimeout(function() {
        clearDB(dbConnection, tableNames);
      }, 200);
    }
  })

  setTimeout(() => {
    
  }, 1250);
};
if (process.env.RUN) {
  module.exports();
}


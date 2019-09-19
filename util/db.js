const mysql = require('mysql')
const dbconfig = require('../conf/db')
const conn = mysql.createConnection(dbconfig.mysql)

conn.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + conn.threadId);
});



module.exports = conn
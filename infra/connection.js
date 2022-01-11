const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'gabriel',
  password: '1234',
  database: 'first-project-db'
})

module.exports = connection
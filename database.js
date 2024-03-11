const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password:'',
    database:'praxxys',
    connectionLimit:10
})

module.exports = db;
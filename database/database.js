const mysql = require('mysql2/promise')

// conection
const connection = mysql.createPool({
    host: '172.17.0.2',
    //port: 3306,
    user: 'root',
    password: '12345',
    database: 'newdb'
})

module.exports = connection
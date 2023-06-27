const mysql = require('mysql2/promise')

// conection
const connection = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'su contraseña',
    database: 'nombre de su base de datos'
})

module.exports = connection
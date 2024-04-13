const mysql = require('mysql')

const pool=mysql.createPool(
    {
        connectionLimit : 10,
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'EdEx',
        charset:'utf8mb4'
    }

)

module.exports =pool


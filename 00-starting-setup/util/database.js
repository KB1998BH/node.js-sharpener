const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user:'root',
    database: 'node',
    password: 'Krish@1998',
    port:'3308'

})
module.exports = pool.promise();
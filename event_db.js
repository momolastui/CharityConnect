
const mysql = require('mysql2');
const dbConfig = require('./config');  


const pool = mysql.createPool({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password, 
    database: dbConfig.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


module.exports = pool.promise();
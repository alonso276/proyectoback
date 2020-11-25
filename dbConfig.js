//Datos de Conexion a MYSQL
const mysql = require('mysql');

require('dotenv').config();
const createPool = () => {
    const pool = mysql.createPool({
      
      
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD, 
        port: process.env.DB_PORT,
        database: process.env.DB_NAME
    });
    global.db = pool; 
}
module.exports = {
    createPool
}
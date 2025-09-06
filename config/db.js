// config/db.js
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,     // tramway.proxy.rlwy.net
  port: process.env.DB_PORT,     // 36360
  user: process.env.DB_USER,     // root
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, // railway
});


module.exports = pool.promise(); // Para usar async/await
"
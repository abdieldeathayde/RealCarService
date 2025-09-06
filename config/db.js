// config/db.js
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: "tramway.proxy.rlwy.net",
  user: "root",
  password: "KCchXIbdAFNMwPvXxFVZjdRmETTvnAGO",
  database: "railway",
  port: 36360,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise(); // Para usar async/await
"
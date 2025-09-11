// config/db.js
const mysql = require('mysql2');

const pool = mysql.createPool({
<<<<<<< HEAD
  host: process.env.DB_HOST,     
  port: process.env.DB_PORT,     
  user: process.env.DB_USER,     
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });


module.exports = pool.promise();
=======
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
>>>>>>> parent of 4f9cde7 (teste)

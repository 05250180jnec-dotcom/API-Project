// src/db.js
// MySQL connection pool. Import this wherever you need to query the database.
// IMPORTANT: require('dotenv').config() must run in server.js before this file is imported.

const mysql2 = require('mysql2/promise');
const fs = require('fs');

const poolConfig = {
  host:     process.env.DB_HOST || 'localhost',
  port:     Number(process.env.DB_PORT) || 3306,
  user:     process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'defaultdb',
  
  // Pool settings
  waitForConnections: true, // Queue requests if all connections are busy
  connectionLimit: 10,      // Max 10 simultaneous connections
  queueLimit: 0,            // 0 = unlimited waiting queue
};

// Aiven Cloud MySQL requires SSL.
// Since we are using the class Aiven server, we set rejectUnauthorized to false.
// This allows the connection to succeed without needing to download a specific ca.pem file.
if ((process.env.DB_SSL || '').toUpperCase() === 'REQUIRED') {
  const ssl = { rejectUnauthorized: false };

  // Advanced: If you ever download the Aiven CA certificate (ca.pem) and add 
  // its path to your .env file, it will use the secure verification.
  if (process.env.DB_SSL_CA && fs.existsSync(process.env.DB_SSL_CA)) {
    ssl.ca = fs.readFileSync(process.env.DB_SSL_CA);
    ssl.rejectUnauthorized = true;
  }

  poolConfig.ssl = ssl;
}

// Create the connection pool
const pool = mysql2.createPool(poolConfig);

module.exports = pool;
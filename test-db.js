// test-db.js
// Run this script once to prove your MySQL connection works: npm run test:db
require('dotenv').config();

// Import your connection pool
const pool = require('./src/db');

async function testConnection() {
  console.log('Attempting to connect to Aiven MySQL...');
  
  try {
    // Run a simple query to test the connection
    const [rows] = await pool.query('SELECT 1 AS ok, DATABASE() AS db, NOW() AS current_time');
    
    console.log('\n=========================================');
    console.log('✅ Connected to MySQL successfully!');
    console.log('=========================================');
    console.log(`Database Name: ${rows[0].db}`);
    console.log(`Server Time:   ${rows[0].current_time}`);
    console.log('=========================================\n');
    
    // Exit the process successfully
    process.exit(0);
    
  } catch (err) {
    console.error('\n❌ Connection failed!');
    console.error(`Error Code: ${err.code || 'UNKNOWN'}`);
    console.error(`Message:    ${err.message}\n`);
    
    // Helpful hints if the connection fails
    if (!process.env.DB_USER || process.env.DB_USER === 'your_aiven_username') {
      console.error('👉 HINT: Did you copy .env.example to .env and fill in your Aiven credentials?');
    } else if (err.code === 'ENOTFOUND') {
      console.error('👉 HINT: Check your DB_HOST in the .env file.');
    } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('👉 HINT: Your DB_USER or DB_PASS is incorrect.');
    }

    // Exit the process with a failure code
    process.exit(1);
  }
}

testConnection();
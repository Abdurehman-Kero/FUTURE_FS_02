// config/db.js
const mysql = require("mysql2");

// Create connection pool specifically for MAMP
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 8889, // MAMP uses port 8889
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Convert pool to use promises
const promisePool = pool.promise();

// Test the connection
const testConnection = async () => {
  try {
    await promisePool.query("SELECT 1");
    console.log("✅ Database connected successfully");
    console.log(`📊 Connected to MySQL on port ${process.env.DB_PORT || 8889}`);
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    console.log("\n🔧 MAMP Troubleshooting Tips:");
    console.log(
      '1. Make sure MAMP is running (open MAMP app and click "Start")',
    );
    console.log("2. Check if MySQL port is 8889 (default for MAMP)");
    console.log("3. Try username: root, password: root");
    console.log("4. You can check MySQL status in MAMP window");
  }
};

testConnection();

module.exports = promisePool;

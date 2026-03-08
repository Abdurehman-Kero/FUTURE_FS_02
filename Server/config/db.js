// config/db.js
const mysql = require("mysql2");

// Create connection pool (better than single connection)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Convert pool to use promises (so we can use async/await)
const promisePool = pool.promise();

// Test the connection
const testConnection = async () => {
  try {
    await promisePool.query("SELECT 1");
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
};

testConnection();

module.exports = promisePool;

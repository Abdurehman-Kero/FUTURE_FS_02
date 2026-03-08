// Server/scripts/createFirstAdmin.js
require("dotenv").config();
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");

async function createFirstAdmin() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  // You can change these credentials
  const adminData = {
    name: "Super Admin",
    email: "keroabdurehman@gmail.com",
    password: "abdurehman@0974",
  };

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(adminData.password, salt);

  try {
    // Check if any admin exists
    const [existing] = await connection.execute(
      "SELECT COUNT(*) as count FROM admins",
    );

    if (existing[0].count > 0) {
      console.log("❌ Admins already exist! First admin already created.");
      console.log("Use login instead.");
      return;
    }

    // Create first admin
    await connection.execute(
      "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)",
      [adminData.name, adminData.email, hashedPassword],
    );

    console.log("✅ FIRST ADMIN CREATED SUCCESSFULLY!");
    console.log("===================================");
    console.log("Email:", adminData.email);
    console.log("Password:", adminData.password);
    console.log("===================================");
    console.log("⚠️  SAVE THESE CREDENTIALS!");
    console.log("⚠️  Delete this script after use!");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await connection.end();
  }
}

createFirstAdmin();

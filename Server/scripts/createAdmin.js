// scripts/createAdmin.js
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

  const name = "Super Admin";
  const email = "admin@crm.com";
  const password = "Admin123"; // Change this!

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    await connection.execute(
      "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
    );
    console.log("✅ Admin created successfully!");
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("⚠️  Please change this password after first login!");
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      console.log("❌ Admin already exists!");
    } else {
      console.error("Error:", error);
    }
  } finally {
    await connection.end();
  }
}

createFirstAdmin();

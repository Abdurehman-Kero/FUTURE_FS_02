// scripts/resetSpecificAdmin.js
require("dotenv").config();
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");

async function resetSpecificAdmin() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  // Choose one of these emails that exists in your database
  const email = "admin@example.com"; // This one looks valid
  const newPassword = "Admin123!"; // New password we'll set

  // Hash the new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  try {
    // Update the admin's password
    const [result] = await connection.execute(
      "UPDATE admins SET password = ? WHERE email = ?",
      [hashedPassword, email],
    );

    if (result.affectedRows > 0) {
      console.log("✅ Password reset successfully!");
      console.log("Email:", email);
      console.log("New Password:", newPassword);
      console.log("\nYou can now login with these credentials!");
    } else {
      console.log("❌ Admin not found with email:", email);
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await connection.end();
  }
}

resetSpecificAdmin();

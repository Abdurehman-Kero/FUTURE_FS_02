// Server/scripts/resetAllAdmins.js
require("dotenv").config();
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");

async function resetAllAdmins() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  try {
    // Show current admins
    const [before] = await connection.execute(
      "SELECT id, name, email FROM admins",
    );

    console.log("📋 Current admins:");
    before.forEach((admin) => {
      console.log(`- ${admin.email} (${admin.name})`);
    });

    console.log("\n⚠️  WARNING: This will DELETE ALL admins!");
    console.log("Press Ctrl+C to cancel, or wait 5 seconds to continue...");

    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Delete all admins
    await connection.execute("DELETE FROM admins");

    console.log("\n✅ All admins deleted!");

    // Create new super admin
    const adminData = {
      name: "Super Admin",
      email: "keroabdurehman@gmail.com",
      password: "abdurehman@0974",
    };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminData.password, salt);

    await connection.execute(
      "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)",
      [adminData.name, adminData.email, hashedPassword],
    );

    console.log("\n✅ NEW SUPER ADMIN CREATED!");
    console.log("===================================");
    console.log("Email:", adminData.email);
    console.log("Password:", adminData.password);
    console.log("===================================");
    console.log("⚠️  SAVE THESE CREDENTIALS!");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await connection.end();
  }
}

resetAllAdmins();

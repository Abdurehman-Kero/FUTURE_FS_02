// scripts/listAdmins.js
require("dotenv").config();
const mysql = require("mysql2/promise");

async function listAdmins() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  try {
    const [rows] = await connection.execute(
      "SELECT id, name, email, created_at FROM admins",
    );

    console.log("📋 Admins in database:");
    console.log("=======================");

    if (rows.length === 0) {
      console.log("No admins found!");
    } else {
      rows.forEach((admin) => {
        console.log(`ID: ${admin.id}`);
        console.log(`Name: ${admin.name}`);
        console.log(`Email: ${admin.email}`);
        console.log(`Created: ${admin.created_at}`);
        console.log("-----------------------");
      });
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await connection.end();
  }
}

listAdmins();

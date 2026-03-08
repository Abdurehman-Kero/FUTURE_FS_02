// models/adminModel.js
const db = require("../config/db");
const bcrypt = require("bcryptjs");

class Admin {
  // Create a new admin (register)
  static async create(adminData) {
    const { name, email, password } = adminData;

    // Hash password before storing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const query = "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)";
    const [result] = await db.query(query, [name, email, hashedPassword]);

    return result.insertId;
  }

  // Find admin by email (for login)
  static async findByEmail(email) {
    const query = "SELECT * FROM admins WHERE email = ?";
    const [rows] = await db.query(query, [email]);
    return rows[0];
  }

  // Find admin by ID (for verifying token)
  static async findById(id) {
    const query = "SELECT id, name, email FROM admins WHERE id = ?";
    const [rows] = await db.query(query, [id]);
    return rows[0];
  }

  // Compare password during login
  static async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = Admin;

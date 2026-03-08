// models/leadModel.js
const db = require("../config/db");

class Lead {
  // Create a new lead
  static async create(leadData) {
    const { name, email, phone, company, source, notes } = leadData;

    const query = `
            INSERT INTO leads (name, email, phone, company, source, notes)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

    const [result] = await db.query(query, [
      name,
      email,
      phone || null,
      company || null,
      source || "website",
      notes || null,
    ]);

    return result.insertId;
  }

  // Get all leads
  static async findAll() {
    const query = "SELECT * FROM leads ORDER BY created_at DESC";
    const [rows] = await db.query(query);
    return rows;
  }

  // Get one lead by ID
  static async findById(id) {
    const query = "SELECT * FROM leads WHERE id = ?";
    const [rows] = await db.query(query, [id]);
    return rows[0];
  }

  // Update a lead
  static async update(id, updateData) {
    const { name, email, phone, company, source, status, notes } = updateData;

    const query = `
            UPDATE leads 
            SET name = ?, email = ?, phone = ?, company = ?, 
                source = ?, status = ?, notes = ?
            WHERE id = ?
        `;

    const [result] = await db.query(query, [
      name,
      email,
      phone,
      company,
      source,
      status,
      notes,
      id,
    ]);

    return result.affectedRows > 0;
  }

  // Delete a lead
  static async delete(id) {
    const query = "DELETE FROM leads WHERE id = ?";
    const [result] = await db.query(query, [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Lead;

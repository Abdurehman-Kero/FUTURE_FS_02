// src/components/LeadForm.jsx
import { useState } from "react";
import styles from "../styles/App.module.css";

const LeadForm = ({ lead, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: lead?.name || "",
    email: lead?.email || "",
    phone: lead?.phone || "",
    company: lead?.company || "",
    source: lead?.source || "website",
    status: lead?.status || "new",
    notes: lead?.notes || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.leadForm}>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="555-0123"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="ABC Corp"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Source</label>
          <select name="source" value={formData.source} onChange={handleChange}>
            <option value="website">Website</option>
            <option value="referral">Referral</option>
            <option value="social">Social Media</option>
            <option value="email">Email</option>
            <option value="call">Phone Call</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="converted">Converted</option>
            <option value="lost">Lost</option>
          </select>
        </div>

        <div className={styles.formGroupFull}>
          <label>Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            placeholder="Add any notes about this lead..."
          />
        </div>
      </div>

      <div className={styles.formActions}>
        <button type="submit" className={styles.saveBtn}>
          {lead ? "Update Lead" : "Create Lead"}
        </button>
        <button type="button" onClick={onCancel} className={styles.cancelBtn}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default LeadForm;

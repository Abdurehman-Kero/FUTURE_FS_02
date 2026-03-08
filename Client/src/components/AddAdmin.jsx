// src/components/AddAdmin.jsx
import { useState } from "react";
import { authAPI } from "../services/api";
import styles from "../styles/App.module.css";

const AddAdmin = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    letter: false,
    number: false,
    match: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };

      // Check password requirements in real-time
      if (name === "password" || name === "confirmPassword") {
        const password = name === "password" ? value : formData.password;
        const confirm =
          name === "confirmPassword" ? value : formData.confirmPassword;

        setPasswordRequirements({
          length: password.length >= 6,
          letter: /[A-Za-z]/.test(password),
          number: /[0-9]/.test(password),
          match: password === confirm && password !== "",
        });
      }

      return newData;
    });
  };

  const validateForm = () => {
    if (!formData.name || formData.name.length < 2) {
      setError("Name must be at least 2 characters");
      return false;
    }

    if (!formData.email || !formData.email.includes("@")) {
      setError("Valid email is required");
      return false;
    }

    if (
      !passwordRequirements.length ||
      !passwordRequirements.letter ||
      !passwordRequirements.number
    ) {
      setError(
        "Password must be at least 6 characters with at least one letter and one number",
      );
      return false;
    }

    if (!passwordRequirements.match) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await authAPI.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // Success
      onSuccess?.({
        name: formData.name,
        email: formData.email,
      });
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Add New Admin</h2>

        {error && (
          <div className={styles.errorMessage}>
            {error}
            <button onClick={() => setError("")}>✕</button>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.adminForm}>
          <div className={styles.formGroup}>
            <label>Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="John Admin"
              autoFocus
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
              placeholder="admin@company.com"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />

            {/* Password requirements indicator */}
            <div className={styles.passwordRequirements}>
              <p
                className={
                  passwordRequirements.length ? styles.valid : styles.invalid
                }
              >
                ✓ At least 6 characters
              </p>
              <p
                className={
                  passwordRequirements.letter ? styles.valid : styles.invalid
                }
              >
                ✓ At least one letter
              </p>
              <p
                className={
                  passwordRequirements.number ? styles.valid : styles.invalid
                }
              >
                ✓ At least one number
              </p>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
            {formData.confirmPassword && (
              <p
                className={
                  passwordRequirements.match ? styles.valid : styles.invalid
                }
              >
                {passwordRequirements.match
                  ? "✓ Passwords match"
                  : "✗ Passwords do not match"}
              </p>
            )}
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.saveBtn} disabled={loading}>
              {loading ? "Creating..." : "Create Admin"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className={styles.cancelBtn}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdmin;

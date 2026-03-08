// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import styles from "../styles/App.module.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.navHeader}>
          <Link to="/" className={styles.logo}>
            📋 Mini CRM
          </Link>

          <div className={styles.navHeaderRight}>
            {/* Simple Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              style={{
                padding: "8px 16px",
                borderRadius: "20px",
                border: "1px solid var(--border-color)",
                background: "var(--bg-secondary)",
                color: "var(--text-primary)",
                cursor: "pointer",
              }}
            >
              {isDarkMode ? "☀️ Light" : "🌙 Dark"}
            </button>

            <button
              className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerActive : ""}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
            </button>
          </div>
        </div>

        <div
          className={`${styles.navLinks} ${isMenuOpen ? styles.navLinksActive : ""}`}
        >
          <Link
            to="/"
            className={styles.navLink}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          {user ? (
            <>
              <Link
                to="/dashboard"
                className={styles.navLink}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <span className={styles.userEmail}>{user.email}</span>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className={styles.navLink}
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

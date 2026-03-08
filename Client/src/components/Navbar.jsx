// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/App.module.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.navHeader}>
          <Link to="/" className={styles.logo} onClick={closeMenu}>
            📋 Mini CRM
          </Link>

          {/* Hamburger Menu Button */}
          <button
            className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerActive : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${styles.navLinks} ${isMenuOpen ? styles.navLinksActive : ""}`}
        >
          <Link to="/" className={styles.navLink} onClick={closeMenu}>
            Home
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className={styles.navLink}
                onClick={closeMenu}
              >
                Dashboard
              </Link>
              <span className={styles.userEmail}>{user.email}</span>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className={styles.navLink} onClick={closeMenu}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

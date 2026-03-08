// src/components/ThemeToggle.jsx
import { useTheme } from "../context/ThemeContext";
import styles from "../styles/App.module.css";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={styles.themeToggle}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className={styles.toggleTrack}>
        <div
          className={`${styles.toggleThumb} ${isDarkMode ? styles.toggleThumbDark : ""}`}
        >
          {isDarkMode ? "🌙" : "☀️"}
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;

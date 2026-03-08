// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import "./styles/themes.css"; // Import the theme CSS
import styles from "./styles/App.module.css";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <div className={styles.app}>
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <DashboardPage />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </main>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;

import React, { useEffect, useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { FileUpload } from "./pages/FileUpload";
import { Share } from "./pages/Share";

// Create Auth Context
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const logout = () => {
    signOut(auth);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <AuthContext.Provider value={{ currentUser }}>
      <Router>
        <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
          <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
          {currentUser ? (
            <>
              <Link to="/dashboard" style={{ marginRight: "1rem" }}>Dashboard</Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ marginRight: "1rem" }}>Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <PrivateRoute>
                <FileUpload />
              </PrivateRoute>
            }
          />
          <Route
            path="/share"
            element={
              <PrivateRoute>
                <Share />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}
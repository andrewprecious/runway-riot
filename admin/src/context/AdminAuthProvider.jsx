import { useEffect, useState } from "react";
import axios from "axios";
import AdminAuthContext from "./AdminAuthContext";
import { API_URL } from "../App.jsx";

const AdminAuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load user from localStorage when the app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("adminUser");
    if (storedUser) {
      setAdminUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/account/login`, {
        email,
        password,
      });
      if (!response.data.isAdmin) {
        setError("You are not authorized to access the admin area.");
        setAdminUser(null); // ensure no user is set/saved
      } else {
        setAdminUser(response.data);
        localStorage.setItem("adminUser", JSON.stringify(response.data));
        setError("");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  //   logout function
  const logout = () => {
    setAdminUser(null);
    localStorage.removeItem("adminUser");
  };
  return (
    <AdminAuthContext.Provider
      value={{ adminUser, login, logout, error, loading }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export default AdminAuthProvider;

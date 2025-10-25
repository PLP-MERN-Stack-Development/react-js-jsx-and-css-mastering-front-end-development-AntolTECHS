import { createContext, useState, useEffect } from "react";
import API from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load user from localStorage on startup
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  // ✅ Register user
  const register = async (data) => {
    const res = await API.post("/auth/register", data);
    localStorage.setItem("user", JSON.stringify(res.data));
    setUser(res.data);
  };

  // ✅ Login user
  const login = async (data) => {
    const res = await API.post("/auth/login", data);
    localStorage.setItem("user", JSON.stringify(res.data));
    setUser(res.data);
  };

  // ✅ Logout user
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

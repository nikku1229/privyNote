import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [toast, setToast] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const saveUser = localStorage.getItem("user");

    if (token) {
      try {
        setUser(JSON.parse(saveUser));
        // const decoded = jwtDecode(token);
        // setUser({ id: decoded.id });
      } catch {
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, toast, setToast }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

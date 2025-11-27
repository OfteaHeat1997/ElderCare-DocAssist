import { createContext, useContext, useState } from "react";

// Demo accounts with email (Tim will replace with real backend auth)
const DEMO_ACCOUNTS = {
  "maria@eldercare.nl": { password: "wachtwoord123", name: "Maria de Vries", id: 1, role: "nurse" },
  "jan@eldercare.nl": { password: "wachtwoord123", name: "Jan Bakker", id: 2, role: "nurse" },
  "admin@eldercare.nl": { password: "admin123", name: "Administrator", id: 3, role: "admin" },
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Login with email + password (frontend-only, Tim will add backend auth)
  const login = (email, password) => {
    const account = DEMO_ACCOUNTS[email];
    if (account && account.password === password) {
      const userData = { name: account.name, id: account.id, email, role: account.role };
      setUser(userData);
      setIsLoggedIn(true);
      return { success: true, user: userData };
    }
    return { success: false, error: "Ongeldig e-mailadres of wachtwoord" };
  };

  // Logout
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

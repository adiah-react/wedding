import { createContext, useContext, useEffect, useState } from "react";

const AdminContext = createContext(undefined);
// simple hardcoded password for demo purposes
const ADMIN_PASSWORD = "wedding2026";

export function AdminProvider({ children }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedAuth = localStorage.getItem("wedding_admin_auth");
    if (storedAuth === "true") {
      setIsAdminAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (password) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (password === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      localStorage.setItem("wedding_admin_auth", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem("wedding_admin_auth");
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}

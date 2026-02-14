import { createContext, useContext, useEffect, useState } from "react";
import {
  adminLogin,
  adminLogout,
  subscribeToAuthState,
} from "../lib/firebaseService";

const AdminContext = createContext(undefined);

export function AdminProvider({ children }) {
  const [adminUser, setAdminuser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // subscribe to Firebase auth state changes
    const unsubscribe = subscribeToAuthState((user) => {
      setAdminuser(user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    const user = await adminLogin(email, password);
    setIsLoading(false);
    return !!user;
  };

  const logout = async () => {
    await adminLogout();
    setAdminuser(null);
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminAuthenticated: !!adminUser,
        isLoading,
        adminUser,
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

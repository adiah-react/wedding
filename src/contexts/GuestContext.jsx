import { createContext, useContext, useEffect, useState } from "react";
import { updateInvitationRSVP } from "../lib/firebaseService";
import { validateInvitationCode as firebaseValidateCode } from "../utils/mockInvitations";

const GuestContext = createContext(undefined);
export function GuestProvider({ children }) {
  const [invitation, setInvitation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check local storage on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const storedCode = localStorage.getItem("wedding_invite_code");
      if (storedCode) {
        const found = await firebaseValidateCode(storedCode);
        if (found) {
          setInvitation(found);
        } else {
          localStorage.removeItem("wedding_invite_code");
        }
      }
      setIsLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (code) => {
    setIsLoading(true);
    setError(null);
    const found = await firebaseValidateCode(code);
    if (found) {
      setInvitation(found);
      localStorage.setItem("wedding_invite_code", found.code);
      setIsLoading(false);
      return true;
    } else {
      setError("Invalid invitation code. Please try again.");
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setInvitation(null);
    localStorage.removeItem("wedding_invite_code");
  };

  const submitRSVP = async (guestRSVPs) => {
    if (!invitation) return false;
    setIsLoading(true);

    const success = await updateInvitationRSVP(invitation.code, guestRSVPs);
    if (success) {
      // Refresh invitation data from Firebase
      const updated = await firebaseValidateCode(invitation.code);
      if (updated) {
        setInvitation(updated);
      }
    }

    setIsLoading(false);
    return success;
    // Update local state
  };

  return (
    <GuestContext.Provider
      value={{
        invitation,
        isAuthenticated: !!invitation,
        isLoading,
        error,
        login,
        logout,
        submitRSVP,
      }}
    >
      {children}
    </GuestContext.Provider>
  );
}

export function useGuestContext() {
  const context = useContext(GuestContext);
  if (context === undefined) {
    throw new Error("UseGuestContext must be used within a GuestProvider");
  }
  return context;
}

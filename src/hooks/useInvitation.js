import { useGuestContext } from "../contexts/GuestContext";

export function useInvitation() {
  const context = useGuestContext();

  return {
    invitation: context.invitation,
    isAuthenticated: context.isAuthenticated,
    isLoading: context.isLoading,
    error: context.error,
    login: context.login,
    logout: context.logout,
    submitRSVP: context.submitRSVP,
    // Helper to check access level
    hasFullAccess: context.invitation?.accessLevel === "full",
    isCeremonyOnly: context.invitation?.accessLevel === "ceremony",
  };
}

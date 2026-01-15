import { createContext, useContext, useEffect, useState } from "react";
import { validateInvitationCode } from "../utils/mockInvitations";

const GuestContext = createContext(undefined);
export function GuestProvider({ children }) {
  const [invitation, setInvitation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check local storage on mount
  useEffect(() => {
    const storedCode = localStorage.getItem("wedding_invite_code");
    const storedRSVP = localStorage.getItem("wedding_rsvp_data");
    if (storedCode) {
      const found = validateInvitationCode(storedCode);
      if (found) {
        // If there is stored RSVP data, merge it with the invitation data
        if (storedRSVP) {
          try {
            const rsvpData = JSON.parse(storedRSVP);
            found.guests = found.guests.map((guest) => {
              const guestRSVP = rsvpData[guest.id];
              if (guestRSVP) {
                return {
                  ...guest,
                  ...guestRSVP,
                };
              }
              return guest;
            });
          } catch (e) {
            console.error("Failed to parse stored RSVP data", e);
          }
        }
        setInvitation(found);
      } else {
        localStorage.removeItemm("wedding_invite_code");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (code) => {
    setIsLoading(true);
    setError(null);

    // Simulate network delay for effect
    await new Promise((resolve) => setTimeout(resolve, 800));
    const found = validateInvitationCode(code);
    if (found) {
      // Check for stored RSVP data for this code
      const storedRSVP = localStorage.getItem("wedding_rsvp_data");
      if (storedRSVP) {
        try {
          const rsvpData = JSON.parse(storedRSVP);
          found.guests = found.guests.map((guest) => {
            const guestRSVP = rsvpData[guest.id];
            if (guestRSVP) {
              return {
                ...guest,
                ...guestRSVP,
              };
            }
            return guest;
          });
        } catch (e) {
          console.error("Failed to parse stored RSVP data", e);
        }
      }
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
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Update local state
    const updatedGuests = invitation.guests.map((guest) => {
      const update = guestRSVPs.find((r) => r.guestId === guest.id);
      if (update) {
        return {
          ...guest,
          rsvpStatus: update.status,
          dietaryNotes: update.dietaryNotes,
        };
      }
      return guest;
    });
    const updatedInvitation = {
      ...invitation,
      guests: updatedGuests,
    };
    setInvitation(updatedInvitation);
    // Persist to local storage (simulating backend)
    // In real app, this would be an API call
    const rsvpMap = {};
    updatedGuests.forEach((g) => {
      rsvpmap[g.id] = {
        rsvpStatus: g.rsvpStatus,
        dietaryNotes: g.dietaryNotes,
      };
    });

    // Merge with existing data to not lose other guests' RSVPs if multiple codes used same browser
    const existingData = localStorage.getItem("wedding_rsvp_data");
    let newData = rsvpMap;
    if (existingData) {
      try {
        newData = {
          ...JSON.parse(existingData),
          ...rsvpMap,
        };
      } catch (e) {}
    }
    localStorage.setItem("wedding_rsvp_data", JSON.stringify(newData));
    setIsLoading(false);
    return true;
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

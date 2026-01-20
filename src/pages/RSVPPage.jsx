import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import GuestRSVPCard from "../components/rsvp/GuestRSVPCard";
import Button from "../components/ui/Button";
import PageTransition from "../components/ui/PageTransition";
import ScrollReveal from "../components/ui/ScrollReveal";
import ThankYouModal from "../components/ui/ThankYouModal";
import { useInvitation } from "../hooks/useInvitation";

const RSVPPage = () => {
  const { invitation, submitRSVP, isLoading } = useInvitation();
  const navigate = useNavigate();
  const [guestStates, setGuestStates] = useState({
    status: "attending" | "declined" | "pending",
    dietaryNotes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Initialize state from invitation
  useEffect(() => {
    if (invitation) {
      const initialStates = {};
      invitation.guests.forEach((guest) => {
        initialStates[guest.id] = {
          status: guest.rsvpStatus,
          dietaryNotes: guest.dietaryNotes || "",
        };
      });
      setGuestStates(initialStates);
    }
  }, [invitation]);

  const handleGuestChange = (guestId, status, notes) => {
    setGuestStates((prev) => ({
      ...prev,
      [guestId]: { status, dietaryNotes: notes },
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const rsvpData = Object.entries(guestStates).map(([guestId, data]) => ({
      guestId,
      status: data.status === "pending" ? "attending" : data.status,
      dietaryNotes: data.dietaryNotes,
    }));
    // Filter out pending statuses to be safe, though UI should prevent this
    const validData = rsvpData.filter((d) => d.status !== "pending");
    const success = await submitRSVP(validData);
    setIsSubmitting(false);
    if (success) {
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/welcome");
  };

  if (!invitation) return null;

  // Check if all guests have a selection (not pending)
  const allSelected = Object.values(guestStates).every(
    (g) => g.status !== "pending",
  );

  return (
    <PageTransition className="bg-gray-50 min-h-screen pt-24 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <h1 className="text-5xl mmd:text-6xl font-serif mb-4 text-wedding-black">
            RSVP
          </h1>
          <p className="text-xl text-gray-500 font-light">
            Please let us know if you can join us by August 1st.
          </p>
        </ScrollReveal>

        <div className="space-y-6 mb-12">
          {invitation.guests.map((guest, index) => (
            <ScrollReveal key={guest.id} delay={index * 0.1}>
              <GuestRSVPCard
                guestId={guest.id}
                name={guest.name}
                status={guestStates[guest.id]?.status || "pending"}
                dietaryNotes={guestStates[guest.id]?.dietaryNotes}
                onChange={handleGuestChange}
              />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4} className="flex justify-center">
          <Button
            onClick={handleSubmit}
            disabled={!allSelected || isSubmitting || isLoading}
            size="lg"
            className="w-full md:w-auto min-w-[200px]"
          >
            {isSubmitting ? "Submitting..." : "Submit RSVP"}
          </Button>
        </ScrollReveal>

        <ThankYouModal isOpen={showModal} onClose={handleModalClose} />
      </div>
    </PageTransition>
  );
};

export default RSVPPage;

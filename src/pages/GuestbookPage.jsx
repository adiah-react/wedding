import { useEffect, useState } from "react";
import MessageCard from "../components/guestbook/MessageCard";
import MessageForm from "../components/guestbook/MessageForm";
import PageTransition from "../components/ui/PageTransition";
import ScrollReveal from "../components/ui/ScrollReveal";
import { useInvitation } from "../hooks/useInvitation";
import {
  addGuestbookMessage,
  subscribeToGuestbook,
} from "../lib/firebaseService";

const GuestbookPage = () => {
  const { isAuthenticated, invitation } = useInvitation();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Subscribe to real-time guestbook updates
  useEffect(() => {
    const unsubscribe = subscribeToGuestbook((updatedMessages) => {
      setMessages(updatedMessages);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleNewMessage = async (text) => {
    const guestName = invitation?.groupName || "Guest";
    await addGuestbookMessage(guestName, text);
    // No need to manually update state - real-time listener will handle it
  };

  return (
    <PageTransition className="bg-white min-h-screen pt-24 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <ScrollReveal className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif mb-4 text-wedding-black">
            Guestbook
          </h1>
          <p className="text-xl text-gray-500 font-light">
            Read well wishes from friends and family, or leave your own note.
          </p>
        </ScrollReveal>

        {!isAuthenticated && <MessageForm onSubmit={handleNewMessage} />}

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {messages.map((msg, index) => (
              <MessageCard key={msg.id} message={msg} index={index} />
            ))}
            {messages.length === 0 && (
              <p className="text-center text-gray-400 py-12">
                No messages yet. Be the first to leave a note!
              </p>
            )}
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default GuestbookPage;

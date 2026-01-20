import { useState } from "react";
import MessageCard from "../components/guestbook/MessageCard";
import MessageForm from "../components/guestbook/MessageForm";
import PageTransition from "../components/ui/PageTransition";
import ScrollReveal from "../components/ui/ScrollReveal";
import { useInvitation } from "../hooks/useInvitation";
import { MOCK_MESSAGES } from "../utils/mockGuestbook";

const GuestbookPage = () => {
  const { isAuthenticated, invitation } = useInvitation();
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const handleNewMessage = (text) => {
    const newMessage = {
      id: Date.now().toString(),
      guestName: invitation?.groupName || "Guest",
      message: text,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [newMessage, ...prev]);
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

        <div className="space-y-2">
          {messages.map((msg, index) => (
            <MessageCard key={msg.id} message={msg} index={index} />
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default GuestbookPage;

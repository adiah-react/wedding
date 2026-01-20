import { motion } from "framer-motion";
import { useState } from "react";
import { useInvitation } from "../../hooks/useInvitation";

const MessageForm = ({ onSubmit }) => {
  const [message, setMessage] = useState("");
  const { invitation } = useInvitation();
  const maxLength = 500;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim().length >= 10) {
      onSubmit(message);
      setMessage("");
    }
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="bg-gray-50 p-8 rounded-sm mb-16 border border-gray-100"
    >
      <h3 className="text-2xl font-serif mb-6 text-wedding-black">
        Leave a Message
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="message" className="sr-only">
            Your Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={maxLength}
            rows={4}
            className="w-full p-4 border border-gray-200 rounded-sm focus:outline-none focus:border-wedding-gold focus:ring-1 focus:ring-wedding-gold transition-all bg-white resize-none font-light text-lg"
            placeholder={`Share your well wishes, favourite memory or advice for ${invitation?.groupName ? "us" : "the happy couple"}...`}
          />
          <div className="flex justify-between mt-2 text-xs text-gray-400 uppercase tracking-widest">
            <span>{message.length < 10 ? "Minimum 10 characters" : ""}</span>
            <span>
              {message.length} / {maxLength}
            </span>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={message.trim().length < 10}
            variant="primary"
          >
            Post Message
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default MessageForm;

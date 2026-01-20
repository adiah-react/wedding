import { motion } from "framer-motion";
const MessageCard = ({ message, index }) => {
  // Format date
  const date = new Date(message.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
      }}
      className="bg-white border border-gray-100 p-8 rounded-sm mb-6"
    >
      <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
        <h3 className="text-xl font-serif text-wedding-black mb-1 md:mb-0">
          {message.guestName}
        </h3>
        <span className="text-xs text-gray-400 uppercase tracking-widest">
          {date}
        </span>
      </div>
      <p className="text-gray-600 font-light leading-relaxed text-lg">
        "{message.message}"
      </p>
    </motion.div>
  );
};

export default MessageCard;

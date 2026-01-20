import { motion } from "framer-motion";

const GuestRSVPCard = ({ guestId, name, status, dietaryNotes, onChange }) => {
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
      className="bg-white border border-gray-100 p-8 rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <h3 className="text-2xl font-serif mb-6 text-wedding-black">{name}</h3>

      <div className="space-y-4">
        <label className="flex items-center space-x-3 cursor-pointer group">
          <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
              status === "attending"
                ? "border-wedding-gold bg-wedding-gold"
                : "border-gray-300 group-hover:border-wedding-gold"
            }`}
          >
            {status === "attending" && (
              <div className="w-2 h-2 bg-white rounded-full" />
            )}
          </div>
          <input
            type="radio"
            name={`rsvp-${guestId}`}
            value="attending"
            checked={status === "attending"}
            onChange={() => onChange(guestId, "attending", dietaryNotes)}
            className="hidden"
          />

          <span
            className={`text-lg font-light ${
              status === "attending"
                ? "text-wedding-black font-medium"
                : "text-gray-600"
            }`}
          >
            Joyfully Accepts
          </span>
        </label>

        <label className="flex items-center space-x-3 cursor-pointer group">
          <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
              status === "declined"
                ? "border-wedding-black bg-wedding-black"
                : "border-gray-300 group-hover:border-wedding-black"
            }`}
          >
            {status === "declined" && (
              <div className="w-2 h-2 bg-white rounded-full" />
            )}
          </div>
          <input
            type="radio"
            name={`rsvp-${guestId}`}
            value="declined"
            checked={status === "declined"}
            onChange={() => onChange(guestId, "declined", "")}
            className="hidden"
          />
          <span
            className={`text-lg font-light ${
              status === "declined"
                ? "text-wedding-black font-medium"
                : "text-gray-600"
            }`}
          >
            Regretfully Declines
          </span>
        </label>
      </div>

      <motion.div
        initial={false}
        animate={{
          height: status === "attending" ? "auto" : 0,
          opacity: status === "attending" ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
        }}
        className="overflow-hidden"
      >
        <div className="pt-6">
          <label
            htmlFor={`dietary-${guestId}`}
            className="block text-sm font-medium text-gray-500 uppercase tracking-widest mb-2"
          >
            Dietary Requirements
          </label>
          <textarea
            name=""
            id={`dietary-${guestId}`}
            value={dietaryNotes || ""}
            onChange={(e) => onChange(guestId, "attending", e.target.value)}
            placeholder="Any allergies or dietary restrictions?"
            className="w-full border-b border-gray-200 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-wedding-gold transition-colors resize-none bg-transparent"
            rows={2}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GuestRSVPCard;

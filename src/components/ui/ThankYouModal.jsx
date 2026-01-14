import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Button from "./Button.jsx";

const ThankYouModal = ({
  isOpen,
  onClose,
  title = "Thank You!",
  message = "We have received your RSVP and look forward to celebrating with you.",
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white w-full max-w-md p-8 md:p-12 text-center shadow-2xl rounded-sm"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
            >
              <X size={24} />
            </button>

            <div className="w-16 h-16 bg-wedding-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-wedding-gold" />
            </div>

            <h2 className="text-3xl font-serif mb-4 text-wedding-black">
              {title}
            </h2>
            <p className="text-gray-600 font-light mb-8 leading-relaxed">
              {message}
            </p>

            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ThankYouModal;

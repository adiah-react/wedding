import { AnimatePresence, motion } from "framer-motion";
import { DollarSign, X } from "lucide-react";
import { useState } from "react";
import Button from "../ui/Button";

const ContributionModal = ({ isOpen, onClose, item, onSubmit }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!item) return null;

  const remaining = item.targetAmount - item.currentAmount;
  const half = Math.floor(remaining / 2);
  const quarter = Math.floor(remaining / 4);
  const getAmount = () => {
    switch (selectedOption) {
      case "full":
        return remaining;
      case "half":
        return half;
      case "quarter":
        return quarter;
      case "custom":
        return parseFloat(customAmount) || 0;
      default:
        return 0;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amount = getAmount();
    if (amount <= 0) return;
    setIsSubmitting(true);
    await onSubmit(amount, message);
    setIsSubmitting(false);
    // Reset state
    setSelectedOption(null);
    setCustomAmount("");
    setMessage("");
  };

  const amount = getAmount();
  const isValid = amount > 0 && amount <= remaining;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            transition={{
              duration: 0.3,
            }}
            className="relative bg-white w-full max-w-lg p-6 md:p-8 shadow-2xl rounded-sm max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-6">
              <div className="text-4xl mb-2">{item.icon}</div>
              <h2 className="text-2xl font-serif text-wedding-black">
                {item.title}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Goal: ${item.targetAmount} • Remaining: ${item.remaining}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedOption("full")}
                  className={`p-3 border rounded-sm text-sm transition-all ${selectedOption === "full" ? "bg-wedding-gold text-white border-wedding-gold" : "border-gray-200 hover:border-wedding-gold text-gray-700"}`}
                >
                  <div className="font-medium">Full Amount</div>
                  <div className="text-xs opacity-80">${remaining}</div>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedOption("half")}
                  disabled={half < 10}
                  className={`p-3 border rounded-sm text-sm transition-all ${selectedOption === "half" ? "bg-wedding-gold text-white border-wedding-gold" : "border-gray-200 hover:border-wedding-gold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"}`}
                >
                  <div className="font-medium">Half</div>
                  <div className="text-xs opacity-80">${half}</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedOption("quarter")}
                  disabled={quarter < 10}
                  className={`p-3 border rounded-sm text-sm transition-all ${selectedOption === "quarter" ? "bg-wedding-gold text-white border-wedding-gold" : "border-gray-200 hover:border-wedding-gold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"}`}
                >
                  <div className="font-medium">Quarter</div>
                  <div className="text-xs opacity-80">${quarter}</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedOption("custom")}
                  className={`p-3 border rounded-sm text-sm transition-all ${selectedOption === "custom" ? "bg-wedding-gold text-white border-wedding-gold" : "border-gray-200 hover:border-wedding-gold text-gray-700"}`}
                >
                  <div className="font-medium">Custom</div>
                  <div className="text-xs opacity-80">Enter amount</div>
                </button>
              </div>

              {selectedOption === "custom" && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Enter amount"
                    min="10"
                    max={remaining}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-wedding-gold focus:ring-1 focus:ring-wedding-gold transition-colors"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Minimum $10, Maximum ${remaining}
                  </p>
                </div>
              )}

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full p-3 border-gray-200 rounded-sm focus:outline-none focus:border-wedding-gold focus:ring-1 focus:ring-wedding-gold transition-colors resize-none"
                  placeholder="Add a personal note..."
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-sm text-xs text-gray-500 text-center">
                This is a pledge only. No payment is required at this time.
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? "Processing..." : `Pledge$${amount || 0}`}
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContributionModal;

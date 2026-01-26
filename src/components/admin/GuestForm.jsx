import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import Button from "../ui/Button";

const GuestForm = ({ isOpen, onClose, onSubmit }) => {
  const [groupName, setGroupName] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [accessLevel, setAccessLevel] = useState("full");
  const [code, setCode] = useState("");

  const generateCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCode(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      code: code || groupName.substring(0, 3).toUpperCase() + "2026",
      groupName,
      accessLevel,
      guestCount,
    });
    onClose();
    // Reset Form
    setGroupName("");
    setGuestCount(1);
    setAccessLevel("full");
    setCode("");
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
            className="relative bg-white w-full max-w-md p-8 rounded-sm shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-serif mb-6">Add New Guest Group</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Group/Guest Name
                </label>
                <input
                  type="text"
                  required
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-sm focus:outline-none focus:border-wedding-gold"
                  placeholder="e.g. The Smith Family"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={guestCount}
                    onChange={(e) => setGuestCount(parseInt(e.target.value))}
                    className="w-full p-3 border border-gray-200 rounded-sm focus:outline-none focus:border-wedding-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Access Level
                  </label>
                  <select
                    value={accessLevel}
                    onChange={(e) => setAccessLevel(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-sm focus:outline-none focus:border-wedding-gold bg-white"
                  >
                    <option value="full">Full Wedding</option>
                    <option value="ceremony">Ceremony Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Invitation Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="flex-grow p-3 border border-gray-200 rounded-sm focus:outline-none focus:border-wedding-gold font-mono uppercase"
                    placeholder="Auto generated if empty"
                  />
                  <button
                    onClick={generateCode}
                    type="button"
                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-sm hover:bg-gray-200 text-sm font-medium"
                  >
                    Generate
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full">
                Create Invitation
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GuestForm;

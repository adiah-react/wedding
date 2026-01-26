import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, X } from "lucide-react";
import { useState } from "react";
import Button from "../ui/Button";

const InvitationLinkModal = ({ isOpen, onClose, code, groupName }) => {
  const [copied, setCopied] = useState(false);
  const link = `${window.location.origin}/invite/${code}`;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            className="relative bg-white w-full max-w-md p-8 rounded-sm shadow-2xl text-center"
          >
            <button className="absolute top-4 right-4 text-gray-400 hover:text-black">
              <X size={24} />
            </button>

            <h2 className="text-2xl font-serif mb-2">Invitation Created!</h2>
            <p className="text-gray-500 mb-6">For {groupName}</p>

            <div className="bg-gray-50 p-4 rounded-sm border border-gray-200 mb-6">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
                Access Code
              </p>
              <p className="text-3xl font-mono font-mono font-bold text-wedding-black tracking-wider">
                {code}
              </p>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={link}
                className="flex-grow p-3 border border-gray-200 rounded-sm bg-gray-50 text-sm text-gray-600"
              />

              <Button
                onClick={copyToClipboard}
                variant="secondary"
                className="min-w-[100px]"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                <span className="ml-2">{copied ? "Copied" : "Copy"}</span>
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InvitationLinkModal;

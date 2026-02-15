import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, X } from "lucide-react";
import { useState } from "react";
import Button from "../ui/Button";

function WhatsAppIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const InvitationLinkModal = ({
  isOpen,
  onClose,
  code,
  groupName,
  phoneNumber,
}) => {
  const [copied, setCopied] = useState(false);
  const link = `${window.location.origin}/invite/${code}`;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const sendViaWhatsApp = () => {
    const message = `💒 You're Invited!\n\nDear ${groupName},\n\nWe are delighted to invite you to our wedding celebration. Please use the link below to view your personal invitation, RSVP, and access all the event details.\n\n🔗 ${link}\n\n🔑 Your access code: ${code}\n\nWe can't wait to celebrate with you!\n\nWith love,\nSarah & James`;
    const encoded = encodeURIComponent(message);
    const waUrl = phoneNumber
      ? `https://wa.me/${phoneNumber}?text=${encoded}`
      : `https://wa.me/?text=${encoded}`;
    window.open(waUrl, "_blank");
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

            <div className="flex gap-2 mb-4">
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

            <button
              onClick={sendViaWhatsApp}
              className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-sm font-medium text-white transition-colors"
              style={{
                backgroundColor: "#25d366",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#1da851")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#25d366")
              }
            >
              <WhatsAppIcon size={20} />
              {phoneNumber ? `Send to ${phoneNumber}` : "Send via WhatsApp"}
            </button>
            {!phoneNumber && (
              <p className="text-xs text-gray-400 mt-2">
                No phone number saved - message will open without a recipient
              </p>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InvitationLinkModal;

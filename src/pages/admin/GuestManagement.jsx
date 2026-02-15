import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  LinkIcon,
  Loader2,
  MessageCircle,
  Phone,
  Plus,
  Search,
  Send,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import GuestForm from "../../components/admin/GuestForm";
import InvitationLinkModal from "../../components/admin/InvitationLinkModal";
import Button from "../../components/ui/Button";
import {
  createInvitation,
  deleteInvitation as firebaseDeleteInvitation,
  getAllInvitations,
  updateInvitationPhone,
} from "../../lib/firebaseService";

function WhatsAppIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function BulkSendModal(isOpen, onClose, invitations) {
  const [sendingIndex, setSendingIndex] = useState(-1);
  const [sentCodes, setSentCodes] = useState(new Set());
  const [isSending, setIsSending] = useState(false);

  const withPhone = invitations.filter((inv) => inv.phoneNumber);
  const withoutPhone = invitations.filter((inv) => !inv.phoneNumber);
  const buildMessage = (inv) => {
    const link = `${window.location.origin}/invite/${inv.code}`;
    return `💒 You're Invited!\n\nDear ${inv.groupName},\n\nWe are delighted to invite you to our wedding celebration. Please use the link below to view your personal invitation, RSVP, and access all the event details.\n\n🔗 ${link}\n\n🔑 Your access code: ${inv.code}\n\nWith love,\nSarah & James`;
  };

  const handleSendAll = async () => {
    setIsSending(true);
    for (let i = 0; i < withPhone.length; i++) {
      const inv = withPhone[i];
      setSendingIndex(i);
      const message = encodeURIComponent(buildMessage(inv));
      window.open(`https://wa.me/${inv.phoneNumber}?text=${message}`, "_blank");
      setSentCodes((prev) => new Set([...prev, inv.code]));
      // Wait 1.5s between each to avoid browser popup blocking
      if (i < withPhone.length - 1) {
        await new Promise((r) => setTimeout(r, 1500));
      }
    }
    setSendingIndex(-1);
    setIsSending(false);
  };

  const handleSendSingle = (inv) => {
    const message = encodeURIComponent(buildMessage(inv));
    window.open(`https://wa.e/${inv.phoneNumber}?text=${message}`, "_blank");
    setSentCodes((prev) => new Set([...prev, inv.code]));
  };

  const handleClose = () => {
    setSentCodes(new Set());
    setSendingIndex(-1);
    setIsSending(false);
    onClose();
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
            onClick={handleClose}
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
            className="relative bg-white w-full max-w-lg p-8 rounded-sm shadow-2xl max-h-[85vh] overflow-y-auto"
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
              onClick={handleClose}
            >
              <X size={24} />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                style={{
                  backgroundColor: "#25d366",
                }}
              >
                <WhatsAppIcon size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-serif">Send All Invitations</h2>
                <p className="text-sm text-gray-500">via WhatsApp</p>
              </div>
            </div>

            {withPhone.length === 0 ? (
              <div className="py-8 text-center">
                <Phone size={40} className="mx-auto mb-3 text-gray-300" />
                <p className="text-gray-500 mb-1">No phone numbers saved</p>
                <p className="text-sm text-gray-400">
                  Add phone numbers to your guest groups to send invitations via
                  WhatsApp.
                </p>
              </div>
            ) : (
              <>
                <div className="bg-amber-50 border border-amber-200 rounded-sm p-3 mb-6 mt-4">
                  <p className="text-amber-800 text-xs">
                    Each invitation will open in a new WhatsApp tab. Your
                    browser may ask to allow popups - please allow them for this
                    site.
                  </p>
                </div>

                <div className="space-y-2 mb-6">
                  {withPhone.map((inv, i) => {
                    const isSent = sentCodes.has(inv.code);
                    const isCurrentlySending = sendingIndex === i;
                    return (
                      <div
                        key={inv.code}
                        className={`flex items-center justify-between p-3 rounded-sm border transition-colors ${isSent ? "bg-green-50 border-green-200" : "border-gray-100"}`}
                      >
                        <div className="flex-grow min-w-0">
                          <p className="font-medium text-gray-900 text-s truncate">
                            {inv.groupName}
                          </p>
                          <p className="text-xs text-gray-400 font-mono">
                            {inv.phoneNumber}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                          {isSent ? (
                            <span className="text-green-600 text-xs font-medium flex items-center gap-1">
                              <Check size={14} /> Sent
                            </span>
                          ) : isCurrentlySending ? (
                            <Loader2
                              size={16}
                              className="animate-spin text-gray-400"
                            />
                          ) : (
                            <button
                              onClick={() => handleSendSingle(inv)}
                              disabled={isSending}
                              className="text-gray-400 hover:text-green-500 transition-colors disabled:opacity-50"
                              title="Send individually"
                            >
                              <Send size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {withoutPhone.length > 0 && (
                  <div className="mb-6">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
                      Missing phone number ({withoutPhone.length})
                    </p>
                    <div className="space-y-1">
                      {withoutPhone.map((inv) => (
                        <div
                          key={inv.code}
                          className="flex items-center justify-between p-2 rounded-sm bg-gray-50"
                        >
                          <span className="text-sm text-gray-500 truncate">
                            {inv.groupName}
                          </span>
                          <span className="text-xs text-gray-400">
                            No number
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleSendAll}
                  disabled={isSending || sentCodes.size === withPhone.length}
                  className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-sm font-medium text-white transition-colors disabled:opacity-50"
                  style={{
                    backgroundColor: "#25d366",
                  }}
                  onMouseEnter={(e) =>
                    !e.currentTarget.disabled &&
                    (e.currentTarget.style.backgroundColor = "#1da851")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#25d366")
                  }
                >
                  {isSending ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending {sendingIndex + 1} of {withPhone.length}...
                    </>
                  ) : sentCodes.size === withPhone.length ? (
                    <>
                      <Check size={18} />
                      All Sent!
                    </>
                  ) : (
                    <>
                      <WhatsAppIcon size={18} />
                      Send All ({withPhone.length} invitations)
                    </>
                  )}
                </button>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

const GuestManagement = () => {
  const [invitations, setInvitations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showBulkSend, setShowBulkSend] = useState(false);
  const [editingPhone, setEditingPhone] = useState(null);
  const [editPhoneValue, setEditPhoneValue] = useState("");
  const [newInvite, setNewInvite] = useState(null);

  // Fetch invitations from Firebase
  useEffect(() => {
    const fetchInvitations = async () => {
      const data = await getAllInvitations();
      setInvitations(data);
      setIsLoading(false);
    };
    fetchInvitations();
  }, []);

  const filteredInvitations = invitations.filter(
    (inv) =>
      inv.groupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddGuest = async (data) => {
    const newInvitation = {
      code: data.code,
      groupName: data.groupName,
      accessLevel: data.accessLevel,
      phoneNumber: data.phoneNumber,
      guests: Array(data.guestCount)
        .fill(null)
        .map((_, i) => ({
          id: Date.now().toString() + i,
          name: i === 0 ? data.groupName : `Guest ${i + 1}`,
          rsvpStatus: "pending",
        })),
    };

    const success = await createInvitation(newInvitation);
    if (success) {
      setInvitations([...invitations, newInvitation]);
      setNewInvite({
        code: newInvitation.code,
        groupName: newInvitation.groupName,
        phoneNumber: newInvitation.phoneNumber,
      });
    }
  };

  const handleDelete = async (code) => {
    if (confirm("Are you sure you want to delete this invitation?")) {
      const success = await firebaseDeleteInvitation(code);
      if (success) {
        setInvitations(invitations.filter((inv) => inv.code !== code));
      }
    }
  };

  const handleSavePhone = async (code) => {
    const cleaned = editPhoneValue.replace(/\s/g, "");
    const success = await updateInvitationPhone(code, cleaned);
    if (success) {
      setInvitations(
        invitations.map((inv) =>
          inv.code === code ? { ...inv, phoneNumber: cleaned } : inv,
        ),
      );
    }
    setEditingPhone(null);
    setEditPhoneValue("");
  };

  const invitationsWithPhone = invitations.filter((inv) => inv.phoneNumber);

  return (
    <AdminLayout title="Guest Management">
      <div className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search guests or codes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-sm focus:outline-none focus:border-wedding-gold"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowBulkSend(true)}
              className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-sm font-medium text-sm text-white transition-colors tracking-wide uppercase"
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
              <Send size={16} />
              Send All
              {invitationsWithPhone.length > 0 && (
                <span c-lassName="bg-white/20 text-white text-xs px-1.5 py-0.5 rounded-full ml-1">
                  {invitationsWithPhone.length}
                </span>
              )}
            </button>
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus size={18} className="mr-2 " />
              Add Guest Group
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="animate-pulse">Loading...</div>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium">Group Name</th>
                  <th className="px-6 py-4 font-medium">Code</th>
                  <th className="px-6 py-4 font-medium">Phone</th>
                  <th className="px-6 py-4 font-medium">Guests</th>
                  <th className="px-6 py-4 font-medium">Access</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredInvitations.map((inv) => (
                  <tr
                    key={inv.code}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {inv.groupName}
                    </td>
                    <td className="px-6 py-4 font-mono-text-sm text-gray-600">
                      {inv.code}
                    </td>
                    <td className="px-6 py-4">
                      {editingPhone === inv.code ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="tel"
                            value={editPhoneValue}
                            onChange={(e) => setEditPhoneValue(e.target.value)}
                            className="w-32 px-2 py-1 border border-gray-200 rounded-sm text-sm focus:outline-none focus:border-wedding-gold"
                            placeholder="18685551234"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleSavePhone(inv.code);
                              if (e.key === "Escape") setEditingPhone(null);
                            }}
                          />
                          <button
                            onClick={() => handleSavePhone(inv.code)}
                            className="text-green-500 hover:text-green-700"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            onClick={() => setEditingPhone(null)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingPhone(inv.code);
                            setEditPhoneValue(inv.phoneNumber || "");
                          }}
                          className="text-sm text-gray-500 hover:text-wedding-gold transition-colors flex items-center gap-1"
                          title="Click to edit phone number"
                        >
                          {inv.phoneNumber ? (
                            <span className="font-mono">{inv.phoneNumber}</span>
                          ) : (
                            <>
                              <Phone size={14} className="text-gray-300" />
                              <span className="text-gray-300 text-xs">Add</span>
                            </>
                          )}
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {inv.guests.length}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${inv.accessLevel === "full" ? "bg-purple-50 text-purple-700" : "bg-blue-50 text-blue-700"}`}
                      >
                        {inv.accessLevel === "full"
                          ? "Full wedding"
                          : "Ceremony Only"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {inv.guests.some((g) => g.rsvpStatus !== "pending") ? (
                        <span className="text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded-full">
                          Responded
                        </span>
                      ) : (
                        <span className="text-gray-500 text-xs font-medium bg-gray-100 px-2 py-1 rounded-full">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          const inviteLink = `${window.location.origin}/invite/${inv.code}`;
                          const message = `💒 You're Invited!\n\nDear ${inv.groupName},\n\nWe are delighted to invite you to our wedding celebration. Please use the link below to view your personal invitation, RSVP, and access all the event details.\n\n🔗 ${inviteLink}\n\n🔑 Your access code: ${inv.code}\n\nWith love,\nSarah & James`;
                          const waUrl = inv.phoneNumber
                            ? `https://wa.me/${inv.phoneNumber}?text=${encodeURIComponent(message)}`
                            : `https://wa.me/?text=${encodeURIComponent(message)}`;
                          window.open(waUrl, "_blank");
                        }}
                        className={`transition-colors ${inv.phoneNumber ? "text-green-500 hover:text-green-700" : "text-gray-400 hover:text-green-500"}`}
                        title={
                          inv.phoneNumber
                            ? `Send to ${inv.phoneNumber}`
                            : "Send via WhatsApp (no number saved)"
                        }
                      >
                        <MessageCircle size={18} />
                      </button>
                      <button
                        onClick={() =>
                          setNewInvite({
                            code: inv.code,
                            groupName: inv.groupName,
                          })
                        }
                        className="text-gray-400 hover:text-wedding-gold transition-colors"
                        title="Get Link"
                      >
                        <LinkIcon size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(inv.code)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <GuestForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddGuest}
      />

      <InvitationLinkModal
        isOpen={!!newInvite}
        onClose={() => setNewInvite(null)}
        code={newInvite?.code || ""}
        groupName={newInvite?.groupName || ""}
        phoneNumber={newInvite?.phoneNumber}
      />

      <BulkSendModal
        isOpen={showBulkSend}
        onClose={() => setShowBulkSend(false)}
        invitations={invitations}
      />
    </AdminLayout>
  );
};

export default GuestManagement;

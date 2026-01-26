import { LinkIcon, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import GuestForm from "../../components/admin/GuestForm";
import InvitationLinkModal from "../../components/admin/InvitationLinkModal";
import Button from "../../components/ui/Button";
import { MOCK_INVITATIONS } from "../../utils/mockInvitations";

const GuestManagement = () => {
  const [invitations, setInvitations] = useState(MOCK_INVITATIONS);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newInvite, setNewInvite] = useState(null);

  const filteredInvitations = invitations.filter(
    (inv) =>
      inv.groupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddGuest = (data) => {
    const newInvitation = {
      code: data.code,
      groupName: data.groupName,
      accessLevel: data.accessLevel,
      guests: Array(data.guestCount)
        .fill(null)
        .map((_, i) => ({
          id: Date.now().toString() + i,
          name: i === 0 ? data.groupName : `Guest ${i + 1}`,
          rsvpStatus: "pending",
        })),
    };

    setInvitations([...invitations, newInvitation]);
    setNewInvite({
      code: newInvitation.code,
      groupName: newInvitation.groupName,
    });
  };

  const handleDelete = (code) => {
    if (confirm("Are you sure you want to delete this invitation?")) {
      setInvitations(invitations.filter((inv) => inv.code !== code));
    }
  };

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
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus size={18} className="mr-2 " />
            Add Guest Group
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Group Name</th>
                <th className="px-6 py-4 font-medium">Code</th>
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
      />
    </AdminLayout>
  );
};

export default GuestManagement;

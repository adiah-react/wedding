import { Check, Download, HelpCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import Button from "../../components/ui/Button";
import { getAllInvitations } from "../../lib/firebaseService";

const RSVPSummary = () => {
  const [invitations, setInvitations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllInvitations();
      setInvitations(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // Flatten guests
  const allGuests = invitations.flatMap((inv) =>
    inv.guests.map((guest) => ({
      ...guest,
      groupName: inv.groupName,
      accessLevel: inv.accessLevel,
    })),
  );

  const downloadCSV = () => {
    const headers = [
      "Name",
      "Group",
      "Status",
      "Dietary Notes",
      "Access Level",
    ];
    const rows = allGuests.map((g) => [
      g.name,
      g.groupName,
      g.rsvpStatus,
      g.dietaryNotes || "",
      g.accessLevel,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv",
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wedding-rsvps.csv";
    a.click();
  };

  return (
    <AdminLayout title="RSVP Summary">
      <div className="flex justify-end mb-6">
        <Button
          onClick={downloadCSV}
          variant="outline"
          className="flex items-center"
        >
          <Download size={16} className="mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center">
            <div className="animate-pulse">Loading...</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium">Guest Name</th>
                  <th className="px-6 py-4 font-medium">Group</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Dietary Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {allGuests.map((guest) => (
                  <tr
                    key={guest.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {guest.name}
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {guest.groupName}
                    </td>
                    <td className="px-6 py-4">
                      {guest.rsvpStatus === "attending" && (
                        <span className="flex items-center text-green-600 text-sm font-medium">
                          <Check size={16} className="mr-1" /> Attending
                        </span>
                      )}
                      {guest.rsvpStatus === "declined" && (
                        <span className="flex items-center text-red-500 text-sm font-medium">
                          <X size={16} className="mr-1" /> Declined
                        </span>
                      )}
                      {guest.rsvpStatus === "pending" && (
                        <span className="flex items-center text-gray-400 text-sm font-medium">
                          <HelpCircle size={16} className="mr-1" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {guest.dietaryNotes || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default RSVPSummary;

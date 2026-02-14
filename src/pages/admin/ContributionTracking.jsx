import { Gift } from "lucide-react";
import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getContributions, getHoneymoonItems } from "../../lib/firebaseService";

const ContributionTracking = () => {
  const [contributions, setContributions] = useState([]);
  const [honeymoonItems, setHoneymoonItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [contribData, itemsData] = await Promise.all([
        getContributions(),
        getHoneymoonItems(),
      ]);
      setContributions(contribData);
      setHoneymoonItems(itemsData);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const getItemName = (itemId) => {
    return honeymoonItems.find((i) => i.id === itemId)?.title || "Unknown Item";
  };

  return (
    <AdminLayout title="Honeymoon Contributions">
      <div className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center">
            <div className="animate-pulse">Loading...</div>
          </div>
        ) : contributions.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Gift size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No contributions yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Guest</th>
                  <th className="px-6 py-4 font-medium">Item</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {contributions.map((contribution) => (
                  <tr
                    key={contribution.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {new Date(contribution.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {contribution.guestName}
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {getItemName(contribution.itemId)}
                    </td>
                    <td className="px-6 py-4 font-medium text-green-600">
                      ${contribution.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {contribution.message || "-"}
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

export default ContributionTracking;

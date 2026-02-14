import { CheckCircle, Gift, MessageSquare, Users } from "lucide-react";
import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import StatCard from "../../components/admin/StatCard";
import {
  getAllInvitations,
  getContributions,
  getGuestbookMessages,
} from "../../lib/firebaseService";

const AdminDashboard = () => {
  const [invitations, setInvitations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [contributions, setContributions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [invData, msgData, contribData] = await Promise.all([
        getAllInvitations(),
        getGuestbookMessages(),
        getContributions(),
      ]);
      setInvitations(invData);
      setMessages(msgData);
      setContributions(contribData);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // Calculate stats
  const totalGuests = invitations.reduce(
    (sum, inv) => sum + inv.guests.length,
    0,
  );

  const attendingGuests = invitations.reduce(
    (sum, inv) =>
      sum + inv.guests.filter((g) => g.rsvpStatus === "attending").length,
    0,
  );

  const totalRaised = contributions.reduce((sum, c) => sum + c.amount, 0);
  const totalMessages = messages.length;

  if (isLoading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-100 h-32 rounded-sm"
            ></div>
          ))}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard
          title="Total Guests Invited"
          value={totalGuests}
          icon={<Users size={24} />}
          delay={0.1}
        />
        <StatCard
          title="Confirmed Attending"
          value={attendingGuests}
          icon={<CheckCircle size={24} />}
          trend={
            totalGuests > 0
              ? `${Math.round((attendingGuests / totalGuests) * 100)}% Response`
              : "0% Response"
          }
          delay={0.2}
        />
        <StatCard
          title="Honeymoon Fund"
          value={`$${totalRaised.toLocaleString()}`}
          icon={<Gift size={24} />}
          delay={0.3}
        />
        <StatCard
          title="Guestbook Messages"
          value={totalMessages}
          icon={<MessageSquare size={24} />}
          delay={0.4}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
          <h3 className="font-serif text-xl mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {contributions.slice(0, 3).map((contrib) => (
              <div
                key={contrib.id}
                className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                    <Gift size={14} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      New Contribution
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(contrib.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-600">
                  {contrib.guestName}
                </span>
              </div>
            ))}
            {contributions.length === 0 && (
              <p className="text-gray-400 text-sm">No recent activity</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
          <h3 className="font-serif text-xl mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-gray-50 hover:bg-gray-100 rounded-sm text-left transition-colors">
              <Users className="mb-2 text-wedding-gold" size={24} />
              <span className="block font-medium text-sm">Add Guest</span>
            </button>
            <button className="p-4 bg-gray-50 hover:bg-gray-100 rounded-sm text-left transition-colors">
              <Gift className="mb-2 text-wedding-gold" size={24} />
              <span className="block font-medium text-sm">Add Fund Item</span>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

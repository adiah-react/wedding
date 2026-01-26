import {
  ClipboardList,
  Gift,
  Home,
  LayoutDashboard,
  LogOut,
  Users,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { useAdmin } from "../../contexts/AdminContext";

const AdminLayout = ({ children, title }) => {
  const { logout } = useAdmin();
  const location = useLocation();
  const navItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Guests & Invites",
      path: "/admin/guests",
      icon: <Users size={20} />,
    },
    {
      name: "RSVP Summary",
      path: "/admin/rsvps",
      icon: <ClipboardList size={20} />,
    },
    {
      name: "Contributions",
      path: "/admin/contributions",
      icon: <Gift size={20} />,
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-wedding-black text-white flex-shrink-0">
        <div className="p-6 border-b border-white/10">
          <h2 className="font-serif text-2xl">Admin Panel</h2>
          <p className="text-xs text-gray-400 mt-1">
            Rhiannon & Rashaad's Wedding
          </p>
        </div>

        <nav className="p-4 space-y-2 flex-grow">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-sm transition-colors ${isActive ? "bg-wedding-gold text-white" : "text-gray-400 hover:bg-white/10 hover:text-white"}`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            to="/"
            className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
          >
            <Home size={20} />
            <span>View Website</span>
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-white/10 rounded-sm transition-colors text-left"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-12 overflow-y-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-serif text-wedding-black">{title}</h1>
        </header>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;

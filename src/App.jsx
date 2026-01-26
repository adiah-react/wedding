import { AnimatePresence } from "framer-motion";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router";
import AdminRoute from "./components/admin/AdminRoute";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Footer from "./components/layout/Footer";
import Navigation from "./components/layout/Navigation";
import MusicToggle from "./components/ui/MusicToggle";
import { AdminProvider } from "./contexts/AdminContext";
import { GuestProvider } from "./contexts/GuestContext";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import ContributionTracking from "./pages/admin/ContributionTracking";
import GuestManagement from "./pages/admin/GuestManagement";
import RSVPSummary from "./pages/admin/RSVPSummary";
import EventDetails from "./pages/EventDetails";
import GuestbookPage from "./pages/GuestbookPage";
import HoneymoonFundPage from "./pages/HoneymoonFundPage";
import InvitationAccess from "./pages/InvitationAccess";
import LandingPage from "./pages/LandingPage";
import OurStory from "./pages/OurStory";
import RSVPPage from "./pages/RSVPPage";
import WelcomePage from "./pages/WelcomePage";

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navigation />}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/story" element={<OurStory />} />
            <Route path="/details" element={<EventDetails />} />

            {/* Auth Routes */}
            <Route path="/invite" element={<InvitationAccess />} />
            <Route path="/invite/:code" element={<InvitationAccess />} />

            {/* Protected Routes */}
            <Route
              path="/welcome"
              element={
                <ProtectedRoute>
                  <WelcomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rsvp"
              element={
                <ProtectedRoute>
                  <RSVPPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/guestbook"
              element={
                <ProtectedRoute>
                  <GuestbookPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/honeymoon"
              element={
                <ProtectedRoute>
                  <HoneymoonFundPage />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/guests"
              element={
                <AdminRoute>
                  <GuestManagement />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/rsvps"
              element={
                <AdminRoute>
                  <RSVPSummary />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/contributions"
              element={
                <AdminRoute>
                  <ContributionTracking />
                </AdminRoute>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
      {/* TODO: Remember only for non-admin routes */}
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <MusicToggle />}
    </div>
  );
};

const App = () => {
  return (
    <AdminProvider>
      <GuestProvider>
        <Router>
          <AppContent />
        </Router>
      </GuestProvider>
    </AdminProvider>
  );
};

export default App;

import { AnimatePresence } from "framer-motion";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Footer from "./components/layout/Footer";
import Navigation from "./components/layout/Navigation";
import MusicToggle from "./components/ui/MusicToggle";
import { GuestProvider } from "./contexts/GuestContext";
import EventDetails from "./pages/EventDetails";
import InvitationAccess from "./pages/InvitationAccess";
import LandingPage from "./pages/LandingPage";
import OurStory from "./pages/OurStory";
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
          </Routes>
        </AnimatePresence>
      </main>
      {/* TODO: Remember only for non-admin routes */}
      <Footer />
      <MusicToggle />
    </div>
  );
};

const App = () => {
  return (
    <GuestProvider>
      <Router>
        <AppContent />
      </Router>
    </GuestProvider>
  );
};

export default App;

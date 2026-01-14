import { AnimatePresence } from "framer-motion";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router";
import Footer from "./components/layout/Footer";
import Navigation from "./components/layout/Navigation";
import MusicToggle from "./components/ui/MusicToggle";
import EventDetails from "./pages/EventDetails";
import LandingPage from "./pages/LandingPage";
import OurStory from "./pages/OurStory";

const AppContent = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/story" element={<OurStory />} />
            <Route path="/details" element={<EventDetails />} />
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
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;

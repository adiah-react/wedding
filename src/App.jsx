import { AnimatePresence } from "framer-motion";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router";
import Footer from "./components/layout/Footer";
import MusicToggle from "./components/ui/MusicToggle";
import LandingPage from "./pages/LandingPage";

const AppContent = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
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

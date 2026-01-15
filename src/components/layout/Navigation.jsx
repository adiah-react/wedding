import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Menu, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useInvitation } from "../../hooks/useInvitation";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, invitation, logout } = useInvitation();
  // TODO - admin check

  // Determine theme based on route
  // Landing page and Welcome page are black bg (needs white text)
  const isDarkBg =
    location.pathname === "/" || location.pathname === "/welcome";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const textColorClass = scrolled
    ? "text-wedding-black"
    : isDarkBg
    ? "text-white"
    : "text-wedding-black";

  const bgClass = scrolled
    ? "bg-white/90 backdrop-blur-md shadow-sm py-4"
    : "bg-transparent py-6";

  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Our Story",
      path: "/story",
    },
    {
      name: "Details",
      path: "/details",
    },
  ];

  // TODO - add protected links if authenticated
  const protectedLinks = isAuthenticated ? [] : [];

  const allLinks = [...navLinks, ...protectedLinks];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgClass}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className={`font-serif text-2xl md:text-3xl font-medium tracking-tight transition-colors duration-300 ${textColorClass}`}
        >
          Rhiannon & Rashaad
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {allLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative text-sm uppercase tracking-widest font-medium transition-colors duration-300 group ${textColorClass}`}
            >
              {link.name}
              <span
                className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  scrolled || !isDarkBg ? "bg-wedding-black" : "bg-white"
                }`}
              ></span>
            </Link>
          ))}

          {/* Auth Status / Login Link */}
          <div
            className={`h-4 w-px ${
              scrolled || isDarkBg ? "bg-gray-300" : "bg-white/30"
            }`}
          ></div>

          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link
                to={"/welcome"}
                className={`flex items-center text-sm font-medium ${textColorClass} hover:opacity-70 transition-opacity`}
              >
                <User size={16} className="mr-2" />
                <span className="uppercase tracking-wide hidden lg:inline">
                  {invitation?.groupName}
                </span>
                <span className="uppercase tracking-wide lg:hidden">
                  Guests
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className={`p-1 rounded-full hover:bg-black/5 transition-colors ${textColorClass}`}
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/invite"
                className={`text-sm uppercase tracking-widest font-medium border px-4 py-2 transition-all duration-300 ${
                  scrolled || isDarkBg
                    ? "border-wedding-black text-wedding-black hover:bg-wedding-black hover:text-white"
                    : "border-white text-white hover:bg-white hover:text-black"
                }`}
              >
                Guest Access
              </Link>
              {/* TODO - check for admin status */}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-2 focus:outline-none transition-colors duration-300 ${textColorClass}`}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-wedding-black z-40 flex flex-col items-center justify-center md:hidden"
          >
            <div className="flex flex-col space-y-8 text-center">
              {allLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-white font-serif text-4xl hover:text-wedding-gold transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              <div className="w-12 h-px bg-white/20 mx-auto my-4"></div>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/welcome"
                    className="text-white font-serif text-2xl hover:text-wedding-gold transition-colors"
                  >
                    Your Invitation
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-400 text-sm uppercase tracking-widest mt-4"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-4">
                  <Link
                    to="/invite"
                    className="text-wedding-gold font-serif text-2xl hover:text-white transition-colors"
                  >
                    Guest Access
                  </Link>
                  {/* TODO - Admin login */}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;

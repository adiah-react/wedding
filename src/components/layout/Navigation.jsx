import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // TODO - auth and admin check

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

  // TODO - logout
  // const handleLogout = () => {
  // 	logOut()
  // 	navigate('/')
  // }

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
  const protectedLinks = [];

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
      </div>
    </nav>
  );
};

export default Navigation;

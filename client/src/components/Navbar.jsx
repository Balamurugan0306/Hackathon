import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Cpu, Menu, X, LogOut } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { useSettings } from "../hooks/useSettings";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isRegistrationEnded } = useSettings();
  const ended = isRegistrationEnded();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Home", "Domains", "Schedule"];

  const handleHomeClick = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
    }
  };

  const handleDomainClick = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById("domains");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } else {
      const el = document.getElementById("domains");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScheduleClick = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById("schedule");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } else {
      const el = document.getElementById("schedule");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById("domains");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } else {
      const el = document.getElementById("domains");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsMobileMenuOpen(false);
    navigate("/admin/login");
  };

  const isAdmin =
    location.pathname.startsWith("/admin") &&
    location.pathname !== "/admin/login";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-100 transition-all duration-300 ${isScrolled ? "py-4 bg-[#0a0a0c]/80 backdrop-blur-md shadow-2xl" : "py-6 bg-transparent"}`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link
          to="/"
          onClick={handleHomeClick}
          className="flex items-center gap-3"
        >
          <img
            src="/logo.png"
            alt="Hackathon Logo"
            className="w-10 h-10 object-contain"
          />
          {/* <span className="font-orbitron font-bold text-lg md:text-xl tracking-tighter text-white">
            CHAKRA<span className="text-neon-blue">VYUHA</span>{" "}
            <span className="text-xs">1.0</span>
          </span> */}
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => {
            if (item === "Home") {
              return (
                <a
                  key={item}
                  href="/"
                  onClick={handleHomeClick}
                  className="text-gray-400 hover:text-white transition-all font-space text-xs font-bold uppercase tracking-widest cursor-pointer"
                >
                  {item}
                </a>
              );
            }
            if (item === "Domains") {
              return (
                <a
                  key={item}
                  href="#domains"
                  onClick={handleDomainClick}
                  className="text-gray-400 hover:text-white transition-all font-space text-xs font-bold uppercase tracking-widest cursor-pointer"
                >
                  {item}
                </a>
              );
            }
            if (item === "Schedule") {
              return (
                <a
                  key={item}
                  href="#schedule"
                  onClick={handleScheduleClick}
                  className="text-gray-400 hover:text-white transition-all font-space text-xs font-bold uppercase tracking-widest cursor-pointer"
                >
                  {item}
                </a>
              );
            }
            return (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-gray-400 hover:text-white transition-all font-space text-xs font-bold uppercase tracking-widest"
              >
                {item}
              </Link>
            );
          })}

          {isAdmin && (
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 font-space font-black text-xs tracking-widest transition-all hover:bg-red-500 hover:text-white flex items-center gap-2 cursor-pointer"
            >
              <LogOut size={14} /> LOGOUT
            </button>
          )}

          {!isAdmin && (
            <a
              href={ended ? "#" : "#domains"}
              onClick={ended ? (e) => e.preventDefault() : handleRegisterClick}
            >
              <button
                disabled={ended}
                className={`px-5 py-2 rounded-full font-space font-black text-xs tracking-widest transition-all shadow-lg ${ended ? "bg-gray-800 text-gray-500 cursor-not-allowed" : "bg-white text-black hover:bg-neon-blue cursor-pointer"}`}
              >
                {ended ? "REGISTRATION ENDED" : "REGISTER"}
              </button>
            </a>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white p-2 z-110 relative cursor-pointer"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 w-full h-dvh bg-[#0a0a0c] z-105 flex flex-col items-center justify-center gap-10 overflow-hidden"
          >
            {navLinks.map((item) => {
              if (item === "Home") {
                return (
                  <a
                    key={item}
                    href="/"
                    onClick={handleHomeClick}
                    className="text-2xl font-orbitron font-black text-white tracking-[0.2em] hover:text-neon-blue transition-colors cursor-pointer"
                  >
                    {item}
                  </a>
                );
              }
              if (item === "Domains") {
                return (
                  <a
                    key={item}
                    href="#domains"
                    onClick={handleDomainClick}
                    className="text-2xl font-orbitron font-black text-white tracking-[0.2em] hover:text-neon-blue transition-colors cursor-pointer"
                  >
                    {item}
                  </a>
                );
              }
              if (item === "Schedule") {
                return (
                  <a
                    key={item}
                    href="#schedule"
                    onClick={handleScheduleClick}
                    className="text-2xl font-orbitron font-black text-white tracking-[0.2em] hover:text-neon-blue transition-colors cursor-pointer"
                  >
                    {item}
                  </a>
                );
              }
              return (
                <Link
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-orbitron font-black text-white tracking-[0.2em] hover:text-neon-blue transition-colors cursor-pointer"
                >
                  {item}
                </Link>
              );
            })}

            {isAdmin && (
              <button
                onClick={handleLogout}
                className="px-10 py-4 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 font-orbitron font-black text-lg tracking-widest cursor-pointer"
              >
                LOGOUT
              </button>
            )}

            {!isAdmin && (
              <a
                href={ended ? "#" : "#domains"}
                onClick={
                  ended ? (e) => e.preventDefault() : handleRegisterClick
                }
              >
                <button
                  disabled={ended}
                  className={`px-12 py-4 rounded-full font-orbitron font-black text-lg tracking-widest ${ended ? "bg-gray-800 text-gray-500 cursor-not-allowed" : "bg-white text-black cursor-pointer"}`}
                >
                  {ended ? "REGISTRATION ENDED" : "REGISTER"}
                </button>
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

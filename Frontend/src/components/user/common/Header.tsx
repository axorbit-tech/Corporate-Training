import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerStyle: React.CSSProperties = {
    fontFamily: "Montserrat, sans-serif",
    backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.3)" : "transparent", // semi-transparent
    backdropFilter: isScrolled ? "blur(10px)" : "none",
    WebkitBackdropFilter: isScrolled ? "blur(10px)" : "none", // Safari support
    transition: "all 0.3s ease-in-out",
  };

  return (
    <header className="fixed w-full top-0 z-50" style={headerStyle}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-1 xl:px-8">
        <div className="flex items-center px-8  justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink
              to="/"
              className="text-xl lg:text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              LOGO
            </NavLink>
          </div>

          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-6 xl:space-x-11">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide py-2 transition-colors ${isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`
                }
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                HOME
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide py-2 transition-colors ${isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`
                }
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                ABOUT US
              </NavLink>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide py-2 transition-colors ${isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`
                }
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                SERVICES
              </NavLink>
              <NavLink
                to="/events"
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide py-2 transition-colors ${isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`
                }
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                EVENTS
              </NavLink>
              <NavLink
                to="/blogs"
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide py-2 transition-colors ${isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`
                }
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                BLOG
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide py-2 transition-colors ${isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`
                }
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                CONTACT US
              </NavLink>
              <NavLink
                to="/trainers"
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide py-2 transition-colors ${isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`
                }
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                TRAINERS
              </NavLink>
            </div>
          </nav>

          {/* Desktop Book Appointment Button - Right */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:block flex-shrink-0">
              <NavLink
                to="/booking"
                className=" hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-600 cursor-pointer px-4 py-4 rounded-2xl font-medium text-sm tracking-wide transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                REGISTER AS TRAINER
              </NavLink>
            </div>
          </div>



          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              color: isScrolled ? "#374151" : "#1f2937",
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md"
            style={{
              animation: "slideDown 0.3s ease-out",
            }}
          >
            <div className="pt-2 pb-3 space-y-1">
              <NavLink
                to="/"

                className={({ isActive }) =>
                  `block px-3 py-2  font-medium text-sm tracking-wide rounded-md transition-colors ${isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`
                }
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                HOME
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `block px-3 py-2  font-medium text-sm tracking-wide rounded-md transition-colors ${isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`
                }
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                ABOUT US
              </NavLink>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `block px-3 py-2  font-medium text-sm tracking-wide rounded-md transition-colors ${isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`
                }
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                SERVICES
              </NavLink>
              <NavLink
                to="/events"
                className={({ isActive }) =>
                  `block px-3 py-2  font-medium text-sm tracking-wide rounded-md transition-colors ${isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`
                }
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                EVENTS
              </NavLink>
              <NavLink
                to="/blogs"
                className={({ isActive }) =>
                  `block px-3 py-2  font-medium text-sm tracking-wide rounded-md transition-colors ${isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`
                }
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                BLOG
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `block px-3 py-2  font-medium text-sm tracking-wide rounded-md transition-colors ${isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`
                }
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                CONTACT US
              </NavLink>
              <NavLink
                to="/counsellors"
                className={({ isActive }) =>
                  `block px-3 py-2  font-medium text-sm tracking-wide rounded-md transition-colors ${isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`
                }
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                COUNSELLORS
              </NavLink>

              {/* Mobile Book Appointment Button */}
              <div className="mt-4 px-4 sm:px-6 lg:px-8">
                <div className="pt-2 px-3">
                <NavLink
                  to="/booking"
                  className="block w-full text-center hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-600 px-4 py-3 rounded-2xl font-medium text-sm tracking-wide transition-all duration-300 shadow-sm"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  BOOK APPOINTMENT
                </NavLink>
              </div>
              <div className="pt-2 px-3">
                <NavLink
                  to="/booking"
                  className="block w-full text-center hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-600 px-4 py-3 rounded-2xl font-medium text-sm tracking-wide transition-all duration-300 shadow-sm"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  REGISTER AS A TRAINER
                </NavLink>
              </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
};

export default Header;

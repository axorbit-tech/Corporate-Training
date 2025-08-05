import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full shadow-sm">
      {/* Top bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center text-sm py-2 gap-3 lg:gap-0">
            {/* Contact Information */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-center order-2 lg:order-1">
              <div className="flex items-center gap-2 text-gray-700">
                <FaPhoneAlt className="text-xs text-blue-600 flex-shrink-0" />
                <span className="font-medium whitespace-nowrap">+91 8547412614</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <IoMdMail className="text-base text-blue-600 flex-shrink-0" />
                <span className="font-medium break-all sm:break-normal">info@axorbit.com</span>
              </div>
            </div>
            
            {/* Register & Social Links */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 order-1 lg:order-2">
              <a 
                href="#" 
                className="text-sm text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium whitespace-nowrap"
              >
                Register as Therapist
              </a>
              <div className="flex gap-3">
                <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors duration-200 p-1">
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors duration-200 p-1">
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors duration-200 p-1">
                  <FaLinkedinIn className="w-4 h-4" />
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors duration-200 p-1">
                  <FaXTwitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-wide">
                CORPORATION-COUNCIL
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a 
                href="#" 
                className="text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors duration-200"
              >
                HOME
              </a>
              <a 
                href="#" 
                className="text-gray-700 font-semibold text-sm hover:text-blue-600 transition-colors duration-200"
              >
                ABOUT US
              </a>
              <a 
                href="#" 
                className="text-gray-700 font-semibold text-sm hover:text-blue-600 transition-colors duration-200"
              >
                SERVICES
              </a>
              <a 
                href="#" 
                className="text-gray-700 font-semibold text-sm hover:text-blue-600 transition-colors duration-200"
              >
                EVENTS
              </a>
              <a 
                href="#" 
                className="text-gray-700 font-semibold text-sm hover:text-blue-600 transition-colors duration-200"
              >
                BLOG
              </a>
              <a 
                href="#" 
                className="text-gray-700 font-semibold text-sm hover:text-blue-600 transition-colors duration-200"
              >
                CONTACT US
              </a>
              <a 
                href="#" 
                className="text-gray-700 font-semibold text-sm hover:text-blue-600 transition-colors duration-200"
              >
                THERAPIST
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200" id="mobile-menu">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#" className="text-blue-600 block px-3 py-2 text-base font-semibold">
                  HOME
                </a>
                <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-semibold transition-colors duration-200">
                  ABOUT US
                </a>
                <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-semibold transition-colors duration-200">
                  SERVICES
                </a>
                <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-semibold transition-colors duration-200">
                  EVENTS
                </a>
                <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-semibold transition-colors duration-200">
                  BLOG
                </a>
                <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-semibold transition-colors duration-200">
                  CONTACT US
                </a>
                <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-semibold transition-colors duration-200">
                  THERAPIST
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
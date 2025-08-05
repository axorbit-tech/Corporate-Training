import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r bg-indigo-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Logo & Social Links */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-4">CORPORATION-COUNCIL</h3>
              <div className="bg-white/20 rounded-lg p-4 text-center">
                <span className="text-sm font-medium">LOGO HERE !!!</span>
              </div>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
              >
                <FaXTwitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/90 hover:text-white transition-colors duration-200 text-sm flex items-center">
                  <span className="mr-2">▶</span>
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-white/90 hover:text-white transition-colors duration-200 text-sm flex items-center">
                  <span className="mr-2">▶</span>
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white/90 hover:text-white transition-colors duration-200 text-sm flex items-center">
                  <span className="mr-2">▶</span>
                  Events
                </a>
              </li>
              <li>
                <a href="#" className="text-white/90 hover:text-white transition-colors duration-200 text-sm flex items-center">
                  <span className="mr-2">▶</span>
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-white/90 hover:text-white transition-colors duration-200 text-sm flex items-center">
                  <span className="mr-2">▶</span>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium">Company Name:</p>
                <p className="text-white/90">Axorbit Technologies</p>
              </div>
              <div>
                <p className="font-medium">License No:</p>
                <p className="text-white/90">License P: 0 65018</p>
              </div>
              <div>
                <p className="font-medium">Address:</p>
                <p className="text-white/90">Mananthery Tower, 3rd Floor</p>
                <p className="text-white/90">Perumthra Nazir Parkson North</p>
                <p className="text-white/90">Pin - 683 564 Kerala</p>
              </div>
            </div>
          </div>

          {/* Book Appointment Button */}
          <div className="flex flex-col items-start lg:items-center">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors duration-200 shadow-lg">
              BOOK AN APPOINTMENT
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            <div className="text-white/90">
              <p>Copyright© 2018 - Designed by Axorbit Technologies</p>
              <p className="text-xs mt-1">All rights reserved</p>
            </div>
            <div className="flex flex-wrap gap-4 text-white/90">
              <a href="#" className="hover:text-white transition-colors duration-200">Support</a>
              <span>/</span>
              <a href="#" className="hover:text-white transition-colors duration-200">Contact Us</a>
              <span>/</span>
              <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
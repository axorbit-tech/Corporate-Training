import type React from "react";
import { useNavigate } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";

const socialLinks = [
  {
    icon: Facebook,
    label: "Facebook",
    color: "#1877F2",
    href: "#",
  },
  {
    icon: Instagram,
    label: "Instagram",
    color: "#E4405F",
    href: "#",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    color: "#0A66C2",
    href: "#",
  },
  {
    icon: Youtube,
    label: "YouTube",
    color: "#FF0000",
    href: "#",
  },
  {
    icon: Twitter,
    label: "Twitter",
    color: "#1DA1F2",
    href: "#",
  },
];

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-green-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-16">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 items-center">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl flex items-center justify-center shadow-xl mb-4 sm:mb-0">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                  Axorbit
                </h2>
                <p className="text-gray-600 font-medium">Technologies</p>
              </div>
            </div>

            <p className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-xl mx-auto sm:mx-0">
              Empowering businesses with innovative technology solutions and
              expert consultation services for the digital age.
            </p>

            {/* Social Icons */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Connect With Us
              </h3>
              <div className="flex justify-center sm:justify-start flex-wrap gap-4">
                {socialLinks.map((item, idx) => {
                  const IconComponent = item.icon;
                  return (
                    <a
                      key={idx}
                      href={item.href}
                      aria-label={item.label}
                      className="p-3 rounded-full bg-white shadow hover:scale-110 transition-transform duration-300"
                      style={{ color: item.color }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6 text-center sm:text-left">
            <h3 className="text-xl font-bold text-gray-900 relative inline-block">
              Quick Links
              <div className="absolute -bottom-2 left-1/2 sm:left-0 transform -translate-x-1/2 sm:translate-x-0 w-12 h-1 bg-blue-600 rounded-full"></div>
            </h3>
            <nav className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Services", href: "/services" },
                { name: "Events", href: "/events" },
                { name: "Blog", href: "/blog" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <a
                  key={link.name}
                  onClick={() => navigate(link.href)}
                  className="block text-gray-700 hover:text-blue-600 cursor-pointer hover:translate-x-2 transition-all duration-300 text-base font-medium"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Section */}
          <div className="space-y-6 text-center sm:text-left">
            <h3 className="text-xl font-bold text-gray-900 relative inline-block">
              Get In Touch
              <div className="absolute -bottom-2 left-1/2 sm:left-0 transform -translate-x-1/2 sm:translate-x-0 w-12 h-1 bg-blue-600 rounded-full"></div>
            </h3>

            <div className="space-y-5">
              {/* Address */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4 items-center text-center sm:text-left">
                <div className="w-6 h-6 text-blue-600 flex-shrink-0 mb-2 sm:mb-0">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-900 font-semibold text-base">
                    Axorbit Technologies
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Ernakulam North, Mananthara Tower
                    <br />
                    2nd floor, PO Ernakulam 682016
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-center sm:justify-start space-x-3">
                <div className="w-6 h-6 text-blue-600 flex-shrink-0">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                <a
                  href="tel:+918547012614"
                  className="text-gray-900 font-semibold text-base hover:text-blue-600 transition-colors"
                >
                  +91 8547012614
                </a>
              </div>

              {/* Button */}
              <div className="pt-4">
                <button
                  onClick={() => navigate("/booking")}
                  className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center cursor-pointer mx-auto sm:mx-0"
                >
                  Book Appointment
                  <svg
                    className="w-5 h-5 ml-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-6 border-t border-gray-300 text-center sm:text-center">
          <p className="text-gray-600 text-sm sm:text-base">
            © 2025 Axorbit Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

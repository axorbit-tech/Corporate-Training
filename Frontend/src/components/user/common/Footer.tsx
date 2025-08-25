import type React from "react";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-green-50 py-10 sm:py-14 md:py-16">
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
                {[
                  {
                    color: "#1877F2",
                    label: "Facebook",
                    icon: "M22.675 0h-21.35C.6 0 0 .6 0 1.342v21.316C0 23.4.6 24 1.342 24H12.82V14.706H9.692V11.08h3.128V8.41c0-3.1 1.894-4.788 4.66-4.788 1.325 0 2.463.099 2.794.143v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.312h3.59l-.467 3.626h-3.123V24h6.116C23.4 24 24 23.4 24 22.658V1.342C24 .6 23.4 0 22.675 0z",
                  },
                  {
                    color: "#E4405F",
                    label: "Instagram",
                    icon: "M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.97.24 2.427.403a4.9 4.9 0 011.675 1.093 4.9 4.9 0 011.093 1.675c.163.457.347 1.257.403 2.427.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.403 2.427a4.9 4.9 0 01-1.093 1.675 4.9 4.9 0 01-1.675 1.093c-.457.163-1.257.347-2.427.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.427-.403a4.9 4.9 0 01-1.675-1.093 4.9 4.9 0 01-1.093-1.675c-.163-.457-.347-1.257-.403-2.427C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.056-1.17.24-1.97.403-2.427a4.9 4.9 0 011.093-1.675A4.9 4.9 0 015.404 2.62c.457-.163 1.257-.347 2.427-.403C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.773.13 4.64.345 3.68.732a6.918 6.918 0 00-2.516 1.64A6.918 6.918 0 00.732 4.888c-.387.96-.602 2.093-.66 3.372C.013 8.332 0 8.741 0 12c0 3.259.013 3.668.072 4.948.058 1.279.273 2.412.66 3.372a6.918 6.918 0 001.64 2.516 6.918 6.918 0 002.516 1.64c.96.387 2.093.602 3.372.66 1.28.059 1.689.072 4.948.072s3.668-.013 4.948-.072c1.279-.058 2.412-.273 3.372-.66a6.918 6.918 0 002.516-1.64 6.918 6.918 0 001.64-2.516c.387-.96.602-2.093.66-3.372.059-1.28.072-1.689.072-4.948s-.013-3.668-.072-4.948c-.058-1.279-.273-2.412-.66-3.372a6.918 6.918 0 00-1.64-2.516 6.918 6.918 0 00-2.516-1.64c-.96-.387-2.093-.602-3.372-.66C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 100-2.88 1.44 1.44 0 000 2.88z",
                  },
                  {
                    color: "#0A66C2",
                    label: "LinkedIn",
                    icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.041-1.852-3.041-1.853 0-2.136 1.445-2.136 2.939v5.671H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.37-1.852 3.605 0 4.273 2.372 4.273 5.455v6.288zM5.337 7.433a2.062 2.062 0 110-4.124 2.062 2.062 0 010 4.124zM6.888 20.452H3.784V9h3.104v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.225.792 24 1.771 24h20.451C23.208 24 24 23.225 24 22.271V1.729C24 .774 23.208 0 22.225 0z",
                  },
                  {
                    color: "#FF0000",
                    label: "YouTube",
                    icon: "M23.498 6.186a2.99 2.99 0 00-2.103-2.12C19.46 3.5 12 3.5 12 3.5s-7.46 0-9.395.566a2.99 2.99 0 00-2.103 2.12A31.47 31.47 0 000 12a31.47 31.47 0 00.502 5.814 2.99 2.99 0 002.103 2.12C4.54 20.5 12 20.5 12 20.5s7.46 0 9.395-.566a2.99 2.99 0 002.103-2.12A31.47 31.47 0 0024 12a31.47 31.47 0 00-.502-5.814zM9.75 15.02V8.98l6.545 3.02L9.75 15.02z",
                  },
                  {
                    color: "#1DA1F2",
                    label: "Twitter",
                    icon: "M23.954 4.569c-.885.392-1.83.656-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.564-2.005.974-3.127 1.195-.897-.956-2.178-1.555-3.594-1.555-2.72 0-4.924 2.204-4.924 4.924 0 .39.045.765.127 1.124-4.09-.205-7.719-2.165-10.148-5.144-.424.729-.666 1.577-.666 2.475 0 1.708.87 3.215 2.188 4.099-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.317 0-.626-.03-.928-.086.627 1.956 2.444 3.379 4.6 3.419-1.68 1.318-3.809 2.104-6.115 2.104-.398 0-.79-.023-1.175-.068 2.179 1.397 4.768 2.213 7.557 2.213 9.054 0 14-7.496 14-13.986 0-.213-.005-.425-.014-.637.962-.695 1.8-1.562 2.46-2.549z",
                  },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href="#"
                    aria-label={item.label}
                    className="p-3 rounded-full bg-white shadow hover:scale-110 transition-transform duration-300"
                    style={{ color: item.color }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d={item.icon} />
                    </svg>
                  </a>
                ))}
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
                  className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center mx-auto sm:mx-0"
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

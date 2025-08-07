import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="footer-section bg-green-50 py-8 sm:pt-10 lg:pt-10 sm:pb-6 lg:pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Company Info & Social Media */}
          <div className="space-y-6">
            {/* Company Name */}
            <div>
              <h3 className="footer-company-name text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                CORPORATION COUNCIL
              </h3>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="footer-social-link w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-colors duration-300"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              <a 
                href="#" 
                className="footer-social-link w-10 h-10 bg-pink-500 hover:bg-pink-600 text-white rounded-lg flex items-center justify-center transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.608c-.384 0-.735-.147-.997-.384-.262-.262-.384-.613-.384-.997 0-.384.122-.735.384-.997.262-.237.613-.384.997-.384s.735.147.997.384c.237.262.384.613.384.997 0 .384-.147.735-.384.997-.262.237-.613.384-.997.384zm-.997 2.448c0 .928-.367 1.418-.997 1.418s-.997-.49-.997-1.418.367-1.418.997-1.418.997.49.997 1.418z"/>
                </svg>
              </a>
              
              <a 
                href="#" 
                className="footer-social-link w-10 h-10 bg-blue-700 hover:bg-blue-800 text-white rounded-lg flex items-center justify-center transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              
              <a 
                href="#" 
                className="footer-social-link w-10 h-10 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center transition-colors duration-300"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Middle Column - Quick Links */}
          <div className="space-y-6">
            <h3 className="footer-section-title text-lg sm:text-xl font-bold text-gray-900">
              Quick Links
            </h3>
            
            <nav className="space-y-3">
              <a href="/" className="footer-nav-link block text-gray-700 hover:text-blue-600 transition-colors duration-300">
                • Home
              </a>
              <a href="/about" className="footer-nav-link block text-gray-700 hover:text-blue-600 transition-colors duration-300">
                • About Us
              </a>
              <a href="/services" className="footer-nav-link block text-gray-700 hover:text-blue-600 transition-colors duration-300">
                • Services
              </a>
              <a href="/events" className="footer-nav-link block text-gray-700 hover:text-blue-600 transition-colors duration-300">
                • Events
              </a>
              <a href="/blog" className="footer-nav-link block text-gray-700 hover:text-blue-600 transition-colors duration-300">
                • Blogs
              </a>
              <a href="/contact" className="footer-nav-link block text-gray-700 hover:text-blue-600 transition-colors duration-300">
                • Contact Us
              </a>
            </nav>
          </div>

          {/* Right Column - Contact Info */}
          <div className="space-y-6">
            <h3 className="footer-section-title text-lg sm:text-xl font-bold text-gray-900">
              Contact Info
            </h3>
            
            <div className="space-y-3">
              <p className="footer-contact-text text-gray-700 font-medium">
                Axorbit Technologies
              </p>
              <p className="footer-contact-text text-gray-700">
                Ernakulam North, Mananthara Tower
              </p>
              <p className="footer-contact-text text-gray-700">
                2nd floor, po Ernakulam 682016
              </p>
              <p className="footer-contact-text text-gray-700">
                +91 8547012614
              </p>
            </div>

            {/* Book Appointment Button */}
            <div className="pt-4">
              <a 
                href="/book-appointment"
                className="footer-cta-btn inline-block bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-6 py-3 rounded-2xl font-medium text-sm tracking-wide transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                Book Appointment
              </a>
            </div>

            {/* Copyright */}
          </div>
        </div>
            <div className="pt-10 space-y-2 text-center">
              <p className="footer-copyright text-xs text-gray-600">
                All Rights Reserved By Axorbit Technologies ® Copyright © 2025
              </p>
              {/* <p className="footer-copyright text-xs text-gray-600">
                
              </p> */}
            </div>
      </div>
    </footer>
  )
}

export default Footer

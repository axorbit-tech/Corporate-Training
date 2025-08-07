import React, { useState, useEffect } from 'react'

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerStyle: React.CSSProperties = {
    fontFamily: 'Montserrat, sans-serif',
    background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
    backdropFilter: isScrolled ? 'blur(10px)' : 'none',
    transition: 'all 0.3s ease-in-out',
  }

  return (
    <header 
      className="fixed w-full top-0 z-50"
      style={headerStyle}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a 
              href="/" 
              className="text-xl lg:text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              LOGO
            </a>
          </div>

          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-6 xl:space-x-11">
              <a 
                href="/" 
                className="text-blue-600 font-medium text-sm tracking-wide hover:text-blue-700 transition-colors py-2"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                HOME
              </a>
              <a 
                href="/about" 
                className="text-gray-700 font-medium text-sm tracking-wide hover:text-blue-600 transition-colors py-2"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                ABOUT US
              </a>
              <a 
                href="/services" 
                className="text-gray-700 font-medium text-sm tracking-wide hover:text-blue-600 transition-colors py-2"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                SERVICES
              </a>
              <a 
                href="/events" 
                className="text-gray-700 font-medium text-sm tracking-wide hover:text-blue-600 transition-colors py-2"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                EVENTS
              </a>
              <a 
                href="/blog" 
                className="text-gray-700 font-medium text-sm tracking-wide hover:text-blue-600 transition-colors py-2"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                BLOG
              </a>
              <a 
                href="/contact" 
                className="text-gray-700 font-medium text-sm tracking-wide hover:text-blue-600 transition-colors py-2"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                CONTACT US
              </a>
              <a 
                href="/therapist" 
                className="text-gray-700 font-medium text-sm tracking-wide hover:text-blue-600 transition-colors py-2"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                THERAPIST
              </a>
            </div>
          </nav>

          {/* Desktop Book Appointment Button - Right */}
          <div className="hidden lg:block flex-shrink-0">
            <a 
              href="/book-appointment"
              className=" hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-600 cursor-pointer px-8 py-4 rounded-2xl font-medium text-sm tracking-wide transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              BOOK APPOINTMENT
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              color: isScrolled ? '#374151' : '#1f2937'
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div 
            className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md"
            style={{
              animation: 'slideDown 0.3s ease-out'
            }}
          >
            <div className="pt-2 pb-3 space-y-1">
              <a 
                href="/" 
                className="block px-3 py-2 text-blue-600 font-medium text-sm tracking-wide hover:bg-blue-50 rounded-md transition-colors"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                HOME
              </a>
              <a 
                href="/about" 
                className="block px-3 py-2 text-gray-700 font-medium text-sm tracking-wide hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                ABOUT US
              </a>
              <a 
                href="/services" 
                className="block px-3 py-2 text-gray-700 font-medium text-sm tracking-wide hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                SERVICES
              </a>
              <a 
                href="/events" 
                className="block px-3 py-2 text-gray-700 font-medium text-sm tracking-wide hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                EVENTS
              </a>
              <a 
                href="/blog" 
                className="block px-3 py-2 text-gray-700 font-medium text-sm tracking-wide hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                BLOG
              </a>
              <a 
                href="/contact" 
                className="block px-3 py-2 text-gray-700 font-medium text-sm tracking-wide hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                CONTACT US
              </a>
              <a 
                href="/therapist" 
                className="block px-3 py-2 text-gray-700 font-medium text-sm tracking-wide hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                THERAPIST
              </a>
              
              {/* Mobile Book Appointment Button */}
              <div className="pt-2 px-3">
                <a 
                  href="/book-appointment"
                  className="block w-full text-center hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-600 px-4 py-3 rounded-2xl font-medium text-sm tracking-wide transition-all duration-300 shadow-sm"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  BOOK APPOINTMENT
                </a>
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
  )
}

export default Header

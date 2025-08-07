import React from 'react'

const MindsetCTASection: React.FC = () => {
  return (
    <section className="mindset-cta-section bg-green-50 py-8 sm:py-12 lg:py-16 mx-3 md:mx-16 rounded-2xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-8 px-5">
          {/* Left Side - Text Content */}
          <div className="flex-1 text-center sm:text-left">
            <h3 className="mindset-cta-heading text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
              Get our Essential Mindset Exercise
            </h3>
          </div>

          {/* Right Side - CTA Button */}
          <div className="flex-shrink-0">
            <a 
              href="/book-appointment"
              className="mindset-cta-btn inline-block bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-6 py-3 sm:px-8 sm:py-3 lg:px-10 lg:py-4 rounded-2xl font-medium text-sm sm:text-base lg:text-lg tracking-wide transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 min-w-[200px] text-center w-full sm:w-auto"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </div>

    </section>
  )
}

export default MindsetCTASection

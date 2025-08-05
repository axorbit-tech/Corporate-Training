const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src="/assets/herosection.jpg"
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="absolute bottom-20 flex flex-col items-center space-y-4">
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 cursor-pointer text-white font-semibold text-lg py-6 px-10 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out border-0 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95">
            Book an Appointment
          </button>

          {/* Optional: Add a subtle animation indicator */}
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

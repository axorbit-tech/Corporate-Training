import React from 'react'

const StatsSection: React.FC = () => {
  const stats = [
    {
      number: "200",
      suffix: "+",
      title: "Completed Services",
      description: "Successfully delivered projects"
    },
    {
      number: "150",
      suffix: "+",
      title: "Happy Clients",
      description: "Satisfied customers worldwide"
    },
    {
      number: "50",
      suffix: "+",
      title: "Expert Trainers",
      description: "Professional team members"
    },
    {
      number: "5",
      suffix: "+",
      title: "Years Experience",
      description: "Industry expertise"
    }
  ]

  return (
    <section className="stats-section bg-gray-50 py-16 sm:py-20 lg:pt-10 lg:pb-24 lg:px-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-12">
          <h2 className="stats-main-heading text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Our Achievements
          </h2>
          <p className="stats-subheading text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Numbers that speak for our commitment to excellence and client satisfaction
          </p>
        </div>

        {/* Stats Container */}
        <div className="relative">
          {/* Background with subtle pattern */}
          <div className="absolute inset-0 bg-gray-50 rounded-xl opacity-50"></div>
          
          {/* Main Stats Card */}
          <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200 shadow-xl p-6 sm:p-7 lg:p-7">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
              {stats.map((stat, index) => (
                <div key={index} className="relative text-center group">
                  
                  {/* Vertical Divider - Hidden on mobile, shown on lg+ */}
                  {index < stats.length - 1 && (
                    <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-20 bg-gray-200"></div>
                  )}
                  
                  {/* Horizontal Divider - Shown on mobile/tablet, hidden on lg+ */}
                  {index < stats.length - 1 && index % 2 === 1 && (
                    <div className="block sm:hidden absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4 h-px w-20 bg-gray-200"></div>
                  )}
                  
                  {/* Stat Content */}
                  <div className="space-y-3 sm:space-y-4 group-hover:transform group-hover:scale-105 transition-all duration-300">
                    
                    {/* Number with Icon */}
                    <div className="relative">
                      {/* Background Circle */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-50 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-7 h-5 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Number */}
                      <div className="flex items-center justify-center space-x-1">
                        <span className="stats-main-heading text-4xl sm:text-5xl md:text-xl lg:text-2xl xl:text-3xl font-bold text-blue-500">
                          {stat.number}
                        </span>
                        <span className="stats-suffix text-3xl sm:text-4xl md:text-xl lg:text-2xl xl:text-3xl font-bold text-blue-500">
                          {stat.suffix}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="stats-main-heading text-lg sm:text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                      {stat.title}
                    </h3>

                    {/* Description */}
                    <p className="stats-description text-sm sm:text-base text-gray-600 leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatsSection

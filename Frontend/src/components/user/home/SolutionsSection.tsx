import React from 'react'

const SolutionsSection: React.FC = () => {
  const solutions = [
    {
      icon: (
        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      ),
      title: "Stay Organised",
      description: "An organised mind creates an organised workplace. We provide strategies that keep tasks clear and priorities in order."
    },
    {
      icon: (
        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Mastering Time Management",
      description: "Effective use of time drives performance. Our training helps professionals focus on what matters and reduce wasted effort."
    },
    {
      icon: (
        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Defining Life & Career Goals",
      description: "Success begins with direction. We support individuals and teams in defining clear goals and building a path to reach them."
    },
    {
      icon: (
        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Building Accountability",
      description: "Strong accountability builds stronger results. We coach professionals to take ownership and deliver with consistency."
    }
  ]

  return (
    <section className="solutions-section bg-white py-16 sm:py-20 md:my-10 lg-my-16 md:mx-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="solutions-main-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            What Are You Struggling With ?
          </h2>
          <p className="solutions-subheading text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Corporate Training counselling Solution Tailored To Modern Business
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 mb-16 sm:mb-20 lg:mb-24">
          {solutions.map((solution, index) => (
            <div 
              key={index}
              className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300"
            >
              {/* Icon */}
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="p-3 sm:p-4 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300">
                  {solution.icon}
                </div>
              </div>
              
              {/* Title */}
              <h3 className="solutions-card-title text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                {solution.title}
              </h3>
              
              {/* Description */}
              <p className="solutions-card-desc text-sm sm:text-base text-gray-600 leading-relaxed">
                {solution.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left Content */}
          <div>
            <h3 className="solutions-bottom-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Gain Control Of Your Life &{' '}
              <br className="hidden sm:block" />
              Find The Balance You Need{' '}
              <br className="hidden sm:block" />
              To Succeed
            </h3>
          </div>
          
          {/* Right Content */}
          <div>
            <p className="solutions-bottom-text text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              Success isn’t just about hard work — it’s about working with clarity, balance, and purpose. Our corporate counselling programs help professionals and organisations stay organised, manage time effectively, set meaningful goals, and stay accountable, creating lasting growth and success.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SolutionsSection

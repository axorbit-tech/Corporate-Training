import React from 'react'

const ServicesHeroSection: React.FC = () => {
  return (
    <section className="services-overview-section bg-white py-16 sm:py-20 lg:py-24 lg:px-10 lg:mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left Side - Team Image */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="relative">
              <img
                src="/assets/servicepageImage1.jpg"
                alt="Professional team of diverse business experts ready to provide corporate training services"
                className="services-team-image w-full h-auto shadow-lg object-cover"
              />
            </div>
          </div>

          {/* Right Side - Services Content */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="space-y-6 sm:space-y-8">
              {/* Main Heading */}
              <h2 className="services-main-heading text-xl sm:text-xl md:text-xl lg:text-4xl xl:text-4xl font-bold text-gray-900 leading-tight">
                Our Services
              </h2>

              {/* Services Description */}
              <div className="services-description text-sm sm:text-base md:text-md text-gray-700 leading-relaxed space-y-4">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
                <p>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesHeroSection

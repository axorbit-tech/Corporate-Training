import React from 'react'

const ServicesHeroSection: React.FC = () => {
  return (
    <section className="services-overview-section bg-white py-16 sm:py-20 lg:py-24 lg:px-10 lg:mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left Side - Services Content */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="space-y-6 sm:space-y-8">
              {/* Main Heading */}
              <h2 className="services-main-heading text-xl sm:text-xl md:text-xl lg:text-4xl xl:text-4xl font-bold text-gray-900 leading-tight">
                Counsellors
              </h2>

              {/* Services Description */}
              <div className="services-description text-sm sm:text-base md:text-md text-gray-700 leading-relaxed space-y-4">
                <p>
                  Our counsellors and trainers bring a wealth of professional expertise, guiding individuals and organisations toward greater clarity, resilience, and personal growth. With a focus on empathy, trust, and evidence-based practices, they support clients in navigating challenges, improving communication, and building a stronger sense of purpose in both personal and professional life. Their approach combines practical strategies with deep understanding to ensure long-lasting positive change.
                </p>
                <p>
                  Each trainer is dedicated to creating an environment where learning and self-reflection thrive. Whether through one-on-one sessions, group workshops, or motivational programs, they help people unlock potential, overcome self-doubt, and build the confidence to achieve meaningful goals. By blending counselling insight with real-world strategies, they foster transformation that extends beyond the session, empowering lasting growth and resilience.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Team Image */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative">
              <img
                src="/assets/trainer-image.png"
                alt="Professional team of diverse business experts ready to provide corporate training services"
                className="services-team-image w-full h-auto shadow-lg object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ServicesHeroSection

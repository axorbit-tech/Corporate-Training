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
                src="/assets/service-image.png"
                alt="Professional team of diverse business experts ready to provide corporate training services"
                className="services-team-image w-full h-auto shadow-lg object-cover"
              />
            </div>
          </div>

          {/* Right Side - Services Content */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="space-y-6 sm:space-y-8">
              {/* Main Heading */}
              <h2 className="services-main-heading text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                Our Services
              </h2>

              {/* Services Description */}
              <div className="services-description text-sm sm:text-base md:text-md text-gray-700 leading-relaxed space-y-4">
                <p>
                  We provide compassionate counselling services designed to support personal growth, emotional healing, and overall well-being. Every session is created to offer a safe and confidential space where individuals can openly share, reflect, and discover new perspectives.
                </p>
                <p>
                  Our core services include individual therapy, relationship and family counselling, stress and anxiety management, and motivational coaching. Whether you are navigating life’s challenges, building resilience, or seeking clarity, we guide you with empathy and professional expertise.
                </p>
                <p>
                  Each service is rooted in trust, care, and encouragement—helping you reconnect with your inner strengths while developing healthier patterns for daily life. With a focus on long-term growth, we aim to inspire balance, confidence, and meaningful change.
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

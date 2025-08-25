import React from 'react'

const CompanyStorySection: React.FC = () => {
  return (
    <section className="about-section company-story-section bg-white py-16 sm:py-20 lg:py-24 lg:px-10 lg:mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
          
          {/* Left Column - Text Content */}
          <div className="space-y-8 lg:space-y-12">
            {/* Main Heading */}
            <div>
              <h2 className="story-main-heading text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-8 sm:mb-12">
                Our Story, Vision,{' '}
                <br />
                & Values
              </h2>
            </div>

            {/* First Paragraph */}
            <div>
              <p className="story-text text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                Our story began with a vision to create a positive impact in the way professionals and organisations approach growth and well-being. From the very beginning, we understood that success is not just measured by results, but by the balance, clarity, and confidence that individuals bring to their work and lives. Over time, this belief shaped our approach to counselling and training, helping businesses and employees find new ways to stay organised, manage time effectively, and work with greater purpose.
              </p>
            </div>

            {/* Second Paragraph */}
            <div>
              <p className="story-text text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                We believe that every professional deserves the opportunity to thrive in an environment that supports both personal and career goals. Our vision is to build workplaces that inspire accountability, collaboration, and resilience, ensuring that people feel valued and empowered. By combining proven strategies with compassionate guidance, we support organisations in achieving measurable results while also fostering a culture of trust and growth.
              </p>
            </div>
          </div>

          {/* Right Column - Images and About Us */}
          <div className="space-y-6 lg:space-y-8">
            
            {/* Top Nature Image */}
            <div className="relative">
              <img
                src="/assets/aboutpageImage1.jpg"
                alt="Natural tropical scenery with palm leaves and waterfall"
                className="story-nature-image w-full h-64 sm:h-80 lg:h-96 object-cover shadow-lg"
              />
            </div>

            {/* Bottom Section - Teamwork Image and About Us */}
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 lg:gap-6">

              {/* About Us Card */}
              <div className="bg-green-50 p-4 sm:p-6 lg:p-8 shadow-lg">
                <div className="space-y-4">
                  {/* About Us Label */}
                  <div>
                    <span className="about-us-label text-blue-500 font-medium text-md sm:text-base tracking-wide">
                      About Us
                    </span>
                  </div>

                  {/* About Us Text */}
                  <div>
                    <p className="about-us-text text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                      Our values form the foundation of everything we do — integrity in our work, accountability in our actions, collaboration in our approach, and continuous improvement in our methods. These principles drive us to deliver meaningful change, not just quick fixes. With every individual we guide and every organisation we support, we stay committed to creating lasting transformation. Together, we believe that balance, success, and fulfilment can truly go hand in hand.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CompanyStorySection

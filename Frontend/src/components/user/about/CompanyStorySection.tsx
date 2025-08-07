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
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugitSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremqueremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
              </p>
            </div>

            {/* Second Paragraph */}
            <div>
              <p className="story-text text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugitSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugitSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
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
                      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
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

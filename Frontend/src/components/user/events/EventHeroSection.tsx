import React from 'react'

const EventsHeroSection: React.FC = () => {
  return (
    <section className="about-section company-story-section bg-white py-16 sm:py-20 lg:py-24 lg:px-10 lg:mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">

          {/* Left Column - Text Content */}
          <div className="space-y-8 lg:space-y-12">
            {/* Main Heading */}
            <div>
              <h2 className="story-main-heading text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-8 sm:mb-12">
                Events &
                <br />
                Programmes
              </h2>
            </div>

            {/* First Paragraph */}
            <div>
              <p className="story-text text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                We regularly host events designed to inspire, educate, and connect individuals who are seeking personal growth and emotional well-being. These gatherings create a supportive environment where participants can learn practical tools, share experiences, and develop skills that promote balance in both personal and professional life.
              </p>
            </div>
          </div>

          {/* Right Column - Images and About Us */}
          <div className="space-y-6 lg:space-y-8">

            {/* Top Nature Image */}
            <div className="relative">
              <img
                src="/assets/event-image.png"
                alt="Natural tropical scenery with palm leaves and waterfall"
                className="story-nature-image w-full h-64 sm:h-80 lg:h-96 object-cover shadow-lg"
              />
            </div>


          </div>
        </div>
      </div>
    </section>
  )
}

export default EventsHeroSection

import React from 'react'

const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      number: "01",
      title: "Reduce Stress & Anxiety",
      description: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text,"
    },
    {
      number: "02",
      title: "Reduce Stress & Anxiety",
      description: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text,"
    },
    {
      number: "03",
      title: "Reduce Stress & Anxiety",
      description: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text,"
    },
    {
      number: "04",
      title: "Reduce Stress & Anxiety",
      description: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text,"
    }
  ]

  return (
    <section className="benefits-section px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl shadow-xl max-w-8xl md:mx-8">
        {/* Background Image Section */}
        <div className="relative h-96 sm:h-[50vh] min-h-[400px] overflow-hidden rounded-t-3xl">
          <img
            src="/assets/benefitSectionImage.jpg"
            alt="Happy woman in nature representing stress relief and well-being"
            className="benefits-bg-image w-full h-full object-cover object-center"
          />
        </div>

        {/* Content Section */}
        <div className="bg-green-50 rounded-b-3xl py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-left group">
                  {/* Number */}
                  <div className="mb-3 sm:mb-4">
                    <span className="benefits-number text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                      {benefit.number}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="benefits-title text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                    {benefit.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="benefits-desc text-sm sm:text-base text-gray-700 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection

const WhyChooseUsSection = () => {
  const features = [
    {
      id: 1,
      title: "100% Confidential & Secure",
      size: "normal",
    },
    {
      id: 2,
      title: "Licensed Experts & Coaches",
      size: "normal",
    },
    {
      id: 3,
      title: "Scalable for Teams of All Sizes",
      size: "normal",
    },
    {
      id: 4,
      title: "Flexible: In-person or Online Sessions",
      size: "normal",
    },
    {
      id: 5,
      title: "Proven Impact on Retention & Productivity",
      size: "large",
    },
  ]

  return (
    <section className="bg-gray-50 py-16 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Why Choose Us</h2>
          {/* Blue underline */}
          <div className="w-16 h-1 bg-blue-500 mx-auto"></div>
        </div>

        {/* Subheading */}
        <div className="mb-12">
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">Why Companies Trust Us</h3>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`
                bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl p-6 text-white flex items-center gap-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105
                ${feature.size === "large" ? "md:row-span-2 lg:row-span-2" : ""}
                ${index === 4 ? "md:col-start-2 lg:col-start-3 lg:row-start-1" : ""}
              `}
            >
              {/* Checkmark Icon */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              {/* Feature Text */}
              <div className="flex-1">
                <h4 className="text-lg font-semibold leading-tight">{feature.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUsSection

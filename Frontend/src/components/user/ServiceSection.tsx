import ServiceCard from "./cards/ServiceCard"

const ServiceSection = () => {
  // Sample service data - you can modify this as needed
  const services = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80",
      title: "CORPORATE COUNSELLING SERVICES",
      description:
        "Our Corporate Counselling Services are designed to provide your employees with a safe, confidential, and supportive environment to address personal and professional challenges.",
    },
    {
      id: 2,
      image:
        "/assets/heroSectionImage.jpg",
      title: "CORPORATE COUNSELLING SERVICES",
      description:
        "Our Corporate Counselling Services are designed to provide your employees with a safe, confidential, and supportive environment to address personal and professional challenges.",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80",
      title: "CORPORATE COUNSELLING SERVICES",
      description:
        "Our Corporate Counselling Services are designed to provide your employees with a safe, confidential, and supportive environment to address personal and professional challenges.",
    },
    {
      id: 4,
      image:
        "/assets/heroSectionImage.jpg",
      title: "CORPORATE COUNSELLING SERVICES",
      description:
        "Our Corporate Counselling Services are designed to provide your employees with a safe, confidential, and supportive environment to address personal and professional challenges.",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80",
      title: "CORPORATE COUNSELLING SERVICES",
      description:
        "Our Corporate Counselling Services are designed to provide your employees with a safe, confidential, and supportive environment to address personal and professional challenges.",
    },
    {
      id: 6,
      image:
        "/assets/heroSectionImage.jpg",
      title: "CORPORATE COUNSELLING SERVICES",
      description:
        "Our Corporate Counselling Services are designed to provide your employees with a safe, confidential, and supportive environment to address personal and professional challenges.",
    },
  ]

  return (
    <section className="service-section py-16 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="service-main-heading text-3xl font-bold text-blue-600 mb-2">Services</h2>
          {/* Blue underline */}
          {/* <div className="w-16 h-1 bg-blue-500 mx-auto"></div> */}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              image={service.image}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>

          <div className="text-center">
          <button className="bg-gradient-to-r border border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600 cursor-pointer px-16 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            ALL SERVICES
          </button>
        </div>


        {/* Know More Button */}
        {/* <div className="flex justify-center lg:justify-end">
          <button className="flex items-center justify-center w-32 h-32 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
            <div className="text-center">
              <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-500 group-hover:text-blue-600 transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                KNOW MORE
              </span>
            </div>
          </button>
        </div> */}
      </div>
    </section>
  )
}

export default ServiceSection

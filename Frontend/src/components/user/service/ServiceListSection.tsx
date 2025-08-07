import React from 'react'
import ServiceCard from './ServicePageCard'

const ServiceListSection: React.FC = () => {
  const services = [
    {
      title: "Psyctrisy",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
      link: "/services/psyctrisy"
    },
    {
      title: "Corporate Training",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
      link: "/services/corporate-training"
    },
    {
      title: "Leadership Development",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
      link: "/services/leadership"
    },
    {
      title: "Team Building",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
      link: "/services/team-building"
    },
    {
      title: "Stress Management",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
      link: "/services/stress-management"
    },
    {
      title: "Workplace Wellness",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
      link: "/services/wellness"
    }
  ]

  return (
    <section className="services-grid-section bg-gray-50 py-16 sm:py-20 lg:pt-20 lg:pb-16 lg:px-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              link={service.link}
            />
          ))}
        </div>

        <div className="text-center p-10">
          <button className="bg-gradient-to-r border border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600 cursor-pointer px-14 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            Load More
          </button>
        </div>
      </div>
    </section>
  )
}

export default ServiceListSection

import React from 'react'
import { useNavigate } from 'react-router-dom'

interface ServiceCardProps {
  id: number
  title: string
  description: string
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  description,
}) => {

  // Limit to 50 words
  const limitWords = (text: string, wordLimit: number) => {
    const words = text.split(' ')
    if (words.length <= wordLimit) return text
    return words.slice(0, wordLimit).join(' ') + ' ...'
  }

  const navigate = useNavigate()


  return (
    <div className="service-card bg-white border border-gray-300 p-6 sm:p-8 lg:p-10 hover:shadow-lg transition-shadow duration-300">
      <div className="space-y-4 sm:space-y-6">
        {/* Service Title */}
        <h3 className="service-card-title text-xl sm:text-2xl font-bold text-blue-500 text-center">
          {title}
        </h3>

        {/* Service Description */}
        <p className="service-card-description text-sm sm:text-base text-gray-700 leading-relaxed text-justify">
          {limitWords(description, 30)}
        </p>

        {/* More Link */}
        <div className="text-center">
          <button onClick={() => navigate(`/services-details/${id}`)} className="bg-gradient-to-r border border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600 cursor-pointer px-10 py-2 rounded-2xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            More
          </button>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard

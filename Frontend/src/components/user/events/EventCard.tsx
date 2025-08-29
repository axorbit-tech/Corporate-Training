import React from 'react'
import { formatDateTimeWithSuffix } from '../../../utils/fomatDate'
import limitWords from '../../../utils/wordLimitor'
import { useNavigate } from 'react-router-dom'

interface EventCardProps {
  id: string
  date: string
  title: string
  description: string
  image: string
  link?: string
}

const EventCard: React.FC<EventCardProps> = ({ 
  id,
  date, 
  title, 
  description, 
  image, 
}) => {

  const { readableDate, time} = formatDateTimeWithSuffix(date)
  const navigate = useNavigate();
  return (
    <div className="event-card hover:shadow-md transition-shadow duration-300 overflow-hidden flex-shrink-0 w-72 sm:w-80 lg:w-96">
      {/* Event Image */}
      <div className="event-card-image-container relative h-48 sm:h-52 lg:h-56 bg-gray-200 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="event-card-image w-full h-full object-cover"
        />
        {/* Date Overlay */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
          <div className="text-center">
            <div className="event-card-date text-lg sm:text-xl font-bold text-gray-900">
              {readableDate}
            </div>
            <div className="event-card-month text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wide">
              {time}
            </div>
          </div>
        </div>
      </div>

      {/* Event Content */}
      <div className="event-card-content p-4 sm:p-5 lg:p-6">
        <div className="space-y-3 sm:space-y-4">
          {/* Event Title */}
          <h3 className="event-card-title text-base sm:text-lg font-bold text-gray-900 leading-tight line-clamp-2">
            {title}
          </h3>

          {/* Event Description */}
          <p className="event-card-description text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-3">
            {limitWords(description, 30)}
          </p>

          {/* Read More Link */}
          <div className="pt-2">
            <a 
           
              className="event-card-link text-sm font-medium cursor-pointer text-blue-500 hover:text-blue-600 transition-colors duration-300"
              onClick={() =>navigate(`/event-details/${id}`)}
            >
              Read More →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCard

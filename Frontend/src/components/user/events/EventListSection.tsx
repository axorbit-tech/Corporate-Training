import React, { useState, useEffect, useRef } from 'react'
import EventCard from './EventCard'

interface EventListSectionProps {
  title: string
  events: Array<{
    _id: string
    date: string
    month: string
    title: string
    content: string
    images: string
    link?: string
  }>
  responses: {
    isLoading: boolean
    error: string
  }
}


const EventListSection: React.FC<EventListSectionProps> = ({ title, events, responses }) => {
  const { isLoading, error } = responses
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex >= events.length - 1 ? 0 : prevIndex + 1
        )
      }, 4000) // Auto-scroll every 4 seconds
  
      return () => clearInterval(interval)
    }
  }, [isHovered, events.length])
  
  // Scroll to current card
  useEffect(() => {
    if (scrollContainerRef.current) {
      const cardWidth = 320 // Approximate card width including gap
      const scrollPosition = currentIndex * cardWidth
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      })
    }
  }, [currentIndex])

  if (isLoading) {
    return (
      <div className="admin-service-details min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading {title} details...</p>
        </div>
      </div>
    )
  }

  if (error || !events) {
    return (
      <div className="admin-service-details min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading {title} details</p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  // Auto-scroll functionality

  const handlePrevious = () => {
    setCurrentIndex(currentIndex === 0 ? events.length - 1 : currentIndex - 1)
  }

  const handleNext = () => {
    setCurrentIndex(currentIndex >= events.length - 1 ? 0 : currentIndex + 1)
  }

  return (
    <section className="upcoming-events-section bg-gray-50 pt-12 sm:pt-12 lg:pt-24 lg:px-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left Side - Section Title */}
          <div className="lg:col-span-3 xl:col-span-2">
            <h2 className="upcoming-events-heading text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight sticky top-8">
              {title}
            </h2>
          </div>

          {/* Right Side - Events Carousel */}
          <div className="lg:col-span-9 xl:col-span-10">
            <div className="relative">
              {/* Events Container */}
              <div
                ref={scrollContainerRef}
                className="events-carousel-container flex gap-6 overflow-x-auto scrollbar-hide pb-4"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {events.map((event, index) => (
                  <EventCard
                    key={index}
                    id={event._id}
                    date={event.date}
                    title={event.title}
                    description={event.content}
                    image={event.images?.[0] || "/placeholder.svg"}
                    link={event.link}
                  />
                ))}
              </div>

              {/* Navigation Arrows - Desktop Only */}
              <div className="hidden lg:flex absolute -left-4 top-1/2 transform -translate-y-1/2">
                <button
                  onClick={handlePrevious}
                  className="nav-arrow-btn w-12 h-12 bg-white hover:bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  aria-label="Previous event"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>

              <div className="hidden lg:flex absolute -right-4 top-1/2 transform -translate-y-1/2">
                <button
                  onClick={handleNext}
                  className="nav-arrow-btn w-12 h-12 bg-white hover:bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  aria-label="Next event"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-6 space-x-2">
                {events.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`dot-indicator w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                        ? 'bg-blue-500 w-8'
                        : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    aria-label={`Go to event ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventListSection

import React, { useState, useEffect, useRef } from 'react'
import EventCard from './EventCard'

const UpcomingEventsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const events = [
    {
      date: "15",
      month: "DEC",
      title: "Counselling Event at Techno Park Kochi",
      description: "Join us for a comprehensive counselling session focused on workplace mental health and stress management techniques for modern professionals.",
      image: "/assets/herosection.jpg",
      link: "/events/counselling-techno-park"
    },
    {
      date: "22",
      month: "DEC",
      title: "Corporate Leadership Workshop",
      description: "An intensive workshop designed to enhance leadership skills and team management capabilities for corporate executives and managers.",
      image: "/assets/herosection.jpg",
      link: "/events/leadership-workshop"
    },
    {
      date: "28",
      month: "DEC",
      title: "Stress Management Seminar",
      description: "Learn effective stress management techniques and mindfulness practices to improve work-life balance and overall well-being.",
      image: "/assets/herosection.jpg",
      link: "/events/stress-management"
    },
    {
      date: "05",
      month: "JAN",
      title: "Team Building Retreat",
      description: "A comprehensive team building retreat focusing on communication, collaboration, and building stronger workplace relationships.",
      image: "/assets/herosection.jpg",
      link: "/events/team-building"
    },
    {
      date: "12",
      month: "JAN",
      title: "Workplace Wellness Program",
      description: "Discover strategies for creating a healthier workplace environment and promoting employee wellness and productivity.",
      image: "/assets/herosection.jpg",
      link: "/events/wellness-program"
    }
  ]

  // Auto-scroll functionality
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

  const handlePrevious = () => {
    setCurrentIndex(currentIndex === 0 ? events.length - 1 : currentIndex - 1)
  }

  const handleNext = () => {
    setCurrentIndex(currentIndex >= events.length - 1 ? 0 : currentIndex + 1)
  }

  return (
    <section className="upcoming-events-section bg-gray-50 py-12 sm:py-12 lg:py-12 lg:px-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Side - Section Title */}
          <div className="lg:col-span-3 xl:col-span-2">
            <h2 className="upcoming-events-heading text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight sticky top-8">
              Upcoming<br />
              Events
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
                    date={event.date}
                    month={event.month}
                    title={event.title}
                    description={event.description}
                    image={event.image}
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
                    className={`dot-indicator w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex 
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

export default UpcomingEventsSection

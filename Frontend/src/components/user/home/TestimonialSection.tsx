import { useState } from "react"

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      quote: "The sessions helped me manage stress and reconnect with my work. I feel heard and supported.",
      name: "Shabad MK",
      position: "Software Developer",
      image: "/assets/testimonial-headshot.jpg",
    },
    {
      id: 2,
      quote:
        "Our team's productivity increased significantly after implementing these counselling services. Highly recommended!",
      name: "Sarah Johnson",
      position: "Team Lead",
      image: "/assets/testimonial-headshot.jpg",
    },
    {
      id: 3,
      quote:
        "The flexible approach and professional guidance helped our entire organization create a better work environment.",
      name: "Michael Chen",
      position: "HR Director",
      image: "/assets/testimonial-headshot.jpg",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section className="testimonial-section bg-gray-50 py-16 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6">
          <h2 className="testimonial-main-heading text-3xl font-bold text-blue-600 mb-2">Testimonials</h2>
          {/* Blue underline */}
          {/* <div className="w-16 h-1 bg-blue-500 mx-auto"></div> */}
        </div>

        {/* Subheading */}
        <div className="mb-16">
          <h3 className="testimonial-subheading text-2xl lg:text-3xl text-center font-bold text-gray-900">What Employees & Leaders Are Saying</h3>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 lg:left-0 top-1/2 transform -translate-y-1/2 lg:-translate-x-12 w-10 h-10 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group z-10"
            aria-label="Previous testimonial"
          >
            <svg
              className="w-5 h-5 text-gray-600 group-hover:text-blue-500 transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 lg:right-0 top-1/2 transform -translate-y-1/2 lg:translate-x-12 w-10 h-10 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group z-10"
            aria-label="Next testimonial"
          >
            <svg
              className="w-5 h-5 text-gray-600 group-hover:text-blue-500 transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Testimonial Card */}
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg min-h-[300px] flex flex-col justify-center">
            <div className="text-center">
              {/* Quote */}
              <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-8 italic">
                "{testimonials[currentIndex].quote}"
              </blockquote>

              {/* Profile Image */}
              <div className="mb-4">
                <img
                  src={testimonials[currentIndex].image || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                  className="w-20 h-20 rounded-full mx-auto object-cover bg-gray-200"
                />
              </div>

              {/* Name and Position */}
              <div>
                <h4 className="text-lg font-semibold text-blue-500 mb-1">{testimonials[currentIndex].name}</h4>
                <p className="text-sm text-gray-600">{testimonials[currentIndex].position}</p>
              </div>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-blue-500" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
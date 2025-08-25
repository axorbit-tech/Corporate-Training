const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      quote:
        "The coaching sessions gave me practical tools to stay organised and motivated. My focus has never been better.",
      name: "Ananya Rao",
      position: "Project Manager",
      image: "/assets/testimonial-headshot.jpg",
    },
    {
      id: 2,
      quote:
        "With their guidance, I learned how to manage my time effectively and reduce workplace stress. Truly transformative!",
      name: "David Miller",
      position: "Senior Analyst",
      image: "/assets/testimonial-headshot.jpg",
    },
    {
      id: 3,
      quote:
        "Our leadership team saw real improvements in communication and accountability. A valuable investment for our company.",
      name: "Priya Singh",
      position: "Operations Head",
      image: "/assets/testimonial-headshot.jpg",
    },
  ]

  const styles = {
     fontFamily: "Montserrat, serif",
  }

  return (
    <section className="testimonial-section bg-gray-50 py-10 lg:pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6">
          <h2 className="testimonial-main-heading text-3xl font-bold text-blue-600 mb-2">
            Testimonials
          </h2>
        </div>

        {/* Subheading */}
        <div className="mb-12">
          <h3 className="testimonial-subheading text-2xl lg:text-3xl text-center font-bold text-gray-900">
            What Employees & Leaders Are Saying
          </h3>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 shadow-lg flex flex-col justify-between text-center"
            >
              {/* Quote */}
              <blockquote className="text-lg text-gray-700 leading-relaxed mb-6 italic" style={styles}>
                "{testimonial.quote}"
              </blockquote>

              {/* Profile */}
              <div>
                <div className="mb-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover bg-gray-200"
                  />
                </div>
                <h4 className="text-lg font-semibold text-blue-500 mb-1">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-gray-600">{testimonial.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection

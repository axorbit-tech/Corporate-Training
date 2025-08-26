import React from 'react'

const BlogHeroSection: React.FC = () => {
  return (
    <section className="blog-hero-section bg-white px-4 py-16 sm:py-20 lg:py-24 lg:px-16 lg:mt-12">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left Side - Workspace Image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <img
                src="/assets/blog-image.png"
                alt="Modern workspace with laptop, coffee, smartphone, notebook and plant representing our blog content creation environment"
                className="blog-hero-image w-full h-auto object-cover shadow-lg"
              />
            </div>
          </div>

          {/* Right Side - Blog Content */}
          <div className="order-1 lg:order-2">
            <div className="space-y-6 sm:space-y-8">
              {/* Main Heading */}
              <h1 className="blog-hero-heading text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                Blogs
              </h1>

              {/* Description Text */}
              <div className="blog-hero-description text-sm sm:text-base md:text-md text-gray-700 leading-relaxed">
                <p>
                  Our blog is a space dedicated to sharing meaningful insights, practical strategies, and inspiring stories that support personal growth and emotional well-being. We explore a wide range of topics such as stress management, mindfulness practices, resilience building, and motivational guidance, offering content that empowers readers to reflect and apply positive changes in their daily lives. Each article is carefully crafted by professionals with experience in counselling, therapy, and coaching, ensuring that every post is both relatable and informative. Through storytelling and evidence-based advice, our blogs aim to connect with individuals who are seeking encouragement, clarity, and purpose. We believe that learning does not stop within the therapy room, and this platform provides an opportunity for continuous growth and reflection. Whether you are looking for inspiration, tools to manage challenges, or ways to enhance your mindset, our blog serves as a reliable companion in your journey toward balance, confidence, and overall well-being.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogHeroSection

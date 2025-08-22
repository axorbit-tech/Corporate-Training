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
                src="/assets/blog-hero-image.jpg"
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
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
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

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Why Mental Health Support at Work Is No Longer Optional",
      description:
        "In today's fast-paced corporate world, stress, burnout, and emotional exhaustion are more than just buzzwords — they're real issues affecting productivity, morale, and retention.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      date: "March 15, 2024",
    },
    {
      id: 2,
      title: "Why Mental Health Support at Work Is No Longer Optional",
      description:
        "In today's fast-paced corporate world, stress, burnout, and emotional exhaustion are more than just buzzwords — they're real issues affecting productivity, morale, and retention.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      date: "March 12, 2024",
    },
  ]

  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Our Blogs</h2>
          {/* Blue underline */}
          <div className="w-16 h-1 bg-blue-500 mx-auto"></div>
        </div>

        {/* Description */}
        <div className="text-center mb-16">
          <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Every post is crafted to deliver value, offering actionable advice that supports your goals.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Image */}
                <div className="sm:w-1/3 h-48 sm:h-auto">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="sm:w-2/3 p-6 flex flex-col justify-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{post.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* All Posts Button */}
        <div className="text-center">
          <button className="bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white px-12 py-4 rounded-full font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            ALL POSTS
          </button>
        </div>
      </div>
    </section>
  )
}

export default BlogSection

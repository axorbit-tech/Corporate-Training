import { useEffect, useState } from "react";
import { useGetBlogsQuery } from "../../../store/slices/userApiSlice"
import { useNavigate } from "react-router-dom";
import limitWords from "../../../utils/wordLimitor";

interface Blogs {
  _id: number;
  title: string;
  content: string;
  image: string;
  createdAt: string
}

const BlogSection = () => {
  
  const navigate = useNavigate()
  
  const {data: blogs} = useGetBlogsQuery(undefined)

  useEffect(()=> {
    setBlogPosts(blogs?.data)
  }, [blogs])

  const [blogPosts, setBlogPosts] = useState<Blogs[]>([])


  return (
    <section className="blog-section bg-gray-50 py-16 lg:py-24">
      <div className="mx-auto px-4 sm:px-6 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="blog-main-heading text-3xl font-bold text-blue-600 mb-2">Our Blogs</h2>
          {/* Blue underline */}
          {/* <div className="w-16 h-1 bg-blue-500 mx-auto"></div> */}
        </div>

        {/* Description */}
        <div className="text-center mb-16">
          <p className="blog-subheading text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Every post is crafted to deliver value, offering actionable advice that supports your goals.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {blogPosts?.slice(0,2).map((post) => (
            <article
              key={post._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Image */}
                <div className="sm:w-1/3 h-48 sm:h-auto">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-fill group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="sm:w-2/3 p-6 flex flex-col justify-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{limitWords(post.content, 60)}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* All Posts Button */}
        <div className="text-center">
          <button onClick={()=> navigate('/blogs')} className="bg-gradient-to-r border border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600 cursor-pointer px-16 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            ALL POSTS
          </button>
        </div>
      </div>
    </section>
  )
}

export default BlogSection

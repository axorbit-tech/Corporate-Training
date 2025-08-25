import React, { useEffect } from "react";
import { useState } from "react";
import BlogPostCard from "./BlogPostCard";
import { useGetBlogsQuery } from '../../../store/slices/userApiSlice'
import type { IBlog } from "../../../types/types";

const BlogPostsSection: React.FC = () => {

  const { data: getBlog, isLoading, isError } = useGetBlogsQuery(undefined)
  
  const [blogPosts, setBlogPosts] = useState<IBlog[]>([])

  useEffect(()=> {
    if(getBlog) {
      setBlogPosts(getBlog.data)
    }
  }, [getBlog])

  // state to track whether to show all services or not
  const [showAll, setShowAll] = useState(false)

  if (isLoading) {
    return (
      <section className="py-16 text-center">
        <p>Loading Blogs...</p>
      </section>
    )
  }

  if (isError) {
    return (
      <section className="py-16 text-center text-red-600">
        <p>Failed to load services. Please try again later.</p>
      </section>
    )
  }

  const visibleServices = showAll ? blogPosts : blogPosts.slice(0, 4)

  return (
    <section className="blog-posts-section bg-gray-50 py-16 sm:py-20 lg:px-10 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="blog-posts-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            Latest Blog Posts
          </h2>
          <p className="blog-posts-subheading text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with our latest insights, tips, and strategies for
            corporate training and workplace wellness.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="space-y-8 sm:space-y-10 lg:space-y-12">
          {visibleServices?.map((post: IBlog, index: number) => (
            <BlogPostCard
              key={post._id}
              Index={index}
              id={post._id}
              author={"Admin"}
              date={post.createdAt}
              title={post.title}
              description={post.content}
              image={post.image}
            />
          ))}
        </div>

        {/* Load More Button */}
        {blogPosts.length > 4 && !showAll && (
          <div className="text-center p-10">
            <button
              onClick={() => setShowAll(true)}
              className="bg-gradient-to-r border border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600 cursor-pointer px-14 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPostsSection;

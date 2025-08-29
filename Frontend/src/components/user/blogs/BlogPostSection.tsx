import React, { useEffect } from "react";
import { useState } from "react";
import BlogPostCard from "./BlogPostCard";
import { useGetBlogsQuery } from "../../../store/slices/userApiSlice";
import type { IBlog } from "../../../types/types";
import SomethingWentWrong from "../../common/error";
import LoaderComponent from "../../common/Loader";

const BlogPostsSection: React.FC = () => {
  const { data: getBlog, isLoading, isError } = useGetBlogsQuery(undefined);

  const [blogPosts, setBlogPosts] = useState<IBlog[]>([]);

  useEffect(() => {
    if (getBlog) {
      setBlogPosts(getBlog.data);
    }
  }, [getBlog]);

  // state to track whether to show all services or not
  const [showAll, setShowAll] = useState(false);

  if (isLoading) {
    return <LoaderComponent/>
  }

  if (isError) {
    return <SomethingWentWrong/>
  }

  const visibleServices = showAll ? blogPosts : blogPosts.slice(0, 4);

  return (
    <section className="blog-posts-section bg-gray-50 py-16 sm:py-20 lg:px-10 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {visibleServices && visibleServices.length > 0 ? (
          <>
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <h2 className="blog-posts-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
                Latest Blog Posts
              </h2>
              <p className="blog-posts-subheading text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Stay updated with our latest insights, tips, and strategies for
                corporate training and workplace wellness.
              </p>
            </div>

            <div className="space-y-8 sm:space-y-10 lg:space-y-12">
              {visibleServices.map((post: IBlog, index: number) => (
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
          </>
        ) : (
          <div className="text-center py-12 sm:py-16 lg:py-20">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                No Blogs Available
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                We're working on creating amazing content for you. Check back
                soon for our latest insights and updates!
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPostsSection;

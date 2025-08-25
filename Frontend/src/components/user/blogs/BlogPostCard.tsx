import React from "react";
import { useNavigate } from "react-router-dom";
import limitWords from "../../../utils/wordLimitor";

interface BlogPostCardProps {
  id: number;
  author: string;
  date: string;
  title: string;
  description: string;
  image?: string;
  Index?: number;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  id,
  author,
  date,
  title,
  description,
  image,
  Index,
}) => {
  const isEven = (Index ?? 0) % 2 === 0;

  const navigate = useNavigate();

  return (
    <article className="blog-post-card bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Conditionally render image first if index is even */}
        {isEven && (
          <div className="blog-post-image-container relative overflow-hidden">
            <a>
              <img
                src={image || "/assets/blog-hero-image.jpg"}
                alt={title}
                className="blog-post-image w-full object-cover aspect-[16/9] hover:scale-105 transition-transform duration-300"
              />
            </a>
          </div>
        )}

        {/* Blog Content */}
        <div className="blog-post-content p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
          <div className="space-y-2">
            {/* Author and Date */}
            <div className="blog-post-meta flex items-center space-x-3">
              <div className="author-avatar w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div className="author-info">
                <div className="author-name text-sm font-medium text-blue-500">
                  {author}
                </div>
                <div className="post-date text-xs text-gray-500">{date}</div>
              </div>
            </div>

            {/* Blog Post Title */}
            <h3 className="blog-post-title text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              <a className="hover:text-blue-600 transition-colors duration-300">
                {title}
              </a>
            </h3>

            {/* Blog Post Excerpt */}
            <p className="blog-post-excerpt text-sm sm:text-base text-gray-700 leading-relaxed text-justify">
              {limitWords(description, 80)}
            </p>

            {/* More Button */}
            <button
              onClick={() => navigate(`/blog-details/${id}`)}
              className="bg-gradient-to-r border border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600 cursor-pointer 
             px-10 py-1 rounded-2xl font-semibold text-sm sm:text-base 
             transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 
             mt-4 w-full sm:w-auto text-center"
            >
              More
            </button>
          </div>
        </div>

        {/* Conditionally render image last if index is odd */}
        {!isEven && (
          <div className="blog-post-image-container relative overflow-hidden">
            <a>
              <img
                src={image || "/assets/blog-hero-image.jpg"}
                alt={title}
                className="blog-post-image w-full object-cover aspect-[16/9] hover:scale-105 transition-transform duration-300"
              />
            </a>
          </div>
        )}
      </div>
    </article>
  );
};

export default BlogPostCard;

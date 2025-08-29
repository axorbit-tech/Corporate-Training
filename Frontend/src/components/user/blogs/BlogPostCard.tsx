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
}) => {
  const navigate = useNavigate();

  return (
    <article className="blog-post-card bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image on Top */}
      <div className="blog-post-image-container relative overflow-hidden">
        <img
          src={image || "/assets/blog-hero-image.jpg"}
          alt={title}
          className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Below Image */}
      <div className="blog-post-content p-3 sm:p-6 lg:p-8 flex flex-col justify-center">
        {/* Author and Date */}
        <div className="flex items-center space-x-3 mb-2 sm:mb-4">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <div>
            <div className="text-[10px] sm:text-xs md:text-sm font-medium text-blue-500">
              {author}
            </div>
            <div className="text-[9px] sm:text-xs md:text-sm text-gray-500">
              {date}
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 leading-tight mb-2 sm:mb-3">
          <a className="hover:text-blue-600 transition-colors duration-300">
            {title}
          </a>
        </h3>

        {/* Description */}
        <p className="text-[11px] sm:text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed text-justify mb-3 sm:mb-4">
          {limitWords(description, 80)}
        </p>

        {/* Button */}
        <button
          onClick={() => navigate(`/blog-details/${id}`)}
          className="bg-gradient-to-r border border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600 cursor-pointer 
          px-4 sm:px-6 md:px-8 py-1 sm:py-2 rounded-2xl font-semibold 
          text-[11px] sm:text-sm md:text-base 
          transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 
          w-full sm:w-auto text-center"
        >
          More
        </button>
      </div>
    </article>
  );
};

export default BlogPostCard;

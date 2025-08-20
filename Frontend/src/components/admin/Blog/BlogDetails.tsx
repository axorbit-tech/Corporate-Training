import type React from "react";
import { ArrowLeft, Edit } from "lucide-react";
import { useGetBlogDetailsQuery } from "../../../store/slices/apiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { IBlog } from "../../../types/types";
import Loader from "../../common/Loader";
import SomethingWentWrong from "../../common/error";


type BlogDetailsParams = {
  id: string;
};

const BlogDetails: React.FC = () => {
  const { id } = useParams<BlogDetailsParams>();

  console.log(id, "idddddd")

  const navigate = useNavigate();
  // Mock blog post data
  const { data: blogResponse, isLoading, isError } = useGetBlogDetailsQuery(id);

  const [blog, setBlog] = useState<IBlog>()

  useEffect(() => {
    setBlog(blogResponse?.blog)
  }, [blogResponse])


  const handleEdit = () => {
    navigate(`/admin/edit-blog/${id}`);
  };

  const renderMarkdown = (content: string) => {
    // Simple markdown rendering
    return content
      ?.replace(
        /^# (.*$)/gm,
        '<h1 class="text-3xl font-bold text-gray-900 mb-4 mt-8">$1</h1>'
      )
      .replace(
        /^## (.*$)/gm,
        '<h2 class="text-2xl font-bold text-gray-900 mb-3 mt-6">$1</h2>'
      )
      .replace(
        /^### (.*$)/gm,
        '<h3 class="text-xl font-bold text-gray-900 mb-2 mt-4">$1</h3>'
      )
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/^(?!<[h|l])/gm, '<p class="mb-4">');
  };

  if (isLoading) return <Loader />
  if (isError) return <SomethingWentWrong />

  
  return (
    <div className="admin-blog-details min-h-screen bg-gray-50">
      {/* Header */}
      <div className="admin-blog-header bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/admin/blogs")}
                className="admin-back-btn p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="admin-blog-page-title text-lg sm:text-xl font-bold text-gray-900 truncate max-w-xs sm:max-w-md">
                  Blog Details
                </h1>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2">
              {/* Edit Button */}
              <button
                onClick={handleEdit}
                className="admin-edit-btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span className="hidden sm:inline">Edit</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-blog-content max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="admin-content-container bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Featured Image */}
          {blog?.image && (
            <div className="admin-featured-image-container">
              <img
                src={blog?.image || "/placeholder.svg"}
                alt={blog?.title}
                className="admin-featured-image w-full h-64 sm:h-80 lg:h-96 object-cover"
              />
            </div>
          )}

          {/* Content Body */}
          <div className="admin-content-body p-6 sm:p-8 lg:p-10">
            {/* Title */}
            <div className="admin-content-header mb-8">
              <h1 className="admin-content-title text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {blogResponse?.blog?.title}
              </h1>
            </div>

            {/* Article Content */}
            <div
              className="admin-article-content prose prose-lg max-w-none text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: renderMarkdown(blogResponse?.blog?.content),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;

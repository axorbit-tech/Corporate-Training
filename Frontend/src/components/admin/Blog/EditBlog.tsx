import type React from "react";
import { useState, useRef, useEffect } from "react";
import {
  Upload,
  X,
  Eye,
  Save,
  ArrowLeft,
  Bold,
  Italic,
  List,
  Link,
  Quote,
  Code,
} from "lucide-react";
import { useGetBlogDetailsQuery } from "../../../store/slices/apiSlice";
import { useEditBlogMutation } from "../../../store/slices/apiSlice";
import { errorToast, successToast } from "../../../utils/toast";
import { useNavigate } from "react-router-dom";

interface BlogFormData {
  title: string;
  content: string;
  image: string; // Keep as string for existing image URL
}

interface EditBlogPostProps {
  blogId?: string;
}

const EditBlogPost: React.FC<EditBlogPostProps> = ({ blogId }) => {
  const navigate = useNavigate();
  const { data: blog, isLoading } = useGetBlogDetailsQuery(blogId, {
    skip: !blogId,
  });
  const [editBlog] = useEditBlogMutation();

  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    content: "",
    image: "",
  });

  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasImageChanged, setHasImageChanged] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  // Initialize form data when blog is loaded
  useEffect(() => {
    if (blog?.blog) {
      const blogData = {
        title: blog.blog.title || "",
        content: blog.blog.content || "",
        image: blog.blog.image || "",
      };
      
      setFormData(blogData);
      
      if (blog.blog.image) {
        setImagePreview(blog.blog.image);
      }
    }
  }, [blog]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        errorToast('Image size must be less than 5MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        errorToast('Please select a valid image file');
        return;
      }

      setFeaturedImage(file);
      setHasImageChanged(true);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFeaturedImage(null);
    setImagePreview("");
    setHasImageChanged(true);
    setFormData((prev) => ({ ...prev, image: "" }));
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const insertTextAtCursor = (text: string) => {
    const textarea = contentRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const content = formData.content;
      const newContent =
        content.substring(0, start) + text + content.substring(end);

      setFormData((prev) => ({ ...prev, content: newContent }));

      // Reset cursor position
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + text.length, start + text.length);
      }, 0);
    }
  };

  const handleSave = async () => {
    // Validation
    if (!formData.title.trim()) {
      errorToast('Please enter a blog title');
      return;
    }

    if (!formData.content.trim()) {
      errorToast('Please enter blog content');
      return;
    }

    try {
      setIsSaving(true);

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title.trim());
      formDataToSend.append("content", formData.content.trim());

      // Only append image if it has changed
      if (hasImageChanged && featuredImage) {
        formDataToSend.append("image", featuredImage);
      }

      // Call the mutation
      const res = await editBlog({
        id: blogId,
        data: formDataToSend,
      }).unwrap();

      console.log("Blog updated successfully:", res);
      
      if (res.success) {
        successToast('Blog updated successfully');
        navigate('/admin/blogs');
      } else {
        errorToast('Error updating blog');
      }

    } catch (error) {
      console.error("Error updating blog:", error);
      errorToast('something went wrong');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const renderMarkdown = (text: string): string => {
    if (!text) return "";

    let html = text;

    // Convert headings
    html = html.replace(
      /^## (.*$)/gm,
      '<h2 class="text-2xl font-bold text-gray-900 mb-4 mt-6">$1</h2>'
    );
    html = html.replace(
      /^### (.*$)/gm,
      '<h3 class="text-xl font-bold text-gray-900 mb-3 mt-5">$1</h3>'
    );

    // Convert bold text
    html = html.replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="font-bold">$1</strong>'
    );

    // Convert italic text
    html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

    // Convert inline code
    html = html.replace(
      /`(.*?)`/g,
      '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>'
    );

    // Convert links
    html = html.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // Convert blockquotes
    html = html.replace(
      /^> (.*$)/gm,
      '<blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4">$1</blockquote>'
    );

    // Convert unordered lists
    html = html.replace(/^- (.*$)/gm, '<li class="ml-4 mb-1">• $1</li>');
    html = html.replace(/((?:<li.*<\/li>\s*)+)/g, '<ul class="my-4">$1</ul>');

    // Convert line breaks to paragraphs
    html = html.replace(/\n\n/g, '</p><p class="mb-4">');
    html = '<p class="mb-4">' + html + "</p>";

    // Clean up empty paragraphs
    html = html.replace(/<p class="mb-4"><\/p>/g, "");

    return html;
  };

  if (isLoading) {
    return (
      <div className="edit-blog-post min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-blog-post min-h-screen bg-gray-50">
      {/* Header */}
      <div className="blog-header bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.history.back()}
                className="back-btn p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="blog-page-title text-xl sm:text-2xl font-bold text-gray-900">
                  Edit Blog Post
                </h1>
                <p className="blog-page-subtitle text-sm text-gray-600 hidden sm:block">
                  Update your blog content and settings
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handlePreview}
                className="preview-btn hidden sm:flex items-center space-x-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <Eye className="w-4 h-4" />
                <span>{isPreviewMode ? "Edit" : "Preview"}</span>
              </button>

              <button
                onClick={handleSave}
                disabled={isSaving}
                className="publish-btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Update Blog</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="blog-content max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {!isPreviewMode ? (
            // Edit Mode
            <>
              {/* Blog Title */}
              <div className="title-section bg-white rounded-lg border border-gray-200 p-6">
                <label
                  htmlFor="title"
                  className="form-label block text-sm font-medium text-gray-700 mb-3"
                >
                  Blog Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter your blog post title..."
                  className="title-input w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
                <p className="title-help text-xs text-gray-500 mt-2">
                  Keep it engaging and under 60 characters for better SEO
                </p>
              </div>

              {/* Featured Image Upload */}
              <div className="image-section bg-white rounded-lg border border-gray-200 p-6">
                <label className="form-label block text-sm font-medium text-gray-700 mb-3">
                  Featured Image
                </label>

                {!imagePreview ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="image-upload-area border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
                  >
                    <div className="upload-content space-y-4">
                      <div className="upload-icon mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <Upload className="w-8 h-8 text-gray-400" />
                      </div>
                      <div>
                        <p className="upload-text text-lg font-medium text-gray-900 mb-2">
                          Upload Featured Image
                        </p>
                        <p className="upload-subtext text-sm text-gray-600">
                          Drag and drop or click to browse
                        </p>
                        <p className="upload-formats text-xs text-gray-500 mt-2">
                          Supports: JPG, PNG, GIF (Max 5MB)
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="image-preview-container relative">
                    <img
                      src={formData.image || imagePreview}
                      alt="Featured image preview"
                      className="image-preview w-full h-64 sm:h-80 object-cover rounded-lg"
                    />
                    <button
                      onClick={removeImage}
                      className="remove-image-btn absolute top-3 right-3 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="image-info bg-black bg-opacity-50 text-white p-3 rounded-b-lg">
                      <p className="text-sm">
                        {featuredImage?.name
                          ? `${featuredImage.name} (${Math.round(
                              featuredImage.size / 1024
                            )} KB)`
                          : "Current featured image"}
                      </p>
                    </div>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Content Editor */}
              <div className="content-section bg-white rounded-lg border border-gray-200 p-6">
                <label
                  htmlFor="content"
                  className="form-label block text-sm font-medium text-gray-700 mb-3"
                >
                  Blog Content *
                </label>

                {/* Toolbar */}
                <div className="editor-toolbar border border-gray-300 rounded-t-lg p-3 bg-gray-50 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => insertTextAtCursor("**Bold Text**")}
                    className="toolbar-btn p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors duration-200"
                    title="Bold"
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertTextAtCursor("*Italic Text*")}
                    className="toolbar-btn p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors duration-200"
                    title="Italic"
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertTextAtCursor("\n## Heading\n")}
                    className="toolbar-btn px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors duration-200"
                    title="Heading"
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    onClick={() => insertTextAtCursor("\n- List item\n")}
                    className="toolbar-btn p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors duration-200"
                    title="List"
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      insertTextAtCursor("[Link Text](https://example.com)")
                    }
                    className="toolbar-btn p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors duration-200"
                    title="Link"
                  >
                    <Link className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertTextAtCursor("\n> Quote text\n")}
                    className="toolbar-btn p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors duration-200"
                    title="Quote"
                  >
                    <Quote className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertTextAtCursor("`code`")}
                    className="toolbar-btn p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors duration-200"
                    title="Code"
                  >
                    <Code className="w-4 h-4" />
                  </button>
                </div>

                <textarea
                  ref={contentRef}
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Write your blog content here... You can use Markdown formatting."
                  rows={20}
                  className="content-textarea w-full px-4 py-4 border-l border-r border-b border-gray-300 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
                  required
                />
                <p className="content-help text-xs text-gray-500 mt-2">
                  Supports Markdown formatting. Use the toolbar buttons for
                  quick formatting.
                </p>
              </div>
            </>
          ) : (
            // Preview Mode
            <div className="preview-section bg-white rounded-lg border border-gray-200 p-6 sm:p-8">
              <div className="preview-content space-y-6">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Featured image"
                    className="preview-image w-full h-64 sm:h-80 object-cover rounded-lg"
                  />
                )}
                <div>
                  <h1 className="preview-title text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                    {formData.title || "Blog Title Preview"}
                  </h1>

                  <div className="preview-content-text text-gray-800 leading-relaxed">
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          renderMarkdown(formData.content) ||
                          '<p class="text-gray-500 italic">Your blog content will appear here...</p>',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Preview Button */}
      <div className="mobile-preview-btn sm:hidden fixed bottom-6 right-6">
        <button
          onClick={handlePreview}
          className="w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors duration-200"
        >
          <Eye className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default EditBlogPost;
import React, { useState, useRef } from 'react'
import { Upload, X, Eye, Save, ArrowLeft, Bold, Italic, List, Link, Quote, Code } from 'lucide-react'

interface BlogFormData {
  title: string
  content: string
  excerpt: string
  category: string
  tags: string[]
  status: 'draft' | 'published' | 'scheduled'
  featured: boolean
  publishDate: string
  metaTitle: string
  metaDescription: string
}

const AddBlogPost: React.FC = () => {
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: [],
    status: 'draft',
    featured: false,
    publishDate: '',
    metaTitle: '',
    metaDescription: ''
  })

  const [featuredImage, setFeaturedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [tagInput, setTagInput] = useState('')
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)

  const categories = [
    'Wellness',
    'Corporate Training',
    'Leadership',
    'Mental Health',
    'Organizational Development',
    'Stress Management',
    'Team Building',
    'Career Development'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFeaturedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setFeaturedImage(null)
    setImagePreview('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleTagAdd = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }))
      }
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const insertTextAtCursor = (text: string) => {
    const textarea = contentRef.current
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const content = formData.content
      const newContent = content.substring(0, start) + text + content.substring(end)
      
      setFormData(prev => ({ ...prev, content: newContent }))
      
      // Reset cursor position
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + text.length, start + text.length)
      }, 0)
    }
  }

  const handleSave = async (status: 'draft' | 'published') => {
    setIsSaving(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const blogData = {
      ...formData,
      status,
      featuredImage
    }
    
    console.log('Saving blog post:', blogData)
    setIsSaving(false)
    
    // Redirect to blog listing
    window.location.href = '/admin/blog'
  }

  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode)
  }

  return (
    <div className="add-blog-post min-h-screen bg-gray-50">
      
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
                  Add New Blog Post
                </h1>
                <p className="blog-page-subtitle text-sm text-gray-600 hidden sm:block">
                  Create and publish your blog content
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
                <span>{isPreviewMode ? 'Edit' : 'Preview'}</span>
              </button>
              
              <button
                onClick={() => handleSave('draft')}
                disabled={isSaving}
                className="save-draft-btn px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
              >
                Save Draft
              </button>
              
              <button
                onClick={() => handleSave('published')}
                disabled={isSaving}
                className="publish-btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 flex items-center space-x-2"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Publish</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="blog-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {!isPreviewMode ? (
              // Edit Mode
              <>
                {/* Blog Title */}
                <div className="title-section bg-white rounded-lg border border-gray-200 p-6">
                  <label htmlFor="title" className="form-label block text-sm font-medium text-gray-700 mb-3">
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
                        src={imagePreview || "/placeholder.svg"}
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
                          {featuredImage?.name} ({Math.round((featuredImage?.size || 0) / 1024)} KB)
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
                  <label htmlFor="content" className="form-label block text-sm font-medium text-gray-700 mb-3">
                    Blog Content *
                  </label>
                  
                  {/* Toolbar */}
                  <div className="editor-toolbar border border-gray-300 rounded-t-lg p-3 bg-gray-50 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => insertTextAtCursor('**Bold Text**')}
                      className="toolbar-btn p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors duration-200"
                      title="Bold"
                    >
                      <Bold className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertTextAtCursor('*Italic Text*')}
                      className="toolbar-btn p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors duration-200"
                      title="Italic"
                    >
                      <Italic className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertTextAtCursor('\n## Heading\n')}
                      className="toolbar-btn px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors duration-200"
                      title="Heading"
                    >
                      H2
                    </button>
                    <button
                      type="button"
                      onClick={() => insertTextAtCursor('\n- List item\n')}
                      className="toolbar-btn p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors duration-200"
                      title="List"
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertTextAtCursor('[Link Text](https://example.com)')}
                      className="toolbar-btn p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors duration-200"
                      title="Link"
                    >
                      <Link className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertTextAtCursor('\n> Quote text\n')}
                      className="toolbar-btn p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors duration-200"
                      title="Quote"
                    >
                      <Quote className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertTextAtCursor('`code`')}
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
                    Supports Markdown formatting. Use the toolbar buttons for quick formatting.
                  </p>
                </div>

                {/* Excerpt */}
                <div className="excerpt-section bg-white rounded-lg border border-gray-200 p-6">
                  <label htmlFor="excerpt" className="form-label block text-sm font-medium text-gray-700 mb-3">
                    Excerpt
                  </label>
                  <textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    placeholder="Write a brief excerpt for your blog post..."
                    rows={3}
                    className="excerpt-textarea w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  <p className="excerpt-help text-xs text-gray-500 mt-2">
                    Brief description that appears in blog listings (optional)
                  </p>
                </div>
              </>
            ) : (
              // Preview Mode
              <div className="preview-section bg-white rounded-lg border border-gray-200 p-6 sm:p-8">
                <div className="preview-content space-y-6">
                  {imagePreview && (
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Featured image"
                      className="preview-image w-full h-64 sm:h-80 object-cover rounded-lg"
                    />
                  )}
                  
                  <div>
                    <h1 className="preview-title text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                      {formData.title || 'Blog Title Preview'}
                    </h1>
                    
                    {formData.excerpt && (
                      <p className="preview-excerpt text-lg text-gray-600 mb-6 italic">
                        {formData.excerpt}
                      </p>
                    )}
                    
                    <div className="preview-content-text text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {formData.content || 'Your blog content will appear here...'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Publish Settings */}
            <div className="publish-settings bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="sidebar-title text-lg font-semibold text-gray-900 mb-4">
                Publish Settings
              </h3>
              
              <div className="space-y-4">
                {/* Status */}
                <div>
                  <label htmlFor="status" className="form-label block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="status-select w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>

                {/* Publish Date */}
                {formData.status === 'scheduled' && (
                  <div>
                    <label htmlFor="publishDate" className="form-label block text-sm font-medium text-gray-700 mb-2">
                      Publish Date
                    </label>
                    <input
                      type="datetime-local"
                      id="publishDate"
                      name="publishDate"
                      value={formData.publishDate}
                      onChange={handleInputChange}
                      className="publish-date-input w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}

                {/* Featured Post */}
                <div className="featured-checkbox flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                    Featured Post
                  </label>
                </div>
              </div>
            </div>

            {/* Category */}
            <div className="category-section bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="sidebar-title text-lg font-semibold text-gray-900 mb-4">
                Category
              </h3>
              
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="category-select w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div className="tags-section bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="sidebar-title text-lg font-semibold text-gray-900 mb-4">
                Tags
              </h3>
              
              <div className="space-y-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagAdd}
                  placeholder="Add tags (press Enter)"
                  className="tag-input w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                
                {formData.tags.length > 0 && (
                  <div className="tags-list flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="tag-item inline-flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        <span>{tag}</span>
                        <button
                          onClick={() => removeTag(tag)}
                          className="tag-remove text-blue-600 hover:text-blue-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* SEO Settings */}
            <div className="seo-section bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="sidebar-title text-lg font-semibold text-gray-900 mb-4">
                SEO Settings
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="metaTitle" className="form-label block text-sm font-medium text-gray-700 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    id="metaTitle"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleInputChange}
                    placeholder="SEO title for search engines"
                    className="meta-title-input w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="metaDescription" className="form-label block text-sm font-medium text-gray-700 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    id="metaDescription"
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleInputChange}
                    placeholder="SEO description for search engines"
                    rows={3}
                    className="meta-description-input w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
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
  )
}

export default AddBlogPost

import React, { useState } from 'react'
import { ArrowLeft, Edit, Trash2, Eye, Share2, Calendar, User, Tag, MessageSquare, Heart, BarChart3, Clock, Globe, Copy, Facebook, Twitter, Linkedin, MoreVertical, Download, Archive } from 'lucide-react'

interface BlogPost {
  id: number
  title: string
  content: string
  excerpt: string
  author: string
  category: string
  tags: string[]
  status: 'published' | 'draft' | 'scheduled'
  publishDate: string
  lastModified: string
  featuredImage: string
  views: number
  likes: number
  comments: number
  shares: number
  featured: boolean
  metaTitle: string
  metaDescription: string
  readingTime: string
  wordCount: number
}

interface Comment {
  id: number
  author: string
  email: string
  content: string
  date: string
  status: 'approved' | 'pending' | 'spam'
  replies?: Comment[]
}

const BlogDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'content' | 'analytics' | 'comments' | 'seo'>('content')
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [showMoreActions, setShowMoreActions] = useState(false)

  // Mock blog post data
  const blogPost: BlogPost = {
    id: 1,
    title: "Corporate Wellness Strategies for Modern Workplaces",
    content: `# Introduction

Corporate wellness has become a cornerstone of modern business strategy, with companies increasingly recognizing that employee well-being directly impacts productivity, retention, and overall business success.

## The Current State of Workplace Wellness

In today's fast-paced business environment, employees face unprecedented levels of stress and burnout. According to recent studies, **78% of employees** report experiencing work-related stress, leading to decreased productivity and increased healthcare costs.

### Key Statistics:
- 67% of employees report feeling burned out
- Companies with wellness programs see 25% reduction in sick leave
- ROI of wellness programs averages $3.27 for every dollar spent

## Implementing Effective Wellness Programs

### 1. Mental Health Support
Providing access to mental health resources is crucial for employee well-being. This includes:
- Employee Assistance Programs (EAPs)
- On-site counseling services
- Stress management workshops
- Mindfulness and meditation programs

### 2. Physical Wellness Initiatives
Physical health directly impacts mental well-being and productivity:
- On-site fitness facilities or gym memberships
- Ergonomic workspace assessments
- Walking meetings and standing desks
- Healthy snack options in the workplace

### 3. Work-Life Balance
Creating boundaries between work and personal life is essential:
- Flexible working hours
- Remote work options
- Paid time off policies
- Family-friendly benefits

## Measuring Success

To ensure your wellness program is effective, track these key metrics:
- Employee engagement scores
- Absenteeism rates
- Healthcare costs
- Employee retention rates
- Productivity measurements

## Conclusion

Investing in employee wellness is not just the right thing to do—it's a smart business decision that pays dividends in improved performance, reduced costs, and enhanced company culture.

*Remember: A healthy workforce is a productive workforce.*`,
    excerpt: "Discover effective strategies for implementing comprehensive wellness programs in your organization that boost employee satisfaction and productivity.",
    author: "Dr. Sarah Johnson",
    category: "Corporate Training",
    tags: ["Wellness", "Corporate", "Employee Health", "Productivity", "Mental Health"],
    status: "published",
    publishDate: "2024-03-20T10:00:00",
    lastModified: "2024-03-21T14:30:00",
    featuredImage: "/blog-hero-image.png",
    views: 2847,
    likes: 156,
    comments: 23,
    shares: 89,
    featured: true,
    metaTitle: "Corporate Wellness Strategies - Boost Employee Health & Productivity",
    metaDescription: "Learn proven corporate wellness strategies that improve employee health, reduce costs, and increase productivity in modern workplaces.",
    readingTime: "8 min read",
    wordCount: 1250
  }

  // Mock comments data
  const comments: Comment[] = [
    {
      id: 1,
      author: "John Smith",
      email: "john@example.com",
      content: "This is an excellent article! We've implemented similar wellness programs at our company and seen great results. The ROI statistics are particularly compelling.",
      date: "2024-03-21T09:15:00",
      status: "approved",
      replies: [
        {
          id: 2,
          author: "Dr. Sarah Johnson",
          email: "sarah@example.com",
          content: "Thank you, John! I'm glad to hear your company has had success with wellness programs. Would love to hear more about your specific initiatives.",
          date: "2024-03-21T10:30:00",
          status: "approved"
        }
      ]
    },
    {
      id: 3,
      author: "Emily Davis",
      email: "emily@example.com",
      content: "Great insights on mental health support. We're looking to implement EAPs at our organization. Any recommendations for providers?",
      date: "2024-03-21T11:45:00",
      status: "approved"
    },
    {
      id: 4,
      author: "Mike Wilson",
      email: "mike@example.com",
      content: "The statistics about burnout are alarming but not surprising. This article provides a good roadmap for addressing these issues.",
      date: "2024-03-21T13:20:00",
      status: "pending"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCommentStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'spam':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleEdit = () => {
    window.location.href = `/admin/blog/edit/${blogPost.id}`
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      console.log('Delete blog post:', blogPost.id)
      window.location.href = '/admin/blog'
    }
  }

  const handleShare = (platform: string) => {
    const url = `${window.location.origin}/blog/${blogPost.id}`
    const title = blogPost.title
    
    let shareUrl = ''
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        alert('Link copied to clipboard!')
        return
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
    setShowShareMenu(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const renderMarkdown = (content: string) => {
    // Simple markdown rendering (in a real app, use a proper markdown parser)
    return content
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-gray-900 mb-4 mt-8">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-gray-900 mb-3 mt-6">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold text-gray-900 mb-2 mt-4">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/^(?!<[h|l])/gm, '<p class="mb-4">')
  }

  return (
    <div className="blog-details min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="blog-header bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.location.href = '/admin/blog'}
                className="back-btn p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="blog-page-title text-lg sm:text-xl font-bold text-gray-900 truncate max-w-xs sm:max-w-md">
                  {blogPost.title}
                </h1>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span className={`status-badge px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(blogPost.status)}`}>
                    {blogPost.status}
                  </span>
                  {blogPost.featured && (
                    <span className="featured-badge px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2">
              
              {/* View Live Button */}
              <a
                href={`/blog/${blogPost.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="view-live-btn hidden sm:flex items-center space-x-2 px-3 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <Globe className="w-4 h-4" />
                <span>View Live</span>
              </a>

              {/* Share Button */}
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="share-btn hidden sm:flex items-center space-x-2 px-3 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>

                {/* Share Menu */}
                {showShareMenu && (
                  <div className="share-menu absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="py-2">
                      <button
                        onClick={() => handleShare('facebook')}
                        className="share-option flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Facebook className="w-4 h-4 text-blue-600" />
                        <span>Facebook</span>
                      </button>
                      <button
                        onClick={() => handleShare('twitter')}
                        className="share-option flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Twitter className="w-4 h-4 text-blue-400" />
                        <span>Twitter</span>
                      </button>
                      <button
                        onClick={() => handleShare('linkedin')}
                        className="share-option flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Linkedin className="w-4 h-4 text-blue-700" />
                        <span>LinkedIn</span>
                      </button>
                      <button
                        onClick={() => handleShare('copy')}
                        className="share-option flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Copy className="w-4 h-4 text-gray-600" />
                        <span>Copy Link</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Edit Button */}
              <button
                onClick={handleEdit}
                className="edit-btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span className="hidden sm:inline">Edit</span>
              </button>

              {/* More Actions */}
              <div className="relative">
                <button
                  onClick={() => setShowMoreActions(!showMoreActions)}
                  className="more-actions-btn p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>

                {/* More Actions Menu */}
                {showMoreActions && (
                  <div className="more-actions-menu absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="py-2">
                      <button className="action-option flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                        <Download className="w-4 h-4" />
                        <span>Export</span>
                      </button>
                      <button className="action-option flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                        <Archive className="w-4 h-4" />
                        <span>Archive</span>
                      </button>
                      <div className="border-t border-gray-200 my-1"></div>
                      <button
                        onClick={handleDelete}
                        className="action-option flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="blog-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            
            {/* Tab Navigation */}
            <div className="tab-navigation bg-white rounded-lg border border-gray-200 mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('content')}
                  className={`tab-btn flex-1 px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                    activeTab === 'content'
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Content
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`tab-btn flex-1 px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                    activeTab === 'analytics'
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Analytics
                </button>
                <button
                  onClick={() => setActiveTab('comments')}
                  className={`tab-btn flex-1 px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                    activeTab === 'comments'
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Comments ({comments.length})
                </button>
                <button
                  onClick={() => setActiveTab('seo')}
                  className={`tab-btn flex-1 px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                    activeTab === 'seo'
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  SEO
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              
              {/* Content Tab */}
              {activeTab === 'content' && (
                <div className="content-tab bg-white rounded-lg border border-gray-200 overflow-hidden">
                  
                  {/* Featured Image */}
                  {blogPost.featuredImage && (
                    <div className="featured-image-container">
                      <img
                        src={blogPost.featuredImage || "/placeholder.svg"}
                        alt={blogPost.title}
                        className="featured-image w-full h-64 sm:h-80 lg:h-96 object-cover"
                      />
                    </div>
                  )}

                  {/* Content Body */}
                  <div className="content-body p-6 sm:p-8 lg:p-10">
                    
                    {/* Title and Meta */}
                    <div className="content-header mb-8">
                      <h1 className="content-title text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                        {blogPost.title}
                      </h1>
                      
                      {blogPost.excerpt && (
                        <p className="content-excerpt text-lg text-gray-600 mb-6 italic leading-relaxed">
                          {blogPost.excerpt}
                        </p>
                      )}

                      <div className="content-meta flex flex-wrap items-center gap-4 text-sm text-gray-600 pb-6 border-b border-gray-200">
                        <div className="meta-item flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>By {blogPost.author}</span>
                        </div>
                        <div className="meta-item flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(blogPost.publishDate)}</span>
                        </div>
                        <div className="meta-item flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{blogPost.readingTime}</span>
                        </div>
                        <div className="meta-item flex items-center space-x-2">
                          <Eye className="w-4 h-4" />
                          <span>{blogPost.views.toLocaleString()} views</span>
                        </div>
                      </div>
                    </div>

                    {/* Article Content */}
                    <div 
                      className="article-content prose prose-lg max-w-none text-gray-800 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(blogPost.content) }}
                    />

                    {/* Tags */}
                    {blogPost.tags.length > 0 && (
                      <div className="content-tags mt-8 pt-6 border-t border-gray-200">
                        <div className="flex items-center space-x-2 mb-3">
                          <Tag className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">Tags:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {blogPost.tags.map((tag) => (
                            <span
                              key={tag}
                              className="tag-item px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Analytics Tab */}
              {activeTab === 'analytics' && (
                <div className="analytics-tab space-y-6">
                  
                  {/* Stats Cards */}
                  <div className="stats-grid grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="stat-card bg-white rounded-lg border border-gray-200 p-6">
                      <div className="flex items-center space-x-3">
                        <div className="stat-icon w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Eye className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="stat-value text-2xl font-bold text-gray-900">
                            {blogPost.views.toLocaleString()}
                          </p>
                          <p className="stat-label text-sm text-gray-600">Views</p>
                        </div>
                      </div>
                    </div>

                    <div className="stat-card bg-white rounded-lg border border-gray-200 p-6">
                      <div className="flex items-center space-x-3">
                        <div className="stat-icon w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <Heart className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <p className="stat-value text-2xl font-bold text-gray-900">
                            {blogPost.likes}
                          </p>
                          <p className="stat-label text-sm text-gray-600">Likes</p>
                        </div>
                      </div>
                    </div>

                    <div className="stat-card bg-white rounded-lg border border-gray-200 p-6">
                      <div className="flex items-center space-x-3">
                        <div className="stat-icon w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <MessageSquare className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="stat-value text-2xl font-bold text-gray-900">
                            {blogPost.comments}
                          </p>
                          <p className="stat-label text-sm text-gray-600">Comments</p>
                        </div>
                      </div>
                    </div>

                    <div className="stat-card bg-white rounded-lg border border-gray-200 p-6">
                      <div className="flex items-center space-x-3">
                        <div className="stat-icon w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Share2 className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="stat-value text-2xl font-bold text-gray-900">
                            {blogPost.shares}
                          </p>
                          <p className="stat-label text-sm text-gray-600">Shares</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Analytics Chart Placeholder */}
                  <div className="analytics-chart bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="chart-title text-lg font-semibold text-gray-900 mb-4">
                      Views Over Time
                    </h3>
                    <div className="chart-placeholder h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">Analytics chart would go here</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Comments Tab */}
              {activeTab === 'comments' && (
                <div className="comments-tab bg-white rounded-lg border border-gray-200">
                  <div className="comments-header p-6 border-b border-gray-200">
                    <h3 className="comments-title text-lg font-semibold text-gray-900">
                      Comments ({comments.length})
                    </h3>
                  </div>
                  
                  <div className="comments-list">
                    {comments.map((comment) => (
                      <div key={comment.id} className="comment-item p-6 border-b border-gray-200 last:border-b-0">
                        <div className="comment-header flex items-start justify-between mb-3">
                          <div className="comment-author-info">
                            <h4 className="comment-author text-sm font-medium text-gray-900">
                              {comment.author}
                            </h4>
                            <p className="comment-email text-xs text-gray-600">
                              {comment.email}
                            </p>
                            <p className="comment-date text-xs text-gray-500">
                              {formatDate(comment.date)}
                            </p>
                          </div>
                          <span className={`comment-status px-2 py-1 rounded-full text-xs font-medium ${getCommentStatusColor(comment.status)}`}>
                            {comment.status}
                          </span>
                        </div>
                        
                        <div className="comment-content text-sm text-gray-800 mb-3">
                          {comment.content}
                        </div>
                        
                        <div className="comment-actions flex items-center space-x-4 text-xs">
                          <button className="comment-action text-blue-600 hover:text-blue-700">
                            Reply
                          </button>
                          <button className="comment-action text-green-600 hover:text-green-700">
                            Approve
                          </button>
                          <button className="comment-action text-red-600 hover:text-red-700">
                            Delete
                          </button>
                        </div>

                        {/* Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="comment-replies ml-8 mt-4 space-y-4">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="reply-item p-4 bg-gray-50 rounded-lg">
                                <div className="reply-header flex items-start justify-between mb-2">
                                  <div>
                                    <h5 className="reply-author text-sm font-medium text-gray-900">
                                      {reply.author}
                                    </h5>
                                    <p className="reply-date text-xs text-gray-500">
                                      {formatDate(reply.date)}
                                    </p>
                                  </div>
                                </div>
                                <div className="reply-content text-sm text-gray-800">
                                  {reply.content}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SEO Tab */}
              {activeTab === 'seo' && (
                <div className="seo-tab bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="seo-title text-lg font-semibold text-gray-900 mb-6">
                    SEO Information
                  </h3>
                  
                  <div className="seo-content space-y-6">
                    <div className="seo-field">
                      <label className="seo-label block text-sm font-medium text-gray-700 mb-2">
                        Meta Title
                      </label>
                      <div className="seo-value p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <p className="text-sm text-gray-900">
                          {blogPost.metaTitle || 'No meta title set'}
                        </p>
                      </div>
                    </div>

                    <div className="seo-field">
                      <label className="seo-label block text-sm font-medium text-gray-700 mb-2">
                        Meta Description
                      </label>
                      <div className="seo-value p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <p className="text-sm text-gray-900">
                          {blogPost.metaDescription || 'No meta description set'}
                        </p>
                      </div>
                    </div>

                    <div className="seo-field">
                      <label className="seo-label block text-sm font-medium text-gray-700 mb-2">
                        URL Slug
                      </label>
                      <div className="seo-value p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <p className="text-sm text-gray-900">
                          /blog/{blogPost.id}
                        </p>
                      </div>
                    </div>

                    <div className="seo-stats grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="seo-stat">
                        <label className="seo-label block text-sm font-medium text-gray-700 mb-2">
                          Word Count
                        </label>
                        <div className="seo-value p-3 bg-gray-50 border border-gray-200 rounded-lg">
                          <p className="text-sm text-gray-900">
                            {blogPost.wordCount} words
                          </p>
                        </div>
                      </div>

                      <div className="seo-stat">
                        <label className="seo-label block text-sm font-medium text-gray-700 mb-2">
                          Reading Time
                        </label>
                        <div className="seo-value p-3 bg-gray-50 border border-gray-200 rounded-lg">
                          <p className="text-sm text-gray-900">
                            {blogPost.readingTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Post Info */}
            <div className="post-info bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="sidebar-title text-lg font-semibold text-gray-900 mb-4">
                Post Information
              </h3>
              
              <div className="post-info-content space-y-4">
                <div className="info-item">
                  <label className="info-label text-sm font-medium text-gray-700">Status</label>
                  <span className={`status-badge inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(blogPost.status)}`}>
                    {blogPost.status}
                  </span>
                </div>

                <div className="info-item">
                  <label className="info-label text-sm font-medium text-gray-700">Category</label>
                  <p className="info-value text-sm text-gray-900 mt-1">{blogPost.category}</p>
                </div>

                <div className="info-item">
                  <label className="info-label text-sm font-medium text-gray-700">Author</label>
                  <p className="info-value text-sm text-gray-900 mt-1">{blogPost.author}</p>
                </div>

                <div className="info-item">
                  <label className="info-label text-sm font-medium text-gray-700">Published</label>
                  <p className="info-value text-sm text-gray-900 mt-1">{formatDate(blogPost.publishDate)}</p>
                </div>

                <div className="info-item">
                  <label className="info-label text-sm font-medium text-gray-700">Last Modified</label>
                  <p className="info-value text-sm text-gray-900 mt-1">{formatDate(blogPost.lastModified)}</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="quick-stats bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="sidebar-title text-lg font-semibold text-gray-900 mb-4">
                Quick Stats
              </h3>
              
              <div className="stats-content space-y-3">
                <div className="stat-row flex items-center justify-between">
                  <span className="stat-name text-sm text-gray-600">Views</span>
                  <span className="stat-number text-sm font-medium text-gray-900">{blogPost.views.toLocaleString()}</span>
                </div>
                <div className="stat-row flex items-center justify-between">
                  <span className="stat-name text-sm text-gray-600">Likes</span>
                  <span className="stat-number text-sm font-medium text-gray-900">{blogPost.likes}</span>
                </div>
                <div className="stat-row flex items-center justify-between">
                  <span className="stat-name text-sm text-gray-600">Comments</span>
                  <span className="stat-number text-sm font-medium text-gray-900">{blogPost.comments}</span>
                </div>
                <div className="stat-row flex items-center justify-between">
                  <span className="stat-name text-sm text-gray-600">Shares</span>
                  <span className="stat-number text-sm font-medium text-gray-900">{blogPost.shares}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="sidebar-title text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              
              <div className="actions-content space-y-3">
                <button
                  onClick={handleEdit}
                  className="action-btn w-full flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Post</span>
                </button>
                
                <a
                  href={`/blog/${blogPost.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn w-full flex items-center space-x-2 px-4 py-2 text-green-600 border border-green-200 rounded-lg hover:bg-green-50 transition-colors duration-200"
                >
                  <Globe className="w-4 h-4" />
                  <span>View Live</span>
                </a>
                
                <button
                  onClick={handleDelete}
                  className="action-btn w-full flex items-center space-x-2 px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Post</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogDetails

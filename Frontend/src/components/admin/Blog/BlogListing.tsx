import React, { useState } from 'react'
import { Eye, Edit, Trash2, Plus, Search, Filter, MoreVertical, Calendar, User, Tag } from 'lucide-react'

interface BlogPost {
  id: number
  title: string
  author: string
  category: string
  status: 'published' | 'draft' | 'scheduled'
  publishDate: string
  views: number
  comments: number
  featured: boolean
}

const BlogListing: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPosts, setSelectedPosts] = useState<number[]>([])

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Miracle no-knead bread",
      author: "Admin",
      category: "Wellness",
      status: "published",
      publishDate: "2024-03-23",
      views: 1250,
      comments: 15,
      featured: true
    },
    {
      id: 2,
      title: "Corporate Wellness Strategies for Modern Workplaces",
      author: "Dr. Sarah Johnson",
      category: "Corporate Training",
      status: "published",
      publishDate: "2024-03-20",
      views: 890,
      comments: 8,
      featured: false
    },
    {
      id: 3,
      title: "Leadership in Remote Teams: Best Practices",
      author: "Michael Chen",
      category: "Leadership",
      status: "draft",
      publishDate: "2024-03-18",
      views: 0,
      comments: 0,
      featured: false
    },
    {
      id: 4,
      title: "Stress Management Techniques for Busy Professionals",
      author: "Admin",
      category: "Mental Health",
      status: "scheduled",
      publishDate: "2024-03-25",
      views: 0,
      comments: 0,
      featured: true
    },
    {
      id: 5,
      title: "Building Resilience in Organizational Change",
      author: "Dr. Sarah Johnson",
      category: "Organizational Development",
      status: "published",
      publishDate: "2024-03-15",
      views: 2100,
      comments: 23,
      featured: false
    },
    {
      id: 6,
      title: "The Future of Employee Mental Health Programs",
      author: "Michael Chen",
      category: "Mental Health",
      status: "draft",
      publishDate: "2024-03-22",
      views: 0,
      comments: 0,
      featured: false
    }
  ]

  const postsPerPage = 10
  const totalPages = Math.ceil(blogPosts.length / postsPerPage)

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

  const handleSelectPost = (postId: number) => {
    setSelectedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }

  const handleSelectAll = () => {
    if (selectedPosts.length === blogPosts.length) {
      setSelectedPosts([])
    } else {
      setSelectedPosts(blogPosts.map(post => post.id))
    }
  }

  const handleViewPost = (postId: number) => {
    // Redirect to blog post details page
    window.location.href = `/admin/blog/${postId}`
  }

  const handleEditPost = (postId: number) => {
    // Redirect to blog post edit page
    window.location.href = `/admin/blog/edit/${postId}`
  }

  const handleDeletePost = (postId: number) => {
    // Handle delete functionality
    if (confirm('Are you sure you want to delete this blog post?')) {
      console.log('Delete post:', postId)
    }
  }

  return (
    <div className="blog-listing p-6 space-y-6">
      
      {/* Page Header */}
      <div className="blog-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="blog-title text-2xl sm:text-3xl font-bold text-gray-900">
            Blog Posts
          </h1>
          <p className="blog-subtitle text-gray-600 mt-1">
            Manage your blog content and articles
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="add-post-btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center space-x-2 transition-colors duration-200">
            <Plus className="w-4 h-4" />
            <span>Add New Post</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="blog-filters bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          
          {/* Search */}
          <div className="search-container flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="filter-container">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="status-filter px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>

          {/* Filter Button */}
          <button className="filter-btn px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Blog Posts Table */}
      <div className="blog-table-container bg-white rounded-lg border border-gray-200 overflow-hidden">
        
        {/* Table Header */}
        <div className="table-header bg-gray-50 border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedPosts.length === blogPosts.length}
                onChange={handleSelectAll}
                className="checkbox w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                {selectedPosts.length > 0 ? `${selectedPosts.length} selected` : 'Select all'}
              </span>
            </div>
            
            {selectedPosts.length > 0 && (
              <div className="bulk-actions flex items-center space-x-2">
                <button className="bulk-action-btn px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors duration-200">
                  Delete Selected
                </button>
                <button className="bulk-action-btn px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors duration-200">
                  Bulk Edit
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Table Content */}
        <div className="table-content">
          {/* Desktop Table */}
          <div className="hidden lg:block">
            <table className="blog-table w-full">
              <thead className="table-head bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="table-header-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedPosts.length === blogPosts.length}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </th>
                  <th className="table-header-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="table-header-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="table-header-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="table-header-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="table-header-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="table-header-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="table-header-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="table-body bg-white divide-y divide-gray-200">
                {blogPosts.map((post) => (
                  <tr key={post.id} className="table-row hover:bg-gray-50 transition-colors duration-200">
                    <td className="table-cell px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedPosts.includes(post.id)}
                        onChange={() => handleSelectPost(post.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </td>
                    <td className="table-cell px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="post-title text-sm font-medium text-gray-900 line-clamp-2">
                            {post.title}
                          </div>
                          {post.featured && (
                            <span className="featured-badge inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="table-cell px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{post.author}</span>
                      </div>
                    </td>
                    <td className="table-cell px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Tag className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{post.category}</span>
                      </div>
                    </td>
                    <td className="table-cell px-6 py-4 whitespace-nowrap">
                      <span className={`status-badge inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(post.status)}`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="table-cell px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{post.publishDate}</span>
                      </div>
                    </td>
                    <td className="table-cell px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div>{post.views.toLocaleString()} views</div>
                        <div className="text-xs text-gray-500">{post.comments} comments</div>
                      </div>
                    </td>
                    <td className="table-cell px-6 py-4 whitespace-nowrap">
                      <div className="action-buttons flex items-center space-x-2">
                        <button
                          onClick={() => handleViewPost(post.id)}
                          className="action-btn p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                          title="View Post"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditPost(post.id)}
                          className="action-btn p-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                          title="Edit Post"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="action-btn p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                          title="Delete Post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4 p-4">
            {blogPosts.map((post) => (
              <div key={post.id} className="mobile-card bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <input
                      type="checkbox"
                      checked={selectedPosts.includes(post.id)}
                      onChange={() => handleSelectPost(post.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                    />
                    <div className="flex-1">
                      <h3 className="post-title text-sm font-medium text-gray-900 line-clamp-2">
                        {post.title}
                      </h3>
                      {post.featured && (
                        <span className="featured-badge inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                  <button className="more-btn p-1 text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="mobile-meta grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div className="flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Tag className="w-3 h-3" />
                    <span>{post.category}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{post.publishDate}</span>
                  </div>
                  <div>
                    <span>{post.views} views</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`status-badge inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(post.status)}`}>
                    {post.status}
                  </span>
                  
                  <div className="action-buttons flex items-center space-x-2">
                    <button
                      onClick={() => handleViewPost(post.id)}
                      className="action-btn p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                      title="View Post"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditPost(post.id)}
                      className="action-btn p-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                      title="Edit Post"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="action-btn p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                      title="Delete Post"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="pagination-container border-t border-gray-200 bg-gray-50 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="pagination-info text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{Math.min(postsPerPage, blogPosts.length)}</span> of{' '}
              <span className="font-medium">{blogPosts.length}</span> results
            </div>
            
            <div className="pagination-controls flex items-center space-x-2">
              <button
                disabled={currentPage === 1}
                className="pagination-btn px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Previous
              </button>
              
              <div className="pagination-numbers flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`pagination-number w-8 h-8 text-sm rounded-md transition-colors duration-200 ${
                      currentPage === page
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                disabled={currentPage === totalPages}
                className="pagination-btn px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogListing

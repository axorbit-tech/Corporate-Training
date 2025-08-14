import React, { useEffect, useState } from 'react'
import { Eye, Edit, Trash2, Plus, Search } from 'lucide-react'
import { useGetBlogsQuery, useDeleteBlogMutation } from '../../../store/slices/apiSlice'
import { useNavigate } from 'react-router-dom'
import CustomModal from '../common/CustomeModal'
import { toast } from 'react-toastify'

interface BlogPost {
  _id: string
  title: string
  content: string
  createdAt: string
}

const BlogListing: React.FC = () => {

  const navigate = useNavigate()
  const { data: getBlogs, isLoading, isError, refetch } = useGetBlogsQuery(undefined)
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation()
  const [open, setOpen] = useState(false);

  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPosts, setSelectedPosts] = useState<string[]>([])
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null)

  const postsPerPage = 10

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // ✅ Sync blogs when API data updates
  useEffect(() => {
    if (getBlogs?.data) {
      setBlogs(getBlogs.data)
    }
  }, [getBlogs])

  if (isLoading) return <p>Loading blogs...</p>
  if (isError) return <p>Failed to load blogs</p>

  const totalPages = Math.ceil(blogs.length / postsPerPage)

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const currentPosts = filteredBlogs.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)

  const handleSelectPost = (postId: string) => {
    setSelectedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }

  const handleSelectAll = () => {
    if (selectedPosts.length === blogs.length) {
      setSelectedPosts([])
    } else {
      setSelectedPosts(blogs.map(post => post._id))
    }
  }

  const handleViewPost = (postId: string) => {
    navigate(`/admin/blog-details/${postId}`)
  }

  const handleEditPost = (postId: string) => {
    window.location.href = `/admin/blog/edit/${postId}`
  }


  const handleDeletePost = (postId: string) => {
    setSelectedBlogId(postId)
    setOpen(true)
  }

  const handleConfirmDelete = async (selectedBlogId: string) => {
    try {
      await deleteBlog(selectedBlogId).unwrap()
      refetch()
      toast.success('Blog deleted successfully')
      setOpen(false)
    } catch (error) {
      toast.error('Failed to delete blog')
      console.error('Error deleting blog:', error)
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Blog Posts</h1>
          <p className="text-gray-600 mt-1">Manage your blog content</p>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add New Post</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="all">All</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedPosts.length === blogs.length}
                  onChange={handleSelectAll}
                  className="w-4 h-4"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((post) => (
              <tr key={post._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedPosts.includes(post._id)}
                    onChange={() => handleSelectPost(post._id)}
                    className="w-4 h-4"
                  />
                </td>
                <td className="px-6 py-4">{post.title}</td>
                <td className="admin-table-cell px-6 py-4 whitespace-nowrap">
                  <span
                    className={`admin-status-badge inline-flex px-2 py-1 text-xs font-semibold cursor-pointer rounded-full ${getStatusColor("active")}`}
                  >
                    {'posted'}
                  </span>
                </td>
                <td className="px-6 py-4">{new Date(post.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 flex space-x-2">
                  <button onClick={() => handleViewPost(post._id)} className="text-blue-600"><Eye size={16} /></button>
                  <button onClick={() => handleEditPost(post._id)} className="text-gray-600"><Edit size={16} /></button>
                  <button onClick={() => handleDeletePost(post._id)} className="text-red-600"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="admin-pagination-container border-t border-gray-200 bg-gray-50 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="admin-pagination-info text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">{Math.min(postsPerPage ?? 0, blogs?.length ?? 0)}</span> of{" "}
            <span className="font-medium">{blogs?.length}</span> results
          </div>

          <div className="admin-pagination-controls flex items-center space-x-2">
            <button
              disabled={currentPage === 1}
              className="admin-pagination-btn px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Previous
            </button>

            <div className="admin-pagination-numbers flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`admin-pagination-number w-8 h-8 text-sm rounded-md transition-colors duration-200 ${currentPage === page ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              disabled={currentPage === totalPages}
              className="admin-pagination-btn px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <CustomModal
        open={open}
        onClose={() => setOpen(false)}
        title="Are You sure to confirm this action?"
        // description={`This modal works with TypeScript. Service ID: ${selectedServiceId}`}
        size={{ width: 300 }}
        color="#f0f0f0"
        buttonText="OK"
        loading={isDeleting}
        onButtonClick={() => {
          if (selectedBlogId) {
            handleConfirmDelete(selectedBlogId);
          } else {
            toast.error("Something went wrong");
          }
        }}
      />
    </div>
  )
}

export default BlogListing

import React from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import BlogDetails from '../../components/admin/Blog/BlogDetails'

const AdminBlogDetailsPage: React.FC = () => {
  return (
    <AdminLayout>
      <BlogDetails />
    </AdminLayout>
  )
}

export default AdminBlogDetailsPage

import React from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import BlogListing from '../../components/admin/Blog/BlogListing'

const AdminBlogListingPage: React.FC = () => {
  return (
    <AdminLayout>
      <BlogListing />
    </AdminLayout>
  )
}

export default AdminBlogListingPage

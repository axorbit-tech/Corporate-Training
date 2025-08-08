import React from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import AddBlogPost from '../../components/admin/Blog/AddBlog'

const AdminAddBlogPage: React.FC = () => {
  return (
    <AdminLayout>
      <AddBlogPost />
    </AdminLayout>
  )
}

export default AdminAddBlogPage

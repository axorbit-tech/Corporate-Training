import React from 'react'
import AdminLayout from '../../../components/admin/AdminLayout'
import ClientListing from '../../../components/admin/clients/ClientListing'

const AdminClientListingPage: React.FC = () => {
  return (
    <AdminLayout>
      <ClientListing />
    </AdminLayout>
  )
}

export default AdminClientListingPage

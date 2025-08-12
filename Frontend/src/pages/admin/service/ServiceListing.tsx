import React from 'react'
import AdminLayout from '../../../components/admin/AdminLayout'
import ServiceListing from '../../../components/admin/Service/ServiceListing'

const AdminServiceListing: React.FC = () => {
  return (
    <AdminLayout>
      <ServiceListing />
    </AdminLayout>
  )
}

export default AdminServiceListing

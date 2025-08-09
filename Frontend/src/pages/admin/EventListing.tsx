import React from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import EventListing from '../../components/admin/Event/EventListing'

const AdminEventListingPage: React.FC = () => {
  return (
    <AdminLayout>
      <EventListing />
    </AdminLayout>
  )
}

export default AdminEventListingPage

import React from 'react'
import AdminLayout from '../../../components/admin/AdminLayout'
import EventDetails from '../../../components/admin/Event/EventDetails'

const AdminEventDetailsPage: React.FC = () => {
  return (
    <AdminLayout>
      <EventDetails />
    </AdminLayout>
  )
}

export default AdminEventDetailsPage

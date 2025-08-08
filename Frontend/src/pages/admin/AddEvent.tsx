import React from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import AddEvent from '../../components/admin/Event/AddEvent'

const AdminAddEventPage: React.FC = () => {
  return (
    <AdminLayout>
      <AddEvent />
    </AdminLayout>
  )
}

export default AdminAddEventPage

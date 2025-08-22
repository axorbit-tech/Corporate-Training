import type React from "react"
import AdminLayout from "../../../components/admin/AdminLayout"
import UserBookings from "../../../components/admin/booking/UserBookings"

const AdminUserBookingsPage: React.FC = () => {
  return (
    <AdminLayout>
      <UserBookings />
    </AdminLayout>
  )
}

export default AdminUserBookingsPage

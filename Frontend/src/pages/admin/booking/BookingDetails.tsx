import type React from "react"
import AdminLayout from "../../../components/admin/AdminLayout"
import BookingDetails from "../../../components/admin/booking/BookingDetails"

const AdminBookingDetailsPage: React.FC = () => {
  return (
    <AdminLayout>
      <BookingDetails />
    </AdminLayout>
  )
}

export default AdminBookingDetailsPage

import type React from "react"
import AdminLayout from "../../../components/admin/AdminLayout"
import BookingListing from "../../../components/admin/booking/Booking"

const AdminBookingListingPage: React.FC = () => {
  return (
    <AdminLayout>
      <BookingListing />
    </AdminLayout>
  )
}

export default AdminBookingListingPage

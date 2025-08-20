import type React from "react"
import AdminLayout from "../../../components/admin/AdminLayout"
import RequestListing from "../../../components/admin/request/Requests"

const AdminRequestListingPage: React.FC = () => {
  return (
    <AdminLayout>
      <RequestListing />
    </AdminLayout>
  )
}

export default AdminRequestListingPage

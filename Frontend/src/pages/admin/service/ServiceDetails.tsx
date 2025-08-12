import type React from "react"
import AdminLayout from "../../../components/admin/AdminLayout"
import ServiceDetails from "../../../components/admin/Service/ServiceDetails"

const AdminServiceDetailsPage: React.FC = () => {
  return (
    <AdminLayout>
      <ServiceDetails />
    </AdminLayout>
  )
}

export default AdminServiceDetailsPage

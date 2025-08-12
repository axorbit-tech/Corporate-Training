import type React from "react"
import AdminLayout from "../../../components/admin/AdminLayout"
import AddService from "../../../components/admin/Service/AddService"

const AdminAddServicePage: React.FC = () => {
  return (
    <AdminLayout>
      <AddService />
    </AdminLayout>
  )
}

export default AdminAddServicePage

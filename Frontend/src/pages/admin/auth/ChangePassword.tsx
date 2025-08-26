import type React from "react"
import AdminLayout from "../../../components/admin/AdminLayout"
import ChangePassword from "../../../components/admin/auth/ChangePassword"

const AdminChangePasswordPage: React.FC = () => {
  return (
    <AdminLayout>
      <ChangePassword />
    </AdminLayout>
  )
}

export default AdminChangePasswordPage

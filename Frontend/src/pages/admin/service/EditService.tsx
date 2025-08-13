import type React from "react"
import { useParams } from "react-router-dom"
import AdminLayout from "../../../components/admin/AdminLayout"
import EditService from "../../../components/admin/Service/EditService"

const AdminEditServicePage: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-red-600">Service ID is required</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <EditService serviceId={id} />
    </AdminLayout>
  )
}

export default AdminEditServicePage

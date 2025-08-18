import type React from "react"
import { useParams } from "react-router-dom"
import AdminLayout from "../../../components/admin/AdminLayout"
import EditEvent from "../../../components/admin/Event/EditEvent"

const AdminEditEventPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-600 mb-4">Event ID not found</p>
            <button
              onClick={() => window.history.back()}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Go Back
            </button>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <EditEvent eventId={id} />
    </AdminLayout>
  )
}

export default AdminEditEventPage

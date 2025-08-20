import type React from "react"
import AdminLayout from "../../../components/admin/AdminLayout"
import TrainerDetails from "../../../components/admin/trainer/TrainerDetails"

const AdminTrainerDetailsPage: React.FC = () => {
  return (
    <AdminLayout>
      <TrainerDetails />
    </AdminLayout>
  )
}

export default AdminTrainerDetailsPage

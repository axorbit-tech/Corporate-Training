import type React from "react"
import AdminLayout from "../../../components/admin/AdminLayout"
import TrainerListing from "../../../components/admin/trainer/TrainerListing"

const AdminTrainerListingPage: React.FC = () => {
  return (
    <AdminLayout>
      <TrainerListing />
    </AdminLayout>
  )
}

export default AdminTrainerListingPage

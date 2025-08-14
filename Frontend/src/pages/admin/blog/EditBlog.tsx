import React from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import EditBlog from "../../../components/admin/Blog/EditBlog";
import { useParams } from "react-router-dom";

const AdminEditBlogPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-red-600">Service ID is required</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <EditBlog blogId={id} />
    </AdminLayout>
  );
};

export default AdminEditBlogPage;

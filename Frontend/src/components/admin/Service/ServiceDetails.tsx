import type React from "react"
import { ArrowLeft, Eye, Edit, MoreHorizontal, ImageIcon } from "lucide-react"
import { useGetServiceDetailsQuery } from "../../../store/slices/apiSlice"
import { useParams } from "react-router-dom";

type ServiceDetailsParams = {
  id: string;
};

interface Subservice {
  title: string
  content: string
}

// interface ServiceData {
//   _id: string
//   title: string
//   content: string
//   image: string
//   subServices: Subservice[]
//   createdAt: string
//   updatedAt: string
//   status: "active" | "inactive"
// }

interface ServiceDetailsProps {
  serviceId?: string
}

const ServiceDetails: React.FC<ServiceDetailsProps> = () => {

  const { id } = useParams<ServiceDetailsParams>();

  const { data: service, isLoading, error } = useGetServiceDetailsQuery(id)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (isLoading) {
    return (
      <div className="admin-service-details min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading service details...</p>
        </div>
      </div>
    )
  }

  if (error || !service) {
    return (
      <div className="admin-service-details min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading service details</p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-service-details min-h-screen bg-gray-50">
      {/* Header */}
      <div className="admin-service-header bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.history.back()}
                className="admin-back-btn p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="admin-service-page-title text-xl sm:text-2xl font-bold text-gray-900">
                  Service Details
                </h1>
                <div className="flex items-center space-x-2 mt-1">
                  <span
                    className={`admin-status-badge px-2 py-1 text-xs font-medium rounded-full ${
                      service.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {service.status === "active" ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              <button className="admin-action-btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">View Live</span>
              </button>
              <button className="admin-action-btn bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
                <Edit className="w-4 h-4" />
                <span className="hidden sm:inline">Edit</span>
              </button>
              <button className="admin-action-btn bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg transition-colors duration-200">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-service-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-8">
            {/* Service Header Info */}
            <div className="admin-service-info bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="admin-service-title text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {service.title}
              </h2>
            </div>

            {/* Service Image */}
            <div className="admin-service-image-section bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="admin-section-title text-lg font-semibold text-gray-900 mb-4">Service Image</h3>
              <div className="admin-service-image-container rounded-lg overflow-hidden">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="admin-service-image w-full h-64 sm:h-80 object-cover"
                />
              </div>
            </div>

            {/* Service Description */}
            <div className="admin-service-description-section bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="admin-section-title text-lg font-semibold text-gray-900 mb-4">Service Description</h3>
              <div className="admin-service-description text-gray-700 leading-relaxed">
                <p>{service.content}</p>
              </div>
            </div>

            {/* Subservices Section */}
            <div className="admin-subservices-section bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="admin-section-title text-lg font-semibold text-gray-900 mb-6">
                Subservices ({service.subServices?.length || 0})
              </h3>

              {service.subServices && service.subServices.length > 0 ? (
                <div className="space-y-6">
                  {service.subServices.map((subservice: Subservice, index: number) => (
                    <div key={index} className="admin-subservice-card border border-gray-200 rounded-lg p-6">
                      <h4 className="admin-subservice-title text-xl font-semibold text-gray-900 mb-3">
                        {index + 1}. {subservice.title}
                      </h4>
                      <p className="admin-subservice-description text-gray-700 leading-relaxed">{subservice.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="admin-no-subservices text-center py-8">
                  <p className="text-gray-500">No subservices available for this service.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="admin-sidebar-content space-y-6 sticky top-24">
              {/* Service Info Card */}
              <div className="admin-info-card bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="admin-card-title text-lg font-semibold text-gray-900 mb-4">Service Information</h3>
                <div className="admin-info-items space-y-4">
                  <div className="admin-info-item">
                    <span className="admin-info-label text-sm font-medium text-gray-600">Status</span>
                    <span
                      className={`admin-info-value block text-sm font-medium ${
                        service.status === "active" ? "text-green-600" : "text-gray-600"
                      }`}
                    >
                      {service.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="admin-info-item">
                    <span className="admin-info-label text-sm font-medium text-gray-600">Created</span>
                    <span className="admin-info-value block text-sm text-gray-900">
                      {formatDate(service.createdAt)}
                    </span>
                  </div>
                  <div className="admin-info-item">
                    <span className="admin-info-label text-sm font-medium text-gray-600">Last Modified</span>
                    <span className="admin-info-value block text-sm text-gray-900">
                      {formatDate(service.updatedAt)}
                    </span>
                  </div>
                  <div className="admin-info-item">
                    <span className="admin-info-label text-sm font-medium text-gray-600">Subservices</span>
                    <span className="admin-info-value block text-sm text-gray-900">
                      {service.subServices?.length || 0} subservice
                      {(service.subServices?.length || 0) !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="admin-actions-card bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="admin-card-title text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="admin-actions-list space-y-3">
                  <button className="admin-action-item w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200">
                    <Edit className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Edit Service</span>
                  </button>
                  <button className="admin-action-item w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200">
                    <Eye className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">View Live</span>
                  </button>
                  <button className="admin-action-item w-full flex items-center space-x-3 p-3 text-left hover:bg-red-50 rounded-lg transition-colors duration-200 text-red-600">
                    <ImageIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">Delete Service</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceDetails

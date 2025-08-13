import type React from "react"
import { useState } from "react"
import { Eye, Edit, Trash2, Plus, Search, Filter, MoreVertical, Calendar, Tag } from "lucide-react"
import { useGetServicesQuery, useUpdateServiceStatusMutation } from "../../../store/slices/apiSlice"
import { useNavigate } from "react-router-dom"
import CustomModal from "../common/CustomeModal"

interface SubService {
  title: string
  description: string
}

interface Service {
  _id: number
  title: string
  description: string
  image: string
  subServices: SubService[]
  status: "active" | "inactive"
  createdDate: string
  lastModified: string
}

const ServiceListing: React.FC = () => {

  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedServices, setSelectedServices] = useState<number[]>([])
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const [open, setOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);

  const { data: getService, refetch } = useGetServicesQuery(undefined)
  const [changeServiceStatus, { isLoading }] = useUpdateServiceStatusMutation();

  const services = getService?.data

  // const services: Service[] = [
  //   {
  //     id: 1,
  //     title: "Corporate Training Programs",
  //     description: "Comprehensive training solutions for modern businesses",
  //     image: "/corporate-training.png",
  //     subServices: [
  //       { id: 1, title: "Leadership Development", description: "Advanced leadership skills training" },
  //       { id: 2, title: "Team Building", description: "Collaborative team enhancement programs" },
  //       { id: 3, title: "Communication Skills", description: "Professional communication training" },
  //     ],
  //     status: "active",
  //     createdDate: "2024-03-15",
  //     lastModified: "2024-03-20",
  //   },
  //   {
  //     id: 2,
  //     title: "Mental Health & Wellness",
  //     description: "Employee wellness and mental health support services",
  //     image: "/mental-health-service.png",
  //     subServices: [
  //       { id: 4, title: "Stress Management", description: "Techniques for managing workplace stress" },
  //       { id: 5, title: "Mindfulness Training", description: "Mindfulness and meditation programs" },
  //     ],
  //     status: "active",
  //     createdDate: "2024-03-10",
  //     lastModified: "2024-03-18",
  //   },
  //   {
  //     id: 3,
  //     title: "Organizational Development",
  //     description: "Strategic organizational improvement services",
  //     image: "/org-development.png",
  //     subServices: [
  //       { id: 6, title: "Change Management", description: "Managing organizational transitions" },
  //       { id: 7, title: "Culture Assessment", description: "Evaluating and improving company culture" },
  //       { id: 8, title: "Performance Optimization", description: "Enhancing organizational performance" },
  //       { id: 9, title: "Strategic Planning", description: "Long-term strategic development" },
  //     ],
  //     status: "active",
  //     createdDate: "2024-03-12",
  //     lastModified: "2024-03-22",
  //   },
  //   {
  //     id: 4,
  //     title: "Executive Coaching",
  //     description: "One-on-one coaching for senior executives",
  //     image: "/executive-coaching.png",
  //     subServices: [{ id: 10, title: "Leadership Coaching", description: "Personal leadership development" }],
  //     status: "inactive",
  //     createdDate: "2024-03-08",
  //     lastModified: "2024-03-16",
  //   },
  // ]

  const servicesPerPage = 10
  const totalPages = Math.ceil(services?.length / servicesPerPage)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleSelectService = (serviceId: number) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    )
  }

  const handleSelectAll = () => {
    if (selectedServices?.length === services?.length) {
      setSelectedServices([])
    } else {
      setSelectedServices(services.map((service: Service) => service._id))
    }
  }

  const handleViewService = (serviceId: number) => {
    navigate(`/admin/edit-service/${serviceId}`)
  }

  const handleDeleteService = (serviceId: number) => {
    if (confirm("Are you sure you want to delete this service?")) {
      console.log("Delete service:", serviceId)
    }
  }

  const handleToggleStatus = (serviceId: number) => {
    setSelectedServiceId(serviceId);
    setOpen(true); // show modal
  };

  const handleServiceStatus = async (serviceId: number) => {
    try {
      // await new Promise((res) => setTimeout(res, 2000));
      await changeServiceStatus(serviceId).unwrap(); // ✅ unwrap to handle errors properly
      console.log(`Service ${serviceId} deleted successfully`);
      refetch(); // refresh list
      setOpen(false); // close modal
    } catch (error) {
      console.error(`Error deleting service ${serviceId}:`, error);
    }
  };


  const handleEditButton = (id: number)=> {
    navigate(`/admin/edit-service/${id}`)
  }

  return (
    <div className="admin-service-listing p-6 space-y-6">
      {/* Page Header */}
      <div className="admin-service-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="admin-service-title text-2xl sm:text-3xl font-bold text-gray-900">Services</h1>
          <p className="admin-service-subtitle text-gray-600 mt-1">Manage your service offerings and sub-services</p>
        </div>

        <div className="flex items-center space-x-3">
          <button onClick={()=> navigate('/admin/add-service')} className="admin-add-service-btn bg-blue-500 hover:bg-blue-600 text-white cursor-pointer px-4 py-2 rounded-lg font-medium text-sm flex items-center space-x-2 transition-colors duration-200">
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="admin-service-filters bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="admin-search-container flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="admin-filter-container">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="admin-status-filter px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          {/* Filter Button */}
          <button className="admin-filter-btn px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Services Table */}
      <div className="admin-service-table-container bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="admin-table-header bg-gray-50 border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedServices?.length === services?.length}
                onChange={handleSelectAll}
                className="admin-checkbox w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                {selectedServices?.length > 0 ? `${selectedServices?.length} selected` : "Select all"}
              </span>
            </div>

            {selectedServices?.length > 0 && (
              <div className="admin-bulk-actions flex items-center space-x-2">
                <button className="admin-bulk-action-btn px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors duration-200">
                  Delete Selected
                </button>
                <button className="admin-bulk-action-btn px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors duration-200">
                  Bulk Edit
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Table Content */}
        <div className="admin-table-content">
          {/* Desktop Table */}
          <div className="hidden lg:block">
            <table className="admin-service-table w-full">
              <thead className="admin-table-head bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="admin-table-header-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedServices?.length === services?.length}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </th>
                  <th className="admin-table-header-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="admin-table-header-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="admin-table-header-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sub Services
                  </th>
                  <th className="admin-table-header-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="admin-table-header-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="admin-table-body bg-white divide-y divide-gray-200">
                {services?.map((service: Service) => (
                  <tr key={service._id} className="admin-table-row hover:bg-gray-50 transition-colors duration-200">
                    <td className="admin-table-cell px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service._id)}
                        onChange={() => handleSelectService(service._id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </td>
                    <td className="admin-table-cell px-6 py-4 whitespace-nowrap">
                      <div className="admin-service-image-container w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
                        <img
                          src={service.image || "/placeholder.svg?height=48&width=48&query=service"}
                          alt={service.title}
                          className="admin-service-image w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="admin-table-cell px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="admin-service-title text-sm font-medium text-gray-900 line-clamp-2">
                            {service.title}
                          </div>
                          <div className="admin-service-description text-xs text-gray-500 line-clamp-1 mt-1">
                            {service.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="admin-table-cell px-6 py-4 whitespace-nowrap">
                      <div
                        className="admin-subservices-count relative"
                        onMouseEnter={() => setHoveredService(service._id)}
                        onMouseLeave={() => setHoveredService(null)}
                      >
                        <span className="text-sm text-blue-600 cursor-pointer hover:text-blue-800 font-medium">
                          {service.subServices.length} sub-service{service.subServices.length !== 1 ? "s" : ""}
                        </span>

                        {/* Hover Dropdown */}
                        {hoveredService === service._id && service.subServices.length > 0 && (
                          <div className="admin-subservices-dropdown absolute z-10 top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-3">
                            <div className="text-xs font-medium text-gray-700 mb-2">Sub Services:</div>
                            <div className="space-y-1">
                              {service.subServices.map((subService, index) => (
                                <div
                                  key={index}
                                  className="text-xs text-gray-600 py-1 border-b border-gray-100 last:border-b-0"
                                >
                                  <div className="font-medium">{subService.title}</div>
                                  <div className="text-gray-500 line-clamp-1">{subService.description}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="admin-table-cell px-6 py-4 whitespace-nowrap">
                      <span
                        className={`admin-status-badge inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(service.status)}`}
                        onClick={() => handleToggleStatus(service._id)}
                      >
                        {service.status}
                      </span>
                    </td>
                    <td className="admin-table-cell px-6 py-4 whitespace-nowrap">
                      <div className="admin-action-buttons flex items-center space-x-2">
                        <button
                          onClick={() => navigate(`/admin/service-details/${service._id}`)}
                          className="admin-action-btn p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                          title="View Service"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={()=> handleEditButton(service._id)}
                          className="admin-action-btn p-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                          title="Edit Service"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteService(service._id)}
                          className="admin-action-btn p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                          title="Delete Service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4 p-4">
            {services?.map((service: Service) => (
              <div
                key={service._id}
                className="admin-mobile-card bg-white border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service._id)}
                      onChange={() => handleSelectService(service._id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                    />
                    <div className="admin-mobile-service-image-container w-12 h-12 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                      <img
                        src={service.image || "/placeholder.svg?height=48&width=48&query=service"}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="admin-mobile-service-title text-sm font-medium text-gray-900 line-clamp-2">
                        {service.title}
                      </h3>
                      <p className="admin-mobile-service-description text-xs text-gray-500 line-clamp-1 mt-1">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <button className="admin-more-btn p-1 text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                <div className="admin-mobile-meta grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Tag className="w-3 h-3" />
                    <span>{service.subServices.length} sub-services</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{service.lastModified}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`admin-mobile-status-badge inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(service.status)}`}
                  >
                    {service.status}
                  </span>

                  <div className="admin-mobile-action-buttons flex items-center space-x-2">
                    <button
                      onClick={() => handleViewService(service._id)}
                      className="admin-mobile-action-btn p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                      title="View Service"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={()=> handleEditButton(service._id)}
                      className="admin-mobile-action-btn p-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                      title="Edit Service"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteService(service._id)}
                      className="admin-mobile-action-btn p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                      title="Delete Service"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="admin-pagination-container border-t border-gray-200 bg-gray-50 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="admin-pagination-info text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{Math.min(servicesPerPage ?? 0, services?.length ?? 0)}</span> of{" "}
              <span className="font-medium">{services?.length}</span> results
            </div>

            <div className="admin-pagination-controls flex items-center space-x-2">
              <button
                disabled={currentPage === 1}
                className="admin-pagination-btn px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Previous
              </button>

              <div className="admin-pagination-numbers flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`admin-pagination-number w-8 h-8 text-sm rounded-md transition-colors duration-200 ${currentPage === page ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                disabled={currentPage === totalPages}
                className="admin-pagination-btn px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Next
              </button>
            </div>
          </div>
        </div>


        {/* Custome Modal */}
        <CustomModal
          open={open}
          onClose={() => setOpen(false)}
          title="Are You sure to confirm this action?"
          // description={`This modal works with TypeScript. Service ID: ${selectedServiceId}`}
          size={{ width: 300 }}
          color="#f0f0f0"
          buttonText="OK"
          loading={isLoading}
          onButtonClick={() => {
            if (selectedServiceId) {
              handleServiceStatus(selectedServiceId);
            }else{
              alert('Unable to perorm this action')
            }
          }}
        />

      </div>
    </div>
  )
}

export default ServiceListing

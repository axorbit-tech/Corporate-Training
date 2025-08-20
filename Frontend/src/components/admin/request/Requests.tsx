import type React from "react";
import { useEffect, useState } from "react";
import { Search, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetRequestesQuery } from "../../../store/slices/apiSlice";
import type { ITrainer } from "../../../types/types";
import { generateAvatar } from "../../../utils/generateAvatar";

const RequestListing: React.FC = () => {
  const { data: requestesResponse } = useGetRequestesQuery(undefined);

  console.log("requestResponsesss",requestesResponse)

  const [requests, setRequests] = useState<ITrainer[]>([]);

  useEffect(() => {
    setRequests(requestesResponse?.data);
  }, [requestesResponse]);

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Get initials from name
  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Filter requests
  const filteredRequests = requests.filter((request: ITrainer) => {
    const matchesSearch =
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.designation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredRequests?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRequests = filteredRequests?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleView = (id: number) => {
    navigate(`/admin/trainer-details/${id}`)
  };

  return (
    <div className="admin-request-listing min-h-screen bg-gray-50">
      {/* Header */}
      <div className="admin-request-header bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="admin-request-page-title text-xl sm:text-2xl font-bold text-gray-900">
                Requests
              </h1>
              <p className="admin-request-page-subtitle text-sm text-gray-600 hidden sm:block">
                Manage and review all incoming requests
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-request-filters bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="admin-search-container relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-search-input w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="admin-status-filter px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="admin-request-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Desktop Table */}
        <div className="admin-request-table-container hidden md:block bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="admin-request-table w-full">
            <thead className="admin-request-table-header bg-gray-50">
              <tr>
                <th className="admin-table-header-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requester
                </th>
                <th className="admin-table-header-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="admin-table-header-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Designation
                </th>
                <th className="admin-table-header-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="admin-request-table-body bg-white divide-y divide-gray-200">
              {paginatedRequests?.map((request) => (
                <tr
                  key={request._id}
                  className="admin-request-table-row hover:bg-gray-50"
                >
                  <td className="admin-table-cell px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className={`admin-request-avatar w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm ${generateAvatar(
                          request.name
                        )}`}
                      >
                        {getInitials(request.name)}
                      </div>
                      <div className="ml-4">
                        <div className="admin-request-name text-sm font-medium text-gray-900">
                          {request.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="admin-table-cell px-6 py-4 whitespace-nowrap">
                    <div className="admin-request-email text-sm text-gray-900">
                      {request.email}
                    </div>
                  </td>
                  <td className="admin-table-cell px-6 py-4 whitespace-nowrap">
                    <div className="admin-request-designation text-sm text-gray-900">
                      {request.designation}
                    </div>
                  </td>
                  <td className="admin-table-cell px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() =>
                        navigate(`/admin/trainer-details/${request._id}`)
                      }
                      className="admin-view-btn text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="admin-request-cards md:hidden space-y-4">
          {paginatedRequests?.map((request) => (
            <div
              key={request._id}
              className="admin-request-card bg-white rounded-lg border border-gray-200 p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`admin-request-avatar w-12 h-12 rounded-full flex items-center justify-center text-white font-medium ${generateAvatar(
                      request.name
                    )}`}
                  >
                    {getInitials(request.name)}
                  </div>
                  <div>
                    <h3 className="admin-request-name text-sm font-medium text-gray-900">
                      {request.name}
                    </h3>
                    <p className="admin-request-email text-sm text-gray-600">
                      {request.email}
                    </p>
                    <p className="admin-request-designation text-sm text-gray-600">
                      {request.designation}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <button
                    onClick={() => handleView(request._id)}
                    className="admin-view-btn text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="admin-request-pagination flex items-center justify-between mt-6">
            <div className="admin-pagination-info text-sm text-gray-700">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, filteredRequests.length)} of{" "}
              {filteredRequests.length} results
            </div>
            <div className="admin-pagination-controls flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="admin-pagination-btn p-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="admin-pagination-current px-3 py-1 text-sm font-medium">
                {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="admin-pagination-btn p-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestListing;

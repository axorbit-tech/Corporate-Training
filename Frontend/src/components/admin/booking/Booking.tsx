"use client"

import type React from "react"
import { useState } from "react"
import { Search, Filter, MoreHorizontal, Eye, Edit, Trash2, Calendar, Briefcase } from "lucide-react"

interface Booking {
  id: number
  customerName: string
  service: string
  bookingDate: string
  status: "confirmed" | "pending" | "cancelled" | "completed"
  createdAt: string
}

const BookingListing: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedBookings, setSelectedBookings] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Mock data - replace with actual API call
  const mockBookings: Booking[] = [
    {
      id: 1,
      customerName: "John Smith",
      service: "Corporate Training",
      bookingDate: "2024-01-15",
      status: "confirmed",
      createdAt: "2024-01-10",
    },
    {
      id: 2,
      customerName: "Sarah Johnson",
      service: "Leadership Development",
      bookingDate: "2024-01-20",
      status: "pending",
      createdAt: "2024-01-12",
    },
    {
      id: 3,
      customerName: "Michael Brown",
      service: "Team Building Workshop",
      bookingDate: "2024-01-25",
      status: "completed",
      createdAt: "2024-01-08",
    },
    {
      id: 4,
      customerName: "Emily Davis",
      service: "Executive Coaching",
      bookingDate: "2024-01-30",
      status: "cancelled",
      createdAt: "2024-01-14",
    },
    {
      id: 5,
      customerName: "David Wilson",
      service: "Strategic Planning",
      bookingDate: "2024-02-05",
      status: "confirmed",
      createdAt: "2024-01-16",
    },
  ]

  // Filter bookings based on search and status
  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedBookings = filteredBookings.slice(startIndex, startIndex + itemsPerPage)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedBookings(paginatedBookings.map((booking) => booking.id))
    } else {
      setSelectedBookings([])
    }
  }

  const handleSelectBooking = (bookingId: number, checked: boolean) => {
    if (checked) {
      setSelectedBookings([...selectedBookings, bookingId])
    } else {
      setSelectedBookings(selectedBookings.filter((id) => id !== bookingId))
    }
  }

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      confirmed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800",
      completed: "bg-blue-100 text-blue-800",
    }
    return statusStyles[status as keyof typeof statusStyles] || "bg-gray-100 text-gray-800"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="admin-booking-listing min-h-screen bg-gray-50">
      {/* Header */}
      <div className="admin-booking-header bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="admin-booking-page-title text-xl sm:text-2xl font-bold text-gray-900">Bookings</h1>
              <p className="admin-booking-page-subtitle text-sm text-gray-600 hidden sm:block">
                Manage customer bookings and appointments
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="admin-booking-filters bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="admin-search-container relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-search-input w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="admin-filter-container relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="admin-status-filter pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="all">All</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="admin-booking-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Desktop Table View */}
        <div className="admin-booking-table-container hidden md:block bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="admin-booking-table w-full">
            <thead className="admin-booking-table-header bg-gray-50">
              <tr>
                <th className="admin-table-checkbox-header px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedBookings.length === paginatedBookings.length && paginatedBookings.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="admin-select-all-checkbox rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="admin-table-header px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="admin-table-header px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="admin-table-header px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking Date
                </th>
                <th className="admin-table-header px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="admin-table-header px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="admin-booking-table-body bg-white divide-y divide-gray-200">
              {paginatedBookings.map((booking) => (
                <tr key={booking.id} className="admin-booking-row hover:bg-gray-50">
                  <td className="admin-table-checkbox px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedBookings.includes(booking.id)}
                      onChange={(e) => handleSelectBooking(booking.id, e.target.checked)}
                      className="admin-booking-checkbox rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="admin-customer-name px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="admin-customer-avatar w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {booking.customerName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="ml-3">
                        <div className="admin-customer-name-text text-sm font-medium text-gray-900">
                          {booking.customerName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="admin-service-name px-6 py-4 whitespace-nowrap">
                    <div className="admin-service-text text-sm text-gray-900">{booking.service}</div>
                  </td>
                  <td className="admin-booking-date px-6 py-4 whitespace-nowrap">
                    <div className="admin-date-text text-sm text-gray-900">{formatDate(booking.bookingDate)}</div>
                  </td>
                  <td className="admin-booking-status px-6 py-4 whitespace-nowrap">
                    <span
                      className={`admin-status-badge inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(booking.status)}`}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="admin-booking-actions px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="admin-view-btn text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="admin-edit-btn text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="admin-delete-btn text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="admin-booking-cards md:hidden space-y-4">
          {paginatedBookings.map((booking) => (
            <div key={booking.id} className="admin-booking-card bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <input
                    type="checkbox"
                    checked={selectedBookings.includes(booking.id)}
                    onChange={(e) => handleSelectBooking(booking.id, e.target.checked)}
                    className="admin-mobile-checkbox rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="admin-mobile-avatar w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {booking.customerName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="admin-mobile-customer-name text-sm font-medium text-gray-900 truncate">
                      {booking.customerName}
                    </div>
                    <div className="admin-mobile-service text-sm text-gray-600 truncate">
                      <Briefcase className="inline w-3 h-3 mr-1" />
                      {booking.service}
                    </div>
                    <div className="admin-mobile-date text-sm text-gray-600">
                      <Calendar className="inline w-3 h-3 mr-1" />
                      {formatDate(booking.bookingDate)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`admin-mobile-status-badge inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(booking.status)}`}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                  <button className="admin-mobile-more-btn text-gray-400 hover:text-gray-600 p-1">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="admin-booking-pagination flex items-center justify-between mt-6">
            <div className="admin-pagination-info text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredBookings.length)} of{" "}
              {filteredBookings.length} bookings
            </div>
            <div className="admin-pagination-controls flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="admin-prev-btn px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="admin-page-info text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="admin-next-btn px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingListing

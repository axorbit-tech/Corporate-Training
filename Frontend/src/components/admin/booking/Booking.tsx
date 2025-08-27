import type React from "react"
import { useEffect, useState } from "react"
import { Search, Filter, MoreHorizontal, Eye, Trash2, Calendar, Briefcase } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { useGetBookingsQuery, useDeleteBookingMutation } from "../../../store/slices/apiSlice"
import CustomModal from "../common/CustomeModal"
import { toast } from "react-toastify"
import Loader from "../../common/Loader";
import Pagination from "../../pagination";

interface IUser {
  _id: number
  name: string
  email: string
  phone: number
  age: number
  sex: string
}

interface IBooking {
  _id: number
  userId: IUser
  service: string
  date: string
  country: string
  state: string
  status: string
}

const BookingListing: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const filter = params.get("filter") || "all"

  const [open, setOpen] = useState(false)
  const [modalAction, setModalAction] = useState<(() => void) | null>(null)

  const [page, setPage] = useState(1);
  const limit = 10;
  const { data: bookingResponse, isLoading } = useGetBookingsQuery({ filter, page, limit })
  const [deleteBooking, { isLoading: isDeleting }] = useDeleteBookingMutation()

  const [bookings, setBookings] = useState<IBooking[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedBookings, setSelectedBookings] = useState<number[]>([])

  useEffect(() => {
    setBookings(bookingResponse?.data || [])
  }, [bookingResponse, page])

  const pagination = bookingResponse?.pagination;

  if (isLoading && page === 1) return <Loader />;

  // Filter bookings
  const filteredBookings = bookings?.filter((booking) => {
    const matchesSearch =
      booking?.userId?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Handle selection
  const handleSelectBooking = (bookingId: number, checked: boolean) => {
    if (checked) {
      setSelectedBookings([...selectedBookings, bookingId])
    } else {
      setSelectedBookings(selectedBookings.filter((id) => id !== bookingId))
    }
  }

  const handleBookingAction = (bookingId: number) => {
    setModalAction(() => () => handleDeleteBooking(bookingId))
    setOpen(true)
  }

  const handleDeleteBooking = async (bookingId: number) => {
    try {
      const res = await deleteBooking(bookingId).unwrap()
      if (res.success) {
        toast.success("Booking deleted successfully")
        setBookings((prev) => prev.filter((b) => b._id !== bookingId))
        setSelectedBookings((prev) => prev.filter((id) => id !== bookingId))
        setOpen(false)
      }
    } catch (error) {
      toast.error("Failed to delete booking")
      console.error("Delete booking error:", error)
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

  function handleSelectAll(checked: boolean): void {
    setSelectedBookings(
      checked ? filteredBookings.map((booking) => booking._id) : []
    );
  }

  return (
    <div className="admin-booking-listing min-h-screen bg-gray-50">
      {/* Header */}
      <div className="admin-booking-header bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Bookings</h1>
              <p className="text-sm text-gray-600 hidden sm:block">
                Manage customer bookings and appointments
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Desktop Table */}
        {/* Desktop Table with Checkboxes */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      filteredBookings.length > 0 &&
                      selectedBookings.length === filteredBookings.length
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 text-blue-600"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Customer Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Booking Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedBookings.includes(booking._id)}
                      onChange={(e) =>
                        handleSelectBooking(booking._id, e.target.checked)
                      }
                      className="w-4 h-4 text-blue-600"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {booking?.userId?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="ml-3 text-sm font-medium text-gray-900">
                        {booking?.userId?.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {booking.service}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formatDate(booking.date)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                        booking.status
                      )}`}
                    >
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          navigate(`/admin/booking-details/${booking._id}`)
                        }
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleBookingAction(booking._id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

            
          </table>

          {pagination && pagination.pages > 1 && (
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pages}
                onPageChange={setPage}
                onShowLess={() => setPage(1)} // ✅ reset to first page
                isLoading={isLoading && page > 1}
              />
            )}
        </div>


        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {filteredBookings?.map((booking) => (
            <div key={booking._id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <input
                    type="checkbox"
                    checked={selectedBookings.includes(booking._id)}
                    onChange={(e) => handleSelectBooking(booking._id, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {booking?.userId?.name?.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{booking?.userId?.name}</div>
                    <div className="text-sm text-gray-600 truncate">
                      <Briefcase className="inline w-3 h-3 mr-1" />
                      {booking.service}
                    </div>
                    <div className="text-sm text-gray-600">
                      <Calendar className="inline w-3 h-3 mr-1" />
                      {formatDate(booking.date)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(booking.status)}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600 p-1">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Confirmation Modal */}
        <CustomModal
          open={open}
          onClose={() => setOpen(false)}
          title="Are you sure you want to delete this booking?"
          size={{ width: 300 }}
          color="#f0f0f0"
          buttonText="OK"
          loading={isDeleting}
          onButtonClick={() => {
            if (modalAction) modalAction()
            else toast.error("Something went wrong")
          }}
        />
      </div>
    </div>
  )
}

export default BookingListing

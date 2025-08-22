import type React from "react";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { generateAvatar } from "../../../utils/generateAvatar";
import { useGetUserBookingsQuery, useGetUserDetailsQuery } from "../../../store/slices/apiSlice";
import type { IBookingData, IUser } from "../../../types/types";
import { useNavigate } from "react-router-dom";

const UserBookings: React.FC = () => {

    const navigate = useNavigate()
  const { id } = useParams();

  const { data: bookingResponse } = useGetUserBookingsQuery(id);
  const { data: userData } = useGetUserDetailsQuery(id);

  const [userBookings, setUserBookings] = useState<IBookingData[]>([]);
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    setUserBookings(bookingResponse?.data);
    setUser(userData?.data);
  }, [bookingResponse, userData]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(userBookings?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBookings = userBookings?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatBookingDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      confirmed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800",
      completed: "bg-blue-100 text-blue-800",
    };
    return (
      statusStyles[status as keyof typeof statusStyles] ||
      "bg-gray-100 text-gray-800"
    );
  };

  const userAvatar = generateAvatar(user?.name || "user");

  return (
    <div className="admin-user-bookings min-h-screen bg-gray-50">
      {/* Header */}
      <div className="admin-user-bookings-header bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.history.back()}
                className="admin-back-btn p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="admin-user-bookings-title text-xl sm:text-2xl font-bold text-gray-900">
                  User Bookings
                </h1>
                <p className="admin-user-bookings-subtitle text-sm text-gray-600 hidden sm:block">
                  View all bookings for this user
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-user-bookings-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Information Card */}
        <div className="admin-user-info-card bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="admin-user-info-title text-lg font-semibold text-gray-900 mb-6">
            User Information
          </h2>
          <div className="flex items-center space-x-6 mb-6">
            <div
              className={`w-16 h-16 ${userAvatar.color} rounded-full flex items-center justify-center text-white text-xl font-bold`}
            >
              {userAvatar.initials}
            </div>
            <div>
              <h3 className="admin-user-name text-2xl font-bold text-gray-900">
                {user?.name}
              </h3>
              <p className="admin-user-email text-gray-600">{user?.email}</p>
              <p className="admin-user-registration text-sm text-gray-500">
                Member since:{" "}
                {user?.createdAt ? formatDate(user?.createdAt) : "not found"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="admin-user-detail flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-500" />
              <div>
                <span className="admin-detail-label text-sm font-medium text-gray-600">
                  Email
                </span>
                <p className="admin-detail-value text-gray-900">
                  {user?.email}
                </p>
              </div>
            </div>
            <div className="admin-user-detail flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-500" />
              <div>
                <span className="admin-detail-label text-sm font-medium text-gray-600">
                  Phone
                </span>
                <p className="admin-detail-value text-gray-900">
                  {user?.phone}
                </p>
              </div>
            </div>
            <div className="admin-user-detail flex items-center space-x-3">
              <User className="w-5 h-5 text-gray-500" />
              <div>
                <span className="admin-detail-label text-sm font-medium text-gray-600">
                  Gender & Age
                </span>
                <p className="admin-detail-value text-gray-900">
                  {user?.gender}, {user?.age} years
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Section */}
        <div className="admin-bookings-section bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="admin-bookings-header px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="admin-bookings-title text-lg font-semibold text-gray-900">
                Booking History ({userBookings?.length})
              </h2>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="admin-bookings-table-container hidden md:block overflow-x-auto">
            <table className="admin-bookings-table w-full">
              <thead className="admin-bookings-table-header bg-gray-50">
                <tr>
                  <th className="admin-table-header px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="admin-table-header px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking Date
                  </th>
                  <th className="admin-table-header px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trainer
                  </th>
                  <th className="admin-table-header px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="admin-table-header px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="admin-bookings-table-body bg-white divide-y divide-gray-200">
                {paginatedBookings?.map((booking) => (
                  <tr
                    key={booking._id}
                    className="admin-booking-row hover:bg-gray-50"
                  >
                    <td className="admin-service-name px-6 py-4">
                      <div className="admin-service-text text-sm font-medium text-gray-900">
                        {booking.service}
                      </div>
                    </td>
                    <td className="admin-booking-date px-6 py-4 whitespace-nowrap">
                      <div className="admin-date-text text-sm text-gray-900">
                        {formatBookingDate(booking?.date)}
                      </div>
                    </td>
                    <td className="admin-trainer-name px-6 py-4 whitespace-nowrap">
                      <div className="admin-trainer-text text-sm text-gray-900">
                        {booking?.trainerId?.name || "Not assigned"}
                      </div>
                    </td>
                    <td className="admin-booking-status px-6 py-4 whitespace-nowrap">
                      <span
                        className={`admin-status-badge inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                          booking?.status
                        )}`}
                      >
                        {booking?.status.charAt(0).toUpperCase() +
                          booking?.status?.slice(1)}
                      </span>
                    </td>
                    <td className="admin-booking-actions px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button onClick={()=> navigate(`/admin/booking-details/${booking?._id}`)} className="admin-view-btn text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50">
                          <Eye className="w-4 h-4" />
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
          <div className="admin-bookings-cards md:hidden">
            {paginatedBookings?.map((booking) => (
              <div
                key={booking._id}
                className="admin-booking-card border-b border-gray-200 p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="admin-mobile-service text-sm font-medium text-gray-900 mb-2">
                      {booking.service}
                    </div>
                    <div className="admin-mobile-details space-y-1">
                      <div className="admin-mobile-date text-sm text-gray-600 flex items-center">
                        <Calendar className="inline w-3 h-3 mr-1" />
                        {formatBookingDate(booking.date)}
                      </div>
                      {booking?.trainerId?.name && (
                        <div className="admin-mobile-trainer text-sm text-gray-600 flex items-center">
                          <User className="inline w-3 h-3 mr-1" />
                          {booking?.trainerId?.name}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`admin-mobile-status-badge inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                        booking.status
                      )}`}
                    >
                      {booking.status.charAt(0).toUpperCase() +
                        booking?.status?.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button className="admin-mobile-view-btn p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="admin-mobile-edit-btn p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="admin-mobile-delete-btn p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="admin-bookings-pagination flex items-center justify-between px-6 py-3 border-t border-gray-200">
              <div className="admin-pagination-info text-sm text-gray-700">
                Showing {startIndex + 1} to{" "}
                {Math.min(startIndex + itemsPerPage, userBookings?.length)} of{" "}
                {userBookings?.length} bookings
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
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
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
    </div>
  );
};

export default UserBookings;

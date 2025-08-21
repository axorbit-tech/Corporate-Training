import type React from "react";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  User,
  Phone,
  Calendar,
  MapPin,
  Search,
  Save,
  Check,
  ChevronDown,
} from "lucide-react";
import { useGetBookingDetailsQuery, useUpdateBookingStatusMutation } from "../../../store/slices/apiSlice";
import { useParams } from "react-router-dom";
import type { IBookingData, ITrainer } from "../../../types/types";
import { generateAvatar } from "../../../utils/generateAvatar";
import { formatDate } from "../../../utils/fomatDate";
import { useGetTrainersQuery } from "../../../store/slices/apiSlice";
import { toast } from "react-toastify";

const BookingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: bookingResponse } = useGetBookingDetailsQuery(id);
  const { data: trainersResponse } = useGetTrainersQuery(undefined);
  const [updateBookingStatus] = useUpdateBookingStatusMutation();


  const [trainers, setTrainers] = useState<ITrainer[]>([])

  const [booking, setBooking] = useState<IBookingData>();

  useEffect(() => {
    setBooking(bookingResponse?.data);
    setTrainers(trainersResponse?.data);
    setSelectedStatus(trainersResponse?.data?.status);
  }, [bookingResponse, trainersResponse]);

  const [selectedTrainerId, setSelectedTrainerId] = useState<string>(
    booking?.trainerId || ""
  );
  const [originalTrainerId] = useState<string>(booking?.trainerId || "");
  const [selectedStatus, setSelectedStatus] = useState<string>(
    booking?.status || "pending"
  );
  const [originalStatus] = useState<string>(booking?.status || "pending");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const hasTrainerChanged = selectedTrainerId !== originalTrainerId;
  const hasStatusChanged = selectedStatus !== originalStatus;
  const hasChanges = hasTrainerChanged || hasStatusChanged;

  const filteredTrainers = trainers?.filter(
    (trainer) =>
      trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedTrainer = trainers?.find(
    (trainer) => trainer._id.toString() === selectedTrainerId
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (hasChanges) {
      const data: { id: string | undefined ; status: string; trainerId?: string } = {
        id,
        status: selectedStatus,
      };
      if (selectedTrainerId) {
        data.trainerId = selectedTrainerId;  // only add if not empty
      }
      const res = await updateBookingStatus(data);
      if (res?.error) {
        console.error("Error updating booking status:", res.error);
        toast.error("Error updating booking status");
      } else {
        toast.success("Booking status updated successfully");
        console.log("Booking status updated successfully");
      }
    }

    console.log("Saving changes:", {
      id,
      trainerId: selectedTrainerId,
      status: selectedStatus,
    });
    setIsSaving(false);
  };

  const statusOptions = [
    {
      value: "pending",
      label: "Pending",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      value: "confirmed",
      label: "Confirmed",
      color: "bg-green-100 text-green-800",
    },
    {
      value: "cancelled",
      label: "Cancelled",
      color: "bg-red-100 text-red-800",
    },
    {
      value: "completed",
      label: "Completed",
      color: "bg-blue-100 text-blue-800",
    },
  ];

  const userAvatar = generateAvatar(booking?.userId?.name || "user");

  return (
    <div className="admin-booking-details min-h-screen bg-gray-50">
      {/* Header */}
      <div className="admin-booking-header bg-white border-b border-gray-200">
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
                <h1 className="admin-booking-page-title text-xl sm:text-2xl font-bold text-gray-900">
                  Booking Details
                </h1>
                <div className="flex items-center space-x-2 mt-1">
                  <span
                    className={`admin-status-badge px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                      selectedStatus
                    )}`}
                  >
                    {selectedStatus?.charAt(0).toUpperCase() +
                      selectedStatus?.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              {hasChanges && (
                <button
                  onClick={handleSaveChanges}
                  disabled={isSaving}
                  className="admin-save-btn bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-booking-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-8">
            {/* Customer Information */}
            <div className="admin-customer-section bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="admin-section-title text-lg font-semibold text-gray-900 mb-6">
                Customer Information
              </h3>
              <div className="flex items-center space-x-4 mb-6">
                <div
                  className={`w-16 h-16 ${userAvatar.color} rounded-full flex items-center justify-center text-white text-xl font-bold`}
                >
                  {userAvatar.initials}
                </div>
                <div>
                  <h4 className="admin-customer-name text-xl font-bold text-gray-900">
                    {booking?.userId?.name}
                  </h4>
                  <p className="admin-customer-email text-gray-600">
                    {booking?.userId?.email}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="admin-customer-detail flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <div>
                    <span className="admin-detail-label text-sm font-medium text-gray-600">
                      Phone
                    </span>
                    <p className="admin-detail-value text-gray-900">
                      {booking?.userId?.phone}
                    </p>
                  </div>
                </div>
                <div className="admin-customer-detail flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-500" />
                  <div>
                    <span className="admin-detail-label text-sm font-medium text-gray-600">
                      Age
                    </span>
                    <p className="admin-detail-value text-gray-900">
                      {booking?.userId?.age} years
                    </p>
                  </div>
                </div>
                <div className="admin-customer-detail flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-500" />
                  <div>
                    <span className="admin-detail-label text-sm font-medium text-gray-600">
                      Gender
                    </span>
                    <p className="admin-detail-value text-gray-900">
                      {booking?.userId?.sex}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Information */}
            <div className="admin-booking-info-section bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="admin-section-title text-lg font-semibold text-gray-900 mb-6">
                Booking Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="admin-booking-detail">
                  <span className="admin-detail-label text-sm font-medium text-gray-600">
                    Service
                  </span>
                  <p className="admin-detail-value text-gray-900 mt-1">
                    {booking?.service}
                  </p>
                </div>
                <div className="admin-booking-detail flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <span className="admin-detail-label text-sm font-medium text-gray-600">
                      Booking Date
                    </span>
                    <p className="admin-detail-value text-gray-900">
                      {booking?.date ? formatDate(booking.date) : "not found"}
                    </p>
                  </div>
                </div>
                <div className="admin-booking-detail flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <div>
                    <span className="admin-detail-label text-sm font-medium text-gray-600">
                      Location
                    </span>
                    <p className="admin-detail-value text-gray-900">
                      {booking?.state}, {booking?.country}
                    </p>
                  </div>
                </div>
                <div className="admin-booking-detail">
                  <span className="admin-detail-label text-sm font-medium text-gray-600">
                    Status:
                  </span>
                  <span
                    className={`admin-detail-value inline-block px-3 py-1 text-sm font-medium rounded-full mt-1 ${getStatusColor(
                      selectedStatus
                    )}`}
                  >
                    {selectedStatus?.charAt(0).toUpperCase() +
                      selectedStatus?.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Trainer Assignment */}
            <div className="admin-trainer-assignment bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="admin-section-title text-lg font-semibold text-gray-900 mb-6">
                Trainer Assignment
              </h3>

              {/* Current Trainer Display */}
              {selectedTrainer && (
                <div className="admin-current-trainer mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 ${generateAvatar(selectedTrainer.name).color
                          } rounded-full flex items-center justify-center text-white text-sm font-bold`}
                      >
                        {generateAvatar(selectedTrainer.name).initials}
                      </div>
                      <div>
                        <p className="admin-trainer-name font-medium text-gray-900">
                          {selectedTrainer.name}
                        </p>
                        <p className="admin-trainer-designation text-sm text-gray-600">
                          {selectedTrainer.designation}
                        </p>
                      </div>
                    </div>
                    {selectedTrainerId === originalTrainerId && (
                      <Check className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </div>
              )}

              {/* Trainer Selection Dropdown */}
              <div className="admin-trainer-selector relative">
                <label className="admin-selector-label block text-sm font-medium text-gray-700 mb-2">
                  {selectedTrainer ? "Change Trainer" : "Select Trainer"}
                </label>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="admin-dropdown-trigger w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <span className="text-gray-700">
                    {selectedTrainer
                      ? `Change from ${selectedTrainer.name}`
                      : "Choose a trainer..."}
                  </span>
                  <Search className="w-4 h-4 text-gray-500" />
                </button>

                {isDropdownOpen && (
                  <div className="admin-dropdown-menu absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <div className="admin-search-container p-3 border-b border-gray-200">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search trainers..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="admin-search-input w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="admin-trainer-options max-h-60 overflow-y-auto">
                      {filteredTrainers?.length > 0 ? (
                        filteredTrainers?.map((trainer) => (
                          <button
                            key={trainer?._id}
                            onClick={() => {
                              setSelectedTrainerId(trainer?._id.toString());
                              setIsDropdownOpen(false);
                              setSearchTerm("");
                            }}
                            className={`admin-trainer-option w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 transition-colors duration-200 ${trainer?._id.toString() === selectedTrainerId
                              ? "bg-blue-50 border-r-2 border-blue-500"
                              : ""
                              }`}
                          >
                            <div
                              className={`w-8 h-8 ${generateAvatar(trainer.name).color
                                } rounded-full flex items-center justify-center text-white text-xs font-bold`}
                            >
                              {generateAvatar(trainer.name).initials}
                            </div>
                            <div className="flex-1">
                              <p className="admin-option-name font-medium text-gray-900">
                                {trainer.name}
                              </p>
                              <p className="admin-option-designation text-sm text-gray-600">
                                {trainer.designation}
                              </p>
                              <p className="admin-option-email text-xs text-gray-500">
                                {trainer.email}
                              </p>
                            </div>
                            {trainer._id.toString() === selectedTrainerId && (
                              <Check className="w-4 h-4 text-blue-500" />
                            )}
                          </button>
                        ))
                      ) : (
                        <div className="admin-no-results p-4 text-center text-gray-500">
                          No trainers found matching "{searchTerm}"
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="admin-sidebar-content space-y-6 sticky top-24">
              {/* Booking Info Card */}
              <div className="admin-info-card bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="admin-card-title text-lg font-semibold text-gray-900 mb-4">
                  Booking Summary
                </h3>
                <div className="admin-info-items space-y-4">
                  <div className="admin-info-item">
                    <span className="admin-info-label text-sm font-medium text-gray-600">
                      Booking ID
                    </span>
                    <span className="admin-info-value block text-sm text-gray-900">
                      #{booking?._id}
                    </span>
                  </div>
                  <div className="admin-info-item">
                    <span className="admin-info-label text-sm font-medium text-gray-600">
                      Status
                    </span>
                    <span
                      className={`admin-info-value inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        selectedStatus
                      )}`}
                    >
                      {selectedStatus?.charAt(0).toUpperCase() +
                        selectedStatus?.slice(1)}
                    </span>
                  </div>
                  <div className="admin-info-item">
                    <span className="admin-info-label text-sm font-medium text-gray-600">
                      Created
                    </span>
                    <span className="admin-info-value block text-sm text-gray-900">
                      {booking?.createdAt
                        ? formatDate(booking?.createdAt)
                        : "not found"}
                    </span>
                  </div>
                  <div className="admin-info-item">
                    <span className="admin-info-label text-sm font-medium text-gray-600">
                      Last Updated
                    </span>
                    <span className="admin-info-value block text-sm text-gray-900">
                      {booking?.createdAt
                        ? formatDate(booking?.updatedAt)
                        : "not found"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="admin-actions-card bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="admin-card-title text-lg font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="admin-actions-list space-y-3">
                  {/* Status Dropdown */}
                  <div className="admin-status-selector">
                    <label className="admin-selector-label block text-sm font-medium text-gray-700 mb-2">
                      Update Status
                    </label>
                    <div className="relative">
                      <button
                        ref={(el) => {
                          if (el && isStatusDropdownOpen) {
                            const rect = el.getBoundingClientRect();
                            const spaceBelow = window.innerHeight - rect.bottom;
                            const dropdownHeight = 200;
                            if (spaceBelow < dropdownHeight) {
                              el.nextElementSibling?.classList.add(
                                "bottom-full",
                                "mb-1"
                              );
                              el.nextElementSibling?.classList.remove("mt-1");
                            } else {
                              el.nextElementSibling?.classList.remove(
                                "bottom-full",
                                "mb-1"
                              );
                              el.nextElementSibling?.classList.add("mt-1");
                            }
                          }
                        }}
                        onClick={() =>
                          setIsStatusDropdownOpen(!isStatusDropdownOpen)
                        }
                        className="admin-status-dropdown-trigger w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <span
                          className={`text-sm font-medium px-2 py-1 rounded-full ${getStatusColor(
                            selectedStatus
                          )}`}
                        >
                          {selectedStatus?.charAt(0).toUpperCase() +
                            selectedStatus?.slice(1)}
                        </span>
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      </button>

                      {isStatusDropdownOpen && (
                        <div className="admin-status-dropdown-menu absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                          <div className="admin-status-options">
                            {statusOptions.map((option) => (
                              <button
                                key={option.value}
                                onClick={() => {
                                  setSelectedStatus(option.value);
                                  setIsStatusDropdownOpen(false);
                                }}
                                className={`admin-status-option w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 transition-colors duration-200 ${option.value === selectedStatus
                                  ? "bg-blue-50"
                                  : ""
                                  }`}
                              >
                                <span
                                  className={`text-sm font-medium px-2 py-1 rounded-full ${option.color}`}
                                >
                                  {option.label}
                                </span>
                                {option.value === selectedStatus && (
                                  <Check className="w-4 h-4 text-blue-500" />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;

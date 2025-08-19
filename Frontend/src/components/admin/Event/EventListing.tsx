import type React from "react";
import { useEffect, useState } from "react";
import {
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetEventsQuery, useUpdateEventStatusMutation, useDeleteEventMutation } from "../../../store/slices/apiSlice";
import { toast } from 'react-toastify'
import CustomModal from '../common/CustomeModal'

interface Event {
  _id: number;
  title: string;
  date: string;
  status: "published" | "draft";
  images: string[];
  content: string;
}

const EventListing: React.FC = () => {
  const navigate = useNavigate();

  const { data: eventData } = useGetEventsQuery(undefined);



  useEffect(() => {
    setEvents(eventData?.data)
  }, [eventData])

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvents, setSelectedEvents] = useState<number[]>([]);
  const [events, setEvents] = useState<Event[]>([])

  const [deleteEvent, { isLoading: isDeleting }] = useDeleteEventMutation()
  const [changeEventStatus, { isLoading: isUpdating }] = useUpdateEventStatusMutation();
  const [modalAction, setModalAction] = useState<(() => void) | null>(null);
  const [open, setOpen] = useState(false);

  const eventsPerPage = 10;
  const totalPages = Math.ceil(events?.length / eventsPerPage);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleSelectEvent = (eventId: number) => {
    setSelectedEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleSelectAll = () => {
    if (selectedEvents.length === events.length) {
      setSelectedEvents([]);
    } else {
      setSelectedEvents(events.map((event: Event) => event._id));
    }
  };

  const handleFunctionTypes = (eventId: number, type: "status" | "delete") => {
    setModalAction(() => () => handleEventAction(eventId, type));
    setOpen(true);
  }

  const handleEventAction = async (eventId: number, actionType: "status" | "delete") => {
    try {
      if (actionType === "status") {
        const res = await changeEventStatus(eventId).unwrap();

        if (res.success) {
          setEvents(prevEvents =>
            prevEvents.map(event =>
              event._id === eventId
                ? { ...event, status: event.status === "published" ? "draft" : "published" }
                : event
            )
          );
        }

        console.log(`Event ${eventId} status changed successfully`);
      } else if (actionType === "delete") {
        const res = await deleteEvent(eventId).unwrap();

        if (res.success) {
          // remove deleted event from API
          setEvents(prevEvents => prevEvents.filter(event => event._id !== eventId));
        }
        // remove deleted event from UI
        setEvents(prevEvents => prevEvents.filter(event => event._id !== eventId));

        console.log(`Event ${eventId} deleted successfully`);
      }

      setOpen(false); // Close modal
      toast.success(`Event ${actionType === "status" ? "status changed" : "deleted"} successfully`);
    } catch (error) {
      toast.error(`Unable to ${actionType === "status" ? "change status" : "delete Event"}`);
      console.error(`Error performing ${actionType} for event ${eventId}:`, error);
    }
  };

  return (
    <div className="admin-event-listing p-6 space-y-6">
      {/* Page Header */}
      <div className="admin-event-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="admin-event-title text-2xl sm:text-3xl font-bold text-gray-900">
            Events
          </h1>
          <p className="admin-event-subtitle text-gray-600 mt-1">
            Manage your events and schedules
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate("/admin/add-event")}
            className="admin-add-event-btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer font-medium text-sm flex items-center space-x-2 transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Event</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="admin-event-filters bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="admin-search-container flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
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
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>

          {/* Filter Button */}
          <button className="admin-filter-btn px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Events Table */}
      <div className="admin-event-table-container bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="admin-table-header bg-gray-50 border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedEvents?.length === events?.length}
                onChange={handleSelectAll}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                {selectedEvents.length > 0
                  ? `${selectedEvents.length} selected`
                  : "Select all"}
              </span>
            </div>

            {selectedEvents.length > 0 && (
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
            <table className="admin-event-table w-full">
              <thead className="admin-table-head bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="admin-table-header-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedEvents?.length === events?.length}
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
                    Date
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
                {events?.map((event: Event) => (
                  <tr
                    key={event._id}
                    className="admin-table-row hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="admin-table-cell px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedEvents.includes(event._id)}
                        onChange={() => handleSelectEvent(event._id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </td>
                    <td className="admin-table-cell px-6 py-4 whitespace-nowrap">
                      <div className="admin-event-image-container w-16 h-12 rounded-lg overflow-hidden border border-gray-200">
                        <img
                          src={
                            event.images[0] ||
                            "/placeholder.svg?height=48&width=64&query=event"
                          }
                          alt={event.title}
                          className="admin-event-image w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="admin-table-cell px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="admin-event-title text-sm font-medium text-gray-900 line-clamp-2">
                            {event.title}
                          </div>
                          <div className="admin-event-description text-xs text-gray-500 line-clamp-1 mt-1">
                            {event.content}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="admin-table-cell px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {formatDateTime(event.date)}
                        </span>
                      </div>
                    </td>
                    <td className="admin-table-cell px-6 py-4 whitespace-nowrap">
                      <span
                        className={`admin-status-badge inline-flex px-2 py-1 text-xs font-semibold rounded-full cursor-pointer ${getStatusColor(
                          event.status
                        )}`}
                        onClick={() => handleFunctionTypes(event._id, "status")}
                      >
                        {event.status}
                      </span>
                    </td>
                    <td className="admin-table-cell px-6 py-4 whitespace-nowrap">
                      <div className="admin-action-buttons flex items-center space-x-2">
                        <button
                          onClick={() => navigate(`/admin/event-details/${event._id}`)}
                          className="admin-action-btn p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                          title="View Event"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => navigate(`/admin/edit-event/${event._id}`)}
                          className="admin-action-btn p-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                          title="Edit Event"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleFunctionTypes(event._id, "delete")}
                          className="admin-action-btn p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                          title="Delete Event"
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
            {events?.map((event: Event) => (
              <div
                key={event._id}
                className="admin-mobile-card bg-white border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <input
                      type="checkbox"
                      checked={selectedEvents.includes(event._id)}
                      onChange={() => handleSelectEvent(event._id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                    />
                    <div className="admin-mobile-event-image-container w-16 h-12 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                      <img
                        src={
                          event.images[0] ||
                          "/placeholder.svg?height=48&width=64&query=event"
                        }
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="admin-mobile-event-title text-sm font-medium text-gray-900 line-clamp-2">
                        {event.title}
                      </h3>
                      <p className="admin-mobile-event-description text-xs text-gray-500 line-clamp-1 mt-1">
                        {event.content}
                      </p>
                    </div>
                  </div>
                  <button className="admin-more-btn p-1 text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                <div className="admin-mobile-meta grid grid-cols-1 gap-2 text-xs text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDateTime(event.date)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`admin-mobile-status-badge inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      event.status
                    )}`}

                    onClick={() => handleFunctionTypes(event._id, "status")}
                  >
                    {event.status}
                  </span>

                  <div className="admin-mobile-action-buttons flex items-center space-x-2">
                    <button
                      onClick={() => navigate(`/admin/event-details/${event._id}`)}
                      className="admin-mobile-action-btn p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                      title="View Event"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigate(`/admin/edit-event/${event._id}`)}
                      className="admin-mobile-action-btn p-2 text-gray-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                      title="Edit Event"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleFunctionTypes(event._id, "delete")}
                      className="admin-mobile-action-btn p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                      title="Delete Event"
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
              <span className="font-medium">
                {Math.min(eventsPerPage, events?.length ?? 0)}
              </span>{" "}
              of <span className="font-medium">{events?.length}</span> results
            </div>

            <div className="admin-pagination-controls flex items-center space-x-2">
              <button
                disabled={currentPage === 1}
                className="admin-pagination-btn px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Previous
              </button>

              <div className="admin-pagination-numbers flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`admin-pagination-number w-8 h-8 text-sm rounded-md transition-colors duration-200 ${currentPage === page
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                      {page}
                    </button>
                  )
                )}
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
      </div>

      <CustomModal
        open={open}
        onClose={() => setOpen(false)}
        title="Are You sure to confirm this action?"
        size={{ width: 300 }}
        color="#f0f0f0"
        buttonText="OK"
        loading={isDeleting || isUpdating}
        onButtonClick={() => {
          if (modalAction) {
            modalAction();
          } else {
            toast.error("Something went wrong");
          }
        }}
      />

    </div>
  );
};

export default EventListing;

import React, { useState } from 'react'
import { ArrowLeft, Edit, Trash2, Calendar, ImageIcon, Globe, MoreVertical, Download, Archive } from 'lucide-react'

interface Event {
  id: number
  title: string
  description: string
  eventDate: string
  images: string[] // URLs for the images
  status: 'upcoming' | 'past' | 'cancelled'
  lastModified: string
}

const EventDetails: React.FC = () => {
  const [showMoreActions, setShowMoreActions] = useState(false)

  // Mock event data
  const event: Event = {
    id: 1,
    title: "Corporate Leadership Workshop 2025",
    description: `Join us for an intensive workshop designed to enhance leadership skills and team management capabilities for corporate executives and managers. This workshop will cover:

- Strategic Decision Making
- Effective Communication
- Conflict Resolution
- Team Motivation & Engagement
- Innovation & Change Management

Our expert facilitators will guide you through interactive sessions, case studies, and practical exercises to equip you with the tools needed to lead with confidence in today's dynamic business environment.`,
    eventDate: "2025-01-22T09:00:00",
    images: [
      "/placeholder-t75i9.png", // Placeholder for first image
      "/placeholder-k7jsl.png", // Placeholder for second image
      "/team-building-retreat.png", // Placeholder for third image
      "/workplace-wellness.png", // Placeholder for fourth image
      "/vibrant-outdoor-celebration.png" // Placeholder for fifth image
    ],
    status: 'upcoming',
    lastModified: "2024-03-21T14:30:00"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800'
      case 'past':
        return 'bg-gray-100 text-gray-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleEdit = () => {
    // Redirect to event edit page
    window.location.href = `/admin/events/edit/${event.id}`
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      console.log('Delete event:', event.id)
      // Redirect to events listing
      window.location.href = '/admin/events' // Assuming an events listing page
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="event-details min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="event-header bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.history.back()}
                className="back-btn p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="event-page-title text-lg sm:text-xl font-bold text-gray-900 truncate max-w-xs sm:max-w-md">
                  {event.title}
                </h1>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span className={`status-badge px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2">
              
              {/* View Live Button (Placeholder) */}
              <a
                href={`/events/${event.id}`} // Assuming a public event details page
                target="_blank"
                rel="noopener noreferrer"
                className="view-live-btn hidden sm:flex items-center space-x-2 px-3 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <Globe className="w-4 h-4" />
                <span>View Live</span>
              </a>

              {/* Edit Button */}
              <button
                onClick={handleEdit}
                className="edit-btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span className="hidden sm:inline">Edit</span>
              </button>

              {/* More Actions */}
              <div className="relative">
                <button
                  onClick={() => setShowMoreActions(!showMoreActions)}
                  className="more-actions-btn p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>

                {/* More Actions Menu */}
                {showMoreActions && (
                  <div className="more-actions-menu absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="py-2">
                      <button className="action-option flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                        <Download className="w-4 h-4" />
                        <span>Export Data</span>
                      </button>
                      <button className="action-option flex items-center space-x-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                        <Archive className="w-4 h-4" />
                        <span>Archive Event</span>
                      </button>
                      <div className="border-t border-gray-200 my-1"></div>
                      <button
                        onClick={handleDelete}
                        className="action-option flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete Event</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="event-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Event Details Card */}
            <div className="details-card bg-white rounded-lg border border-gray-200 p-6 sm:p-8">
              <h2 className="details-title text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                {event.title}
              </h2>
              
              <div className="details-meta flex flex-wrap items-center gap-4 text-sm text-gray-600 pb-6 border-b border-gray-200 mb-6">
                <div className="meta-item flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(event.eventDate)}</span>
                </div>
              </div>

              <div className="details-description text-gray-800 leading-relaxed whitespace-pre-wrap mb-8">
                {event.description}
              </div>

              {/* Event Images */}
              {event.images.length > 0 && (
                <div className="event-images grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {event.images.map((image, index) => (
                    <div key={index} className="image-container relative rounded-lg overflow-hidden shadow-sm">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Event image ${index + 1}`}
                        className="w-full h-48 sm:h-64 object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Event Info */}
            <div className="event-info bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="sidebar-title text-lg font-semibold text-gray-900 mb-4">
                Event Information
              </h3>
              
              <div className="info-content space-y-4">
                <div className="info-item">
                  <label className="info-label text-sm font-medium text-gray-700">Status</label>
                  <span className={`status-badge inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                </div>

                <div className="info-item">
                  <label className="info-label text-sm font-medium text-gray-700">Event Date</label>
                  <p className="info-value text-sm text-gray-900 mt-1">{formatDate(event.eventDate)}</p>
                </div>

                <div className="info-item">
                  <label className="info-label text-sm font-medium text-gray-700">Last Modified</label>
                  <p className="info-value text-sm text-gray-900 mt-1">{formatDate(event.lastModified)}</p>
                </div>

                <div className="info-item">
                  <label className="info-label text-sm font-medium text-gray-700">Images</label>
                  <p className="info-value text-sm text-gray-900 mt-1 flex items-center space-x-1">
                    <ImageIcon className="w-4 h-4 text-gray-500" />
                    <span>{event.images.length} uploaded</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="sidebar-title text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              
              <div className="actions-content space-y-3">
                <button
                  onClick={handleEdit}
                  className="action-btn w-full flex items-center space-x-2 px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Event</span>
                </button>
                
                <a
                  href={`/events/${event.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn w-full flex items-center space-x-2 px-4 py-2 text-green-600 border border-green-200 rounded-lg hover:bg-green-50 transition-colors duration-200"
                >
                  <Globe className="w-4 h-4" />
                  <span>View Live</span>
                </a>
                
                <button
                  onClick={handleDelete}
                  className="action-btn w-full flex items-center space-x-2 px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Event</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetails

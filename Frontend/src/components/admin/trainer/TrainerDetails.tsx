"use client";

import type React from "react";
import {
  ArrowLeft,
  Eye,
  Edit,
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  Building,
  Languages,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface Service {
  id: string;
  name: string;
}

interface Subservice {
  id: string;
  name: string;
  serviceId: string;
}

interface TrainerData {
  id: string;
  name: string;
  email: string;
  phone: string;
  designation: string;
  website: string;
  language: string[];
  experience: number;
  company: string;
  services: Service[];
  subservices: Subservice[];
  country: string;
  state: string;
  status: "active" | "inactive";
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

const TrainerDetails: React.FC = () => {
  // Mock data - replace with actual API call
  const trainerData: TrainerData = {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    designation: "Senior Corporate Wellness Consultant",
    website: "https://sarahjohnson.com",
    language: ["English", "Spanish", "French"],
    experience: 8,
    company: "Wellness Solutions Inc.",
    services: [
      { id: "1", name: "Corporate Training" },
      { id: "2", name: "Executive Coaching" },
      { id: "3", name: "Team Building" },
    ],
    subservices: [
      { id: "1", name: "Leadership Development", serviceId: "1" },
      { id: "2", name: "Stress Management", serviceId: "1" },
      { id: "3", name: "Performance Coaching", serviceId: "2" },
      { id: "4", name: "Career Transition", serviceId: "2" },
    ],
    country: "United States",
    state: "California",
    status: "active",
    isApproved: true,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T14:45:00Z",
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const generateAvatar = (name: string) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-red-500",
      "bg-yellow-500",
      "bg-teal-500",
    ];
    const colorIndex = name.length % colors.length;
    return { initials, colorClass: colors[colorIndex] };
  };

  const avatar = generateAvatar(trainerData.name);

  return (
    <div className="admin-trainer-details min-h-screen bg-gray-50">
      {/* Header */}
      <div className="admin-trainer-header bg-white border-b border-gray-200 sticky top-0 z-30">
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
                <h1 className="admin-trainer-page-title text-xl sm:text-2xl font-bold text-gray-900">
                  Trainer Details
                </h1>
                <div className="flex items-center space-x-2 mt-1">
                  <span
                    className={`admin-status-badge px-2 py-1 text-xs font-medium rounded-full ${
                      trainerData.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {trainerData.status === "active" ? "Active" : "Inactive"}
                  </span>
                  <span
                    className={`admin-approval-badge px-2 py-1 text-xs font-medium rounded-full ${
                      trainerData.isApproved
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {trainerData.isApproved ? "Approved" : "Pending"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-trainer-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-8">
            {/* Trainer Profile Header */}
            <div className="admin-trainer-profile bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div
                  className={`w-16 h-16 ${avatar.colorClass} rounded-full flex items-center justify-center text-white text-xl font-bold`}
                >
                  {avatar.initials}
                </div>
                <div>
                  <h2 className="admin-trainer-name text-2xl sm:text-3xl font-bold text-gray-900">
                    {trainerData.name}
                  </h2>
                  <p className="admin-trainer-designation text-lg text-gray-600 mt-1">
                    {trainerData.designation}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="admin-contact-section bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="admin-section-title text-lg font-semibold text-gray-900 mb-4">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="admin-contact-item flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <div>
                    <span className="admin-contact-label text-sm font-medium text-gray-600">
                      Email
                    </span>
                    <p className="admin-contact-value text-gray-900">
                      {trainerData.email}
                    </p>
                  </div>
                </div>
                <div className="admin-contact-item flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <div>
                    <span className="admin-contact-label text-sm font-medium text-gray-600">
                      Phone
                    </span>
                    <p className="admin-contact-value text-gray-900">
                      {trainerData.phone}
                    </p>
                  </div>
                </div>
                <div className="admin-contact-item flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-gray-500" />
                  <div>
                    <span className="admin-contact-label text-sm font-medium text-gray-600">
                      Website
                    </span>
                    <a
                      href={trainerData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="admin-contact-value text-blue-600 hover:text-blue-800"
                    >
                      {trainerData.website}
                    </a>
                  </div>
                </div>
                <div className="admin-contact-item flex items-center space-x-3">
                  <Building className="w-5 h-5 text-gray-500" />
                  <div>
                    <span className="admin-contact-label text-sm font-medium text-gray-600">
                      Company
                    </span>
                    <p className="admin-contact-value text-gray-900">
                      {trainerData.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="admin-professional-section bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="admin-section-title text-lg font-semibold text-gray-900 mb-4">
                Professional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="admin-professional-item flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div>
                    <span className="admin-professional-label text-sm font-medium text-gray-600">
                      Experience
                    </span>
                    <p className="admin-professional-value text-gray-900">
                      {trainerData.experience} years
                    </p>
                  </div>
                </div>
                <div className="admin-professional-item flex items-center space-x-3">
                  <Languages className="w-5 h-5 text-gray-500" />
                  <div>
                    <span className="admin-professional-label text-sm font-medium text-gray-600">
                      Languages
                    </span>
                    <p className="admin-professional-value text-gray-900">
                      {trainerData.language.join(", ")}
                    </p>
                  </div>
                </div>
                <div className="admin-professional-item flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <div>
                    <span className="admin-professional-label text-sm font-medium text-gray-600">
                      Location
                    </span>
                    <p className="admin-professional-value text-gray-900">
                      {trainerData.state}, {trainerData.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Section */}
            <div className="admin-services-section bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="admin-section-title text-lg font-semibold text-gray-900 mb-6">
                Services ({trainerData.services.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trainerData.services.map((service) => (
                  <div
                    key={service.id}
                    className="admin-service-card border border-gray-200 rounded-lg p-4"
                  >
                    <h4 className="admin-service-name text-lg font-medium text-gray-900 mb-2">
                      {service.name}
                    </h4>
                    <div className="admin-subservices-list">
                      <span className="text-sm font-medium text-gray-600">
                        Subservices:
                      </span>
                      <div className="mt-1 space-y-1">
                        {trainerData.subservices
                          .filter((sub) => sub.serviceId === service.id)
                          .map((subservice) => (
                            <span
                              key={subservice.id}
                              className="admin-subservice-tag inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mr-2 mb-1"
                            >
                              {subservice.name}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="admin-sidebar-content space-y-6 sticky top-24">
              {/* Trainer Info Card */}
              <div className="admin-info-card bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="admin-card-title text-lg font-semibold text-gray-900 mb-4">
                  Trainer Information
                </h3>
                <div className="admin-info-items space-y-4">
                  <div className="admin-info-item">
                    <span className="admin-info-label text-sm font-medium text-gray-600">
                      Status
                    </span>
                    <div className="flex items-center space-x-2 mt-1">
                      {trainerData.status === "active" ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-gray-500" />
                      )}
                      <span
                        className={`admin-info-value text-sm font-medium ${
                          trainerData.status === "active"
                            ? "text-green-600"
                            : "text-gray-600"
                        }`}
                      >
                        {trainerData.status === "active"
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </div>
                  </div>
                  <div className="admin-info-item">
                    <span className="admin-info-label text-sm font-medium text-gray-600">
                      Approval Status
                    </span>
                    <div className="flex items-center space-x-2 mt-1">
                      {trainerData.isApproved ? (
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span
                        className={`admin-info-value text-sm font-medium ${
                          trainerData.isApproved
                            ? "text-blue-600"
                            : "text-red-600"
                        }`}
                      >
                        {trainerData.isApproved
                          ? "Approved"
                          : "Pending Approval"}
                      </span>
                    </div>
                  </div>
                  <div className="admin-info-item">
                    <span className="admin-info-label text-sm font-medium text-gray-600">
                      Joined
                    </span>
                    <span className="admin-info-value block text-sm text-gray-900">
                      {formatDate(trainerData.createdAt)}
                    </span>
                  </div>
                  <div className="admin-info-item">
                    <span className="admin-info-label text-sm font-medium text-gray-600">
                      Last Updated
                    </span>
                    <span className="admin-info-value block text-sm text-gray-900">
                      {formatDate(trainerData.updatedAt)}
                    </span>
                  </div>
                  <div className="admin-info-item">
                    <span className="admin-info-label text-sm font-medium text-gray-600">
                      Services
                    </span>
                    <span className="admin-info-value block text-sm text-gray-900">
                      {trainerData.services.length} service
                      {trainerData.services.length !== 1 ? "s" : ""}
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
                  <button className="admin-action-item w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200">
                    <Edit className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Edit Status
                    </span>
                  </button>
                  <button className="admin-action-item w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200">
                    <Eye className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      View Profile
                    </span>
                  </button>
                  {!trainerData.isApproved && (
                    <>
                      <button className="admin-action-item w-full flex items-center space-x-3 p-3 text-left hover:bg-green-50 rounded-lg transition-colors duration-200 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          Approve Trainer
                        </span>
                      </button>
                      <button className="admin-action-item w-full flex items-center space-x-3 p-3 text-left hover:bg-red-50 rounded-lg transition-colors duration-200 text-red-600">
                        <XCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          Reject Trainer
                        </span>
                      </button>
                    </>
                  )}

                  {trainerData.isApproved && (
                    <button className="admin-action-item w-full flex items-center space-x-3 p-3 text-left hover:bg-red-50 rounded-lg transition-colors duration-200 text-red-600">
                      <User className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        Deactivate Trainer
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetails;

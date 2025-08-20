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
import { useParams } from "react-router-dom";
import { useGetTrainerDetailsQuery } from "../../../store/slices/apiSlice";
import { useEffect, useState } from "react";
import type { ITrainer } from "../../../types/types";
import { generateAvatar } from "../../../utils/generateAvatar";
import { formatDate } from "../../../utils/fomatDate";


const TrainerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: trainerResponse } = useGetTrainerDetailsQuery(id);

  console.log(trainerResponse?.data, "trainerererer");

  const [trainer, setTrainer] = useState<ITrainer>();

  useEffect(() => {
    setTrainer(trainerResponse?.data);
  }, [trainerResponse]);

  const avatar = generateAvatar(trainer?.name || "user");

  return (
    <div className="admin-trainer-details min-h-screen bg-gray-50">
      {/* Header */}
      <div className="admin-trainer-header bg-white border-b border-gray-200">
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
                      trainer?.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {trainer?.status === "active" ? "Active" : "Inactive"}
                  </span>
                  <span
                    className={`admin-approval-badge px-2 py-1 text-xs font-medium rounded-full ${
                      trainer?.isApproved == "approved"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {trainer?.isApproved=="approved" ? "Approved" : "Pending"}
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
                  className={`w-16 h-16 ${avatar.color} rounded-full flex items-center justify-center text-white text-xl font-bold`}
                >
                  {avatar.initials}
                </div>
                <div>
                  <h2 className="admin-trainer-name text-2xl sm:text-3xl font-bold text-gray-900">
                    {trainer?.name}
                  </h2>
                  <p className="admin-trainer-designation text-lg text-gray-600 mt-1">
                    {trainer?.designation}
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
                      {trainer?.email}
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
                      {trainer?.phone}
                    </p>
                  </div>
                </div>
                <div className="admin-contact-item flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-gray-500" />
                  <div>
                    <span className="admin-contact-label text-sm font-medium text-gray-600">
                      Website:  
                    </span>
                    <a
                      href={trainer?.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="admin-contact-value text-blue-600 hover:text-blue-800"
                    >
                      {" " + trainer?.website}
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
                      {trainer?.company}
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
                      {trainer?.experience} years
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
                      {trainer?.language}
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
                      {trainer?.state}, {trainer?.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Section */}
            <div className="admin-services-section bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="admin-section-title text-lg font-semibold text-gray-900 mb-6">
                Services ({trainer?.services.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trainer?.services.map((service, index) => (
                  <div
                    key={index}
                    className="admin-service-card border border-gray-200 rounded-lg p-4"
                  >
                    <h4 className="admin-service-name text-lg font-medium text-gray-900">
                      {service?.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>

            {/* Subservices Section */}
            <div className="admin-subservices-section bg-white rounded-lg border border-gray-200 p-6 mt-6">
              <h3 className="admin-section-title text-lg font-semibold text-gray-900 mb-6">
                Subservices ({trainer?.subServices.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trainer?.subServices.map((subservice, index) => (
                  <div
                    key={index}
                    className="admin-subservice-card border border-gray-200 rounded-lg p-4"
                  >
                    <h4 className="admin-subservice-name text-lg font-medium text-gray-900">
                      {subservice?.title}
                    </h4>
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
                      {trainer?.status === "active" ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-gray-500" />
                      )}
                      <span
                        className={`admin-info-value text-sm font-medium ${
                          trainer?.status === "active"
                            ? "text-green-600"
                            : "text-gray-600"
                        }`}
                      >
                        {trainer?.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>
                  <div className="admin-info-item">
                    <span className="admin-info-label text-sm font-medium text-gray-600">
                      Approval Status
                    </span>
                    <div className="flex items-center space-x-2 mt-1">
                      {trainer?.isApproved == 'approved' ? (
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span
                        className={`admin-info-value text-sm font-medium ${
                          trainer?.isApproved =='approved' ? "text-blue-600" : "text-red-600"
                        }`}
                      >
                        {trainer?.isApproved == 'approved' ? "Approved" : "Pending Approval"}
                      </span>
                    </div>
                  </div>
                  <div className="admin-info-item">
                    <span className="admin-info-label text-sm font-medium text-gray-600">
                      Joined
                    </span>
                    <span className="admin-info-value block text-sm text-gray-900">
                      {trainer?.createdAt
                        ? formatDate(trainer.createdAt)
                        : "not found"}
                    </span>
                  </div>
                  <div className="admin-info-item">
                    <span className="admin-info-label text-sm font-medium text-gray-600">
                      Last Updated
                    </span>
                    <span className="admin-info-value block text-sm text-gray-900">
                      {trainer?.updatedAt
                        ? formatDate(trainer.updatedAt)
                        : "not found"}
                    </span>
                  </div>
                  <div className="admin-info-item">
                    <span className="admin-info-label text-sm font-medium text-gray-600">
                      Services
                    </span>
                    <span className="admin-info-value block text-sm text-gray-900">
                      {trainer?.services.length} service
                      {trainer?.services.length !== 1 ? "s" : ""}
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
                  {trainer?.isApproved != 'approved' && (
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

                  {trainer?.isApproved == 'approved' && (
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

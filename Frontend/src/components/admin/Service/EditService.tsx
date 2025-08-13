"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Upload, X, Save, Plus } from "lucide-react"
import { useGetServiceDetailsQuery, useEditServiceMutation } from "../../../store/slices/apiSlice";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../../utils/toast";

interface Subservice {
  _id: number
  title: string
  content: string
}

interface ServiceFormData {
  title: string
  content: string
  image: File | null
  subservices: Subservice[]
}

interface EditServiceProps {
  serviceId: string
}

const EditService: React.FC<EditServiceProps> = ({ serviceId }) => {
  const navigate = useNavigate()
  // Updated hook name from useGetServiceByIdQuery to useGetServiceQuery
  const { data: serviceResponse, isLoading, error } = useGetServiceDetailsQuery(serviceId)
  const [updateService, { isLoading: isUpdating }] = useEditServiceMutation()

  const [formData, setFormData] = useState<ServiceFormData>({
    title: "",
    content: "",
    image: null,
    subservices: [],
  })

  const [imagePreview, setImagePreview] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [nextSubserviceId, setNextSubserviceId] = useState(0)

  useEffect(() => {
    // Updated to use serviceResponse.data since API returns {success, data} structure
    if (serviceResponse) {
      const service = serviceResponse
      setFormData({
        title: service.title || "",
        content: service.content || "",
        image: null,
        subservices:
          service.subServices?.map((sub: Subservice, index: number) => ({
            id: index,
            title: sub.title || "",
            content: sub.content || "",
          })) || [],
      })

      if (service.image) {
        setImagePreview(service.image)
      }

      setNextSubserviceId(service.subServices?.length || 0)
    }
  }, [serviceResponse])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }))
      const reader = new FileReader()
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }))
    setImagePreview("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const addSubservice = () => {
    setFormData((prev) => ({
      ...prev,
      subservices: [...prev.subservices, { _id: nextSubserviceId, title: "", content: "" }],
    }))
    setNextSubserviceId((prev) => prev + 1)
  }

  const handleSubserviceChange = (index: number, field: keyof Subservice, value: string) => {
    setFormData((prev) => {
      const newSubservices = [...prev.subservices]
      if (field !== "_id") {
        ;(newSubservices[index][field] as string) = value
      }
      return { ...prev, subservices: newSubservices }
    })
  }

  const removeSubservice = (idToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      subservices: prev.subservices.filter((sub) => sub._id !== idToRemove),
    }))
  }

  const handleSave = async () => {

    // Create FormData for multipart/form-data
    const formDataToSend = new FormData();

    // Add the image file (not just the name)
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    formDataToSend.append("title", formData.title);
    formDataToSend.append("content", formData.content);
    formDataToSend.append("subservices", JSON.stringify(formData.subservices));
    
    try {

      const res = await updateService({id: serviceId, data: formDataToSend}).unwrap();

      console.log(res);

      if (res.success) {
        // Note: response structure should be res.success, not res.data.success
        successToast('Service updated!')
        navigate("/admin/services");
      }
    } catch (error) {
        errorToast("updation failed")
      console.error("Error adding service:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="edit-service min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading service...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="edit-service min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading service</p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="edit-service min-h-screen bg-gray-50">
      {/* Header */}
      <div className="admin-service-header bg-white border-b border-gray-200 sticky top-0 z-30">
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
                <h1 className="admin-service-page-title text-xl sm:text-2xl font-bold text-gray-900">Edit Service</h1>
                <p className="admin-service-page-subtitle text-sm text-gray-600 hidden sm:block">
                  Update your service details
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSave}
                disabled={isUpdating}
                className="admin-save-service-btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 flex items-center space-x-2"
              >
                {isUpdating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Update Service</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-service-content max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Service Title */}
          <div className="admin-title-section bg-white rounded-lg border border-gray-200 p-6">
            <label htmlFor="title" className="admin-form-label block text-sm font-medium text-gray-700 mb-3">
              Service Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter your service title..."
              className="admin-title-input w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          {/* Service Description */}
          <div className="admin-description-section bg-white rounded-lg border border-gray-200 p-6">
            <label htmlFor="description" className="admin-form-label block text-sm font-medium text-gray-700 mb-3">
              Service Description *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write a detailed description for your service..."
              rows={8}
              className="admin-description-textarea w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y transition-all duration-200"
              required
            />
          </div>

          {/* Service Image Upload */}
          <div className="admin-image-section bg-white rounded-lg border border-gray-200 p-6">
            <label className="admin-form-label block text-sm font-medium text-gray-700 mb-4">Service Image</label>
            <div className="admin-image-upload-card relative border border-gray-300 rounded-lg overflow-hidden">
              {!imagePreview ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="admin-upload-area h-40 flex flex-col items-center justify-center text-center p-4 cursor-pointer hover:bg-blue-50 transition-colors duration-200"
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Upload Service Image</p>
                  <p className="text-xs text-gray-500">Click or drag & drop</p>
                </div>
              ) : (
                <div className="admin-image-preview-container relative h-40">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Service image preview"
                    className="admin-image-preview w-full h-full object-cover"
                  />
                  <button
                    onClick={removeImage}
                    className="admin-remove-image-btn absolute top-2 right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </div>
          </div>

          {/* Subservices Section */}
          <div className="admin-subservices-section bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Subservices</h3>
              <button
                onClick={addSubservice}
                className="admin-add-subservice-btn bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Subservice</span>
              </button>
            </div>
            <div className="space-y-4">
              {formData.subservices.map((sub, index) => (
                <div key={index} className="admin-subservice-card border border-gray-300 rounded-lg p-4 relative">
                  <button
                    onClick={() => removeSubservice(sub._id)}
                    className="admin-remove-subservice-btn absolute top-2 right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                    aria-label={`Remove subservice ${index + 1}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="mb-3">
                    <label
                      htmlFor={`subservice-title-${sub._id}`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subservice Title *
                    </label>
                    <input
                      type="text"
                      id={`subservice-title-${sub._id}`}
                      name={`subservice-title-${sub._id}`}
                      value={sub.title}
                      onChange={(e) => handleSubserviceChange(index, "title", e.target.value)}
                      placeholder="Enter subservice title..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`subservice-description-${sub._id}`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subservice Description *
                    </label>
                    <textarea
                      id={`subservice-description-${sub._id}`}
                      name={`subservice-description-${sub._id}`}
                      value={sub?.content}
                      onChange={(e) => handleSubserviceChange(index, "content", e.target.value)}
                      placeholder="Write a detailed description for this subservice..."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent resize-y transition-all duration-200"
                      required
                    />
                  </div>
                </div>
              ))}
              {formData.subservices.length === 0 && (
                <p className="text-center text-gray-500 py-4">
                  No subservices added yet. Click "Add Subservice" to begin.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditService

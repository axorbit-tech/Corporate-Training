"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Upload, X, Save } from "lucide-react";
import {
  useGetEventDetailsQuery,
  useEditEventMutation,
} from "../../../store/slices/apiSlice";
import { formatDateForInput } from "../../../utils/fomatDate";
import { errorToast, successToast } from "../../../utils/toast";
import { useNavigate } from "react-router-dom";
import Loader from "../../common/Loader";
import SomethingWentWrong from "../../common/error";

interface EventFormData {
  title: string;
  content: string;
  date: string;
  images: string[];
}

interface EditEventProps {
  eventId: string;
}

const EditEvent: React.FC<EditEventProps> = ({ eventId }) => {
  const navigate = useNavigate();

  const {
    data: eventResponse,
    isLoading: isLoadingEvent,
    isError,
  } = useGetEventDetailsQuery(eventId);

  console.log("event response : ", eventResponse);
  const [editEvent, { isLoading: isUpdating }] = useEditEventMutation();

  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    content: "",
    date: "",
    images: [],
  });

  const [featuredImages, setFeaturedImages] = useState<(File | null)[]>(
    Array(5).fill(null)
  );
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    Array(5).fill("")
  );
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>(
    Array(5).fill(null)
  );

  useEffect(() => {
    if (eventResponse?.success && eventResponse.event) {
      const event = eventResponse.event;
      setFormData({
        title: event.title || "",
        content: event.content || "",
        date: formatDateForInput(event.date) || "",
        images: event.images || [],
      });

      if (event.images && Array.isArray(event.images)) {
        const newImagePreviews = Array(5).fill("");
        const newExistingImages = Array(5).fill("");

        event.images.slice(0, 5).forEach((imageUrl: string, index: number) => {
          newImagePreviews[index] = imageUrl;
          newExistingImages[index] = imageUrl;
        });

        setImagePreviews(newImagePreviews);
        setExistingImages(newExistingImages);
      }
    }
  }, [eventResponse]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const newFeaturedImages = [...featuredImages];
      newFeaturedImages[index] = file;
      setFeaturedImages(newFeaturedImages);

      const reader = new FileReader();
      reader.onload = (event) => {
        const newImagePreviews = [...imagePreviews];
        newImagePreviews[index] = event.target?.result as string;
        setImagePreviews(newImagePreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    const newFeaturedImages = [...featuredImages];
    newFeaturedImages[index] = null;
    setFeaturedImages(newFeaturedImages);

    const newImagePreviews = [...imagePreviews];
    newImagePreviews[index] = "";
    setImagePreviews(newImagePreviews);

    const newExistingImages = [...existingImages];
    newExistingImages[index] = "";
    setExistingImages(newExistingImages);

    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index]!.value = "";
    }
  };

  const handleSave = async () => {
  const formDataToSend = new FormData();

  formDataToSend.append("title", formData.title);
  formDataToSend.append("content", formData.content);
  formDataToSend.append("date", formData.date);

  // Add images with their positions
  featuredImages.forEach((file, index) => {
    if (file) {
      // New image for this index
      formDataToSend.append(`images[${index}]`, file);
    } else if (existingImages[index]) {
      // Keep the existing image URL
      formDataToSend.append(`existingImages[${index}]`, existingImages[index]);
    }
  });

  const res = await editEvent({id:eventId, data: formDataToSend}).unwrap();

  if (res.success) {
    successToast("Event updated successfully");
    navigate("/admin/events");
  } else {
    errorToast("Event update failed");
  }
};


  if (isLoadingEvent) return <Loader />
    if (isError) return <SomethingWentWrong />

  return (
    <div className="edit-event min-h-screen bg-gray-50">
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
                <h1 className="event-page-title text-xl sm:text-2xl font-bold text-gray-900">
                  Edit Event
                </h1>
                <p className="event-page-subtitle text-sm text-gray-600 hidden sm:block">
                  Update your event details
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSave}
                disabled={isUpdating}
                className="save-event-btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 flex items-center space-x-2"
              >
                {isUpdating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Update Event</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="event-content max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Event Title */}
          <div className="title-section bg-white rounded-lg border border-gray-200 p-6">
            <label
              htmlFor="title"
              className="form-label block text-sm font-medium text-gray-700 mb-3"
            >
              Event Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter your event title..."
              className="title-input w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          {/* Event Description */}
          <div className="description-section bg-white rounded-lg border border-gray-200 p-6">
            <label
              htmlFor="description"
              className="form-label block text-sm font-medium text-gray-700 mb-3"
            >
              Event Description *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write a detailed description for your event..."
              rows={8}
              className="description-textarea w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y transition-all duration-200"
              required
            />
          </div>

          {/* Event Date */}
          <div className="date-section bg-white rounded-lg border border-gray-200 p-6">
            <label
              htmlFor="eventDate"
              className="form-label block text-sm font-medium text-gray-700 mb-3"
            >
              Event Date *
            </label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="date-input w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          {/* Event Images Upload */}
          <div className="images-section bg-white rounded-lg border border-gray-200 p-6">
            <label className="form-label block text-sm font-medium text-gray-700 mb-4">
              Event Images (Up to 5)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="image-upload-card relative border border-gray-300 rounded-lg overflow-hidden"
                >
                  {!imagePreviews[index] ? (
                    <div
                      onClick={() => fileInputRefs.current[index]?.click()}
                      className="upload-area h-40 flex flex-col items-center justify-center text-center p-4 cursor-pointer hover:bg-blue-50 transition-colors duration-200"
                    >
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        Upload Image {index + 1}
                      </p>
                      <p className="text-xs text-gray-500">
                        Click or drag & drop
                      </p>
                    </div>
                  ) : (
                    <div className="image-preview-container relative h-40">
                      <img
                        src={imagePreviews[index] || "/placeholder.svg"}
                        alt={`Event image preview ${index + 1}`}
                        className="image-preview w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="remove-image-btn absolute top-2 right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  <input
                    ref={(el) => {
                      fileInputRefs.current[index] = el;
                    }}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, index)}
                    className="hidden"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;

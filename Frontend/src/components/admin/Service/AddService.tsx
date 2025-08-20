import type React from "react";
import { useState, useRef } from "react";
import { ArrowLeft, Upload, X, Save, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAddServiceMutation } from "../../../store/slices/apiSlice";
import { successToast } from "../../../utils/toast";

interface Subservice {
  id: number;
  title: string;
  content: string;
}

interface ServiceFormData {
  title: string;
  content: string;
  image: File | null;
  subservices: Subservice[];
}

const AddService: React.FC = () => {
  const navigate = useNavigate();
  const [addService] = useAddServiceMutation();

  const [formData, setFormData] = useState<ServiceFormData>({
    title: "",
    content: "",
    image: null,
    subservices: [],
  });

  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [nextSubserviceId, setNextSubserviceId] = useState(0);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const addSubservice = () => {
    setFormData((prev) => ({
      ...prev,
      subservices: [
        ...prev.subservices,
        { id: nextSubserviceId, title: "", content: "" },
      ],
    }));
    setNextSubserviceId((prev) => prev + 1);
  };

  const handleSubserviceChange = (
    index: number,
    field: keyof Subservice,
    value: string
  ) => {
    setFormData((prev) => {
      const newSubservices = [...prev.subservices];
      // Ensure the field exists and is not 'id'
      if (field !== "id") {
        (newSubservices[index][field] as string) = value;
      }
      return { ...prev, subservices: newSubservices };
    });
  };

  const removeSubservice = (idToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      subservices: prev.subservices.filter((sub) => sub.id !== idToRemove),
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);

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
      const res = await addService(formDataToSend).unwrap();

      console.log(res);

      if (res.success) {
        successToast('service added successfully')
        navigate("/admin/services");
      }
    } catch (error) {
      console.error("Error adding service:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="add-service min-h-screen bg-gray-50">
      {/* Header */}
      <div className="service-header bg-white border-b border-gray-200">
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
                <h1 className="service-page-title text-xl sm:text-2xl font-bold text-gray-900">
                  Add New Service
                </h1>
                <p className="service-page-subtitle text-sm text-gray-600 hidden sm:block">
                  Create and publish your service details
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="save-service-btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 flex items-center space-x-2"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Service</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="service-content max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Service Title */}
          <div className="title-section bg-white rounded-lg border border-gray-200 p-6">
            <label
              htmlFor="title"
              className="form-label block text-sm font-medium text-gray-700 mb-3"
            >
              Service Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter your service title..."
              className="title-input w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          {/* Service Description */}
          <div className="description-section bg-white rounded-lg border border-gray-200 p-6">
            <label
              htmlFor="description"
              className="form-label block text-sm font-medium text-gray-700 mb-3"
            >
              Service Description *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write a detailed description for your service..."
              rows={8}
              className="description-textarea w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y transition-all duration-200"
              required
            />
          </div>

          {/* Service Image Upload */}
          <div className="image-section bg-white rounded-lg border border-gray-200 p-6">
            <label className="form-label block text-sm font-medium text-gray-700 mb-4">
              Service Image (Single)
            </label>
            <div className="image-upload-card relative border border-gray-300 rounded-lg overflow-hidden">
              {!imagePreview ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="upload-area h-40 flex flex-col items-center justify-center text-center p-4 cursor-pointer hover:bg-blue-50 transition-colors duration-200"
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Upload Service Image</p>
                  <p className="text-xs text-gray-500">Click or drag & drop</p>
                </div>
              ) : (
                <div className="image-preview-container relative h-40">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Service image preview"
                    className="image-preview w-full h-full object-cover"
                  />
                  <button
                    onClick={removeImage}
                    className="remove-image-btn absolute top-2 right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Subservices Section */}
          <div className="subservices-section bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Subservices
              </h3>
              <button
                onClick={addSubservice}
                className="add-subservice-btn bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Subservice</span>
              </button>
            </div>
            <div className="space-y-4">
              {formData.subservices.map((sub, index) => (
                <div
                  key={sub.id}
                  className="subservice-card border border-gray-300 rounded-lg p-4 relative"
                >
                  <button
                    onClick={() => removeSubservice(sub.id)}
                    className="remove-subservice-btn absolute top-2 right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                    aria-label={`Remove subservice ${index + 1}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="mb-3">
                    <label
                      htmlFor={`subservice-title-${sub.id}`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subservice Title *
                    </label>
                    <input
                      type="text"
                      id={`subservice-title-${sub.id}`}
                      name={`subservice-title-${sub.id}`}
                      value={sub.title}
                      onChange={(e) =>
                        handleSubserviceChange(index, "title", e.target.value)
                      }
                      placeholder="Enter subservice title..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`subservice-content-${sub.id}`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subservice Description *
                    </label>
                    <textarea
                      id={`subservice-description-${sub.id}`}
                      name={`subservice-description-${sub.id}`}
                      value={sub.content}
                      onChange={(e) =>
                        handleSubserviceChange(index, "content", e.target.value)
                      }
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
  );
};

export default AddService;

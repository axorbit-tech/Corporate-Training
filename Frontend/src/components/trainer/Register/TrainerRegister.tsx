import React, { useEffect, useState } from "react";
import {
  useGetServicesQuery,
  useTrainerRegisterMutation,
} from "../../../store/slices/userApiSlice";
import type { IService, ISubService } from "../../../types/types";
import { Country, State } from "country-state-city";
import { successToast } from "../../../utils/toast";

const TrainerRegister: React.FC = () => {
  const [trainerRegistration] = useTrainerRegisterMutation();
  const [countries, setCountries] = useState<
    { name: string; isoCode: string }[]
  >([]);
  const [states, setStates] = useState<{ name: string; isoCode: string }[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    website: "",
    language: "",
    experience: 0,
    company: "",
    selectedServices: [] as string[], // Now stores service titles instead of IDs
    selectedSubServices: [] as string[],
    country: "",
    state: "",
    description: ""
  });

  useEffect(() => {
    // Load all countries
    const allCountries = Country.getAllCountries().map((c) => ({
      name: c.name,
      isoCode: c.isoCode,
    }));
    setCountries(allCountries);
  }, []);

  const { data: serviceResponse } = useGetServicesQuery(undefined);

  const [services, setServices] = useState<IService[]>([]);

  useEffect(() => {
    setServices(serviceResponse?.data || []);
  }, [serviceResponse]);

  const handleCountryInputChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "country") {
      // Reset state when country changes
      setFormData((prev) => ({ ...prev, state: "" }));

      // Find country code
      const selectedCountry = countries.find((c) => c.name === value);
      if (selectedCountry) {
        const statesOfCountry = State.getStatesOfCountry(
          selectedCountry.isoCode
        ).map((s) => ({
          name: s.name,
          isoCode: s.isoCode,
        }));
        setStates(statesOfCountry);
      } else {
        setStates([]);
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await trainerRegistration(formData).unwrap();

      if (res.success) {
        successToast("submitted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get available subservices based on selected service titles
  const getAvailableSubServices = () => {
    if (!formData.selectedServices.length || !services.length) return [];

    const subServices: ISubService[] = [];

    formData.selectedServices.forEach((serviceTitle) => {
      const service = services.find((s) => s.title === serviceTitle);
      if (service && service.subServices) {
        subServices.push(...service.subServices);
      }
    });

    // Remove duplicates based on title
    return subServices.filter(
      (subService, index, self) =>
        index === self.findIndex((s) => s.title === subService.title)
    );
  };

  const availableSubServices = getAvailableSubServices();

  return (
    <section className="contact-form-section py-16 sm:py-20 lg:py-24 lg:px-10 lg:mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden shadow-xl">
          {/* Left Side - Text Content */}
          <div className="contact-text-section bg-green-100 p-8 sm:p-10 lg:p-12 xl:p-16 flex flex-col justify-center">
            <div className="space-y-6 sm:space-y-8">
              {/* Main Heading */}
              <h2 className="contact-form-heading text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight">
                Start Your Journey to Clarity and Well-being
              </h2>

              {/* Description Text */}
              <p className="contact-form-description text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                Please fill out the form below to help us understand your needs
                and match you with the right counselor. All information is kept
                confidential and is used solely to provide you with the best
                support possible. Whether you're facing personal, professional,
                or career-related challenges, we're here to help you take the
                first step toward a better tomorrow.
              </p>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="contact-form-section bg-blue-100 p-8 sm:p-10 lg:p-12 xl:p-16 flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-group">
                  <label
                    htmlFor="name"
                    className="form-label block text-sm font-medium text-gray-700 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input w-full px-4 py-3 border border-gray-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="email"
                    className="form-label block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input w-full px-4 py-3 border border-gray-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Phone and Designation Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-group">
                  <label
                    htmlFor="phone"
                    className="form-label block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input w-full px-4 py-3 border border-gray-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="designation"
                    className="form-label block text-sm font-medium text-gray-700 mb-2"
                  >
                    Designation
                  </label>
                  <input
                    type="text"
                    id="designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    className="form-input w-full px-4 py-3 border border-gray-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Website and Language Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-group">
                  <label
                    htmlFor="website"
                    className="form-label block text-sm font-medium text-gray-700 mb-2"
                  >
                    Website (optional)
                  </label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="form-input w-full px-4 py-3 border border-gray-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="language"
                    className="form-label block text-sm font-medium text-gray-700 mb-2"
                  >
                    Language
                  </label>
                  <input
                    type="text"
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    className="form-input w-full px-4 py-3 border border-gray-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-group">
                  <label
                    htmlFor="experience"
                    className="form-label block text-sm font-medium text-gray-700 mb-2"
                  >
                    Experience ( in years )
                  </label>
                  <input
                    type="number"
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="form-input w-full px-4 py-3 border border-gray-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="company"
                    className="form-label block text-sm font-medium text-gray-700 mb-2"
                  >
                    Company/Individual
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="form-input w-full px-4 py-3 border border-gray-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Services Multi-Select with Custom UI */}
              <div className="form-group">
                <label className="form-label block text-xs font-medium text-gray-700 mb-3">
                  Services <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-48 overflow-y-auto p-2 rounded-lg backdrop-blur-sm">
                    {services?.map((service) => (
                      <div
                        key={service._id}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                          formData.selectedServices.includes(service.title)
                            ? "border-blue-500 bg-blue-50 shadow-md transform scale-105"
                            : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-25"
                        }`}
                        onClick={() => {
                          const serviceTitle = service.title;
                          const isSelected = formData.selectedServices.includes(serviceTitle);

                          if (isSelected) {
                            setFormData((prev) => ({
                              ...prev,
                              selectedServices: prev.selectedServices.filter(
                                (title) => title !== serviceTitle
                              ),
                              selectedSubServices: prev.selectedSubServices.filter(
                                (subServiceTitle) => {
                                  // Remove subservices that belong to this service
                                  return !service.subServices?.some(
                                    (sub) => sub.title === subServiceTitle
                                  );
                                }
                              ),
                            }));
                          } else {
                            setFormData((prev) => ({
                              ...prev,
                              selectedServices: [...prev.selectedServices, serviceTitle],
                            }));
                          }
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                              formData.selectedServices.includes(service.title)
                                ? "border-blue-500 bg-blue-500"
                                : "border-gray-300"
                            }`}
                          >
                            {formData.selectedServices.includes(service.title) && (
                              <svg
                                className="w-3 h-3 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                          <div>
                            <h4 className="font-sm text-xs text-gray-900">
                              {service.title}
                            </h4>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>
                      Selected: {formData.selectedServices.length} service(s)
                    </span>
                    <span>Click to select/deselect services</span>
                  </div>
                </div>
              </div>

              {/* SubServices Multi-Select - Only show if services are selected */}
              {formData.selectedServices.length > 0 &&
                availableSubServices.length > 0 && (
                  <div className="form-group">
                    <label className="form-label block text-sm font-semibold text-slate-800 mb-4">
                      Choose Sub Services
                    </label>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2 max-h-64 overflow-y-auto rounded-xl">
                        {availableSubServices.map((subService, index) => (
                          <div
                            key={`${subService.title}-${index}`}
                            className={`group relative p-2 rounded-xl border-2 cursor-pointer transition-all duration-200 ease-out ${
                              formData.selectedSubServices.includes(
                                subService.title
                              )
                                ? "border-blue-500 bg-blue-50 shadow-lg shadow-blue-100/50 ring-2 ring-blue-100"
                                : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-25 hover:shadow-md hover:-translate-y-0.5"
                            }`}
                            onClick={() => {
                              const isSelected =
                                formData.selectedSubServices.includes(
                                  subService.title
                                );

                              if (isSelected) {
                                setFormData((prev) => ({
                                  ...prev,
                                  selectedSubServices:
                                    prev.selectedSubServices.filter(
                                      (title) => title !== subService.title
                                    ),
                                }));
                              } else {
                                setFormData((prev) => ({
                                  ...prev,
                                  selectedSubServices: [
                                    ...prev.selectedSubServices,
                                    subService.title,
                                  ],
                                }));
                              }
                            }}
                          >
                            <div className="flex items-start space-x-3">
                              <div
                                className={`relative flex-shrink-0 w-5 h-5 rounded-md border-2 transition-all duration-200 ${
                                  formData.selectedSubServices.includes(
                                    subService.title
                                  )
                                    ? "border-blue-500 bg-blue-500 shadow-sm"
                                    : "border-slate-300 bg-white group-hover:border-blue-400"
                                }`}
                              >
                                {formData.selectedSubServices.includes(
                                  subService.title
                                ) && (
                                  <svg
                                    className="w-3 h-3 text-white absolute top-0.5 left-0.5 transition-all duration-200"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4
                                  className={`font-semibold text-xs leading-tight transition-colors duration-200 ${
                                    formData.selectedSubServices.includes(
                                      subService.title
                                    )
                                      ? "text-blue-900"
                                      : "text-slate-900 group-hover:text-blue-800"
                                  }`}
                                >
                                  {subService.title}
                                </h4>
                              </div>
                            </div>

                            {/* Selection indicator */}
                            {formData.selectedSubServices.includes(
                              subService.title
                            ) && (
                              <div className="absolute top-2 right-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between px-1">
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                              formData.selectedSubServices.length > 0
                                ? "bg-blue-500"
                                : "bg-slate-300"
                            }`}
                          ></div>
                          <span className="text-sm font-medium text-slate-700">
                            {formData.selectedSubServices.length} selected
                          </span>
                        </div>
                        <span className="text-xs text-slate-500 font-medium">
                          From your chosen services
                        </span>
                      </div>
                    </div>
                  </div>
                )}

              {/* Country and State Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-group">
                  <label
                    htmlFor="country"
                    className="form-label block text-sm font-medium text-gray-700 mb-2"
                  >
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleCountryInputChange}
                    className="form-select w-full px-4 py-3 border border-gray-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Select Country</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label
                    htmlFor="state"
                    className="form-label block text-sm font-medium text-gray-700 mb-2"
                  >
                    State
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleCountryInputChange}
                    className="form-select w-full px-4 py-3 border border-gray-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
                    required
                    disabled={!states.length}
                  >
                    <option value="">Select State</option>
                    {states.map((state, index) => (
                      <option key={index} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <div className="form-group">
                  <label
                    htmlFor="description"
                    className="form-label block text-sm font-medium text-gray-700 mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="form-input w-full px-4 py-3 border border-gray-300 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 text-center">
                <button
                  type="submit"
                  className="form-submit-btn font-medium px-16 py-1 rounded-full border border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 min-w-[120px]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainerRegister;
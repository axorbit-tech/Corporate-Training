import React, { useState, useEffect } from 'react'
import { useGetServicesQuery, useCreateBookingMutation } from '../../../store/slices/userApiSlice'
import { Country, State } from "country-state-city";
import CustomModal from '../../admin/common/CustomeModal';
import { toast } from 'react-toastify'

interface Services {
  _id: number
  title: string
}

const BookingFormSection: React.FC = () => {
  const [countries, setCountries] = useState<{ name: string; isoCode: string }[]>([]);
  const [states, setStates] = useState<{ name: string; isoCode: string }[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    service: '',
    country: '',
    state: ''
  })

  useEffect(() => {
    // Load all countries
    const allCountries = Country.getAllCountries().map((c) => ({
      name: c.name,
      isoCode: c.isoCode,
    }));
    setCountries(allCountries);
  }, []);

  const [createEnquiry, { isLoading }] = useCreateBookingMutation();
  const [open, setOpen] = useState(false);

  const { data: servicesData } = useGetServicesQuery(undefined)
  const services = servicesData?.data

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setOpen(true)
  }

  const handleConfirmForm = async () => {

    try {
      const payload = {
        ...formData,
        phone: Number(formData.phone),
        age: Number(formData.age)
      };

      await createEnquiry(payload).unwrap();

      toast.success("Enquiry submitted successfully");
      setOpen(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        age: '',
        service: '',
        country: '',
        state: ''
      })
    } catch (error) {
      if (error) {
        toast.error("Failed to add booking");
        console.error("Error adding Booking:", error);
      }
    }
  }





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
                Please fill out the form below to help us understand your needs and match you with the right counselor. All information is kept confidential and is used solely to provide you with the best support possible. Whether you're facing personal, professional, or career-related challenges, we're here to help you take the first step toward a better tomorrow.
              </p>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="contact-form-section bg-blue-100 p-8 sm:p-10 lg:p-12 xl:p-16 flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Name and Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-group">
                  <label htmlFor="name" className="form-label block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input w-full px-4 py-3 border border-gray-300  bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input w-full px-4 py-3 border border-gray-300  bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Phone and Age Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-group">
                  <label htmlFor="phone" className="form-label block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, ""); // remove non-digits
                      if (value.length <= 12) { // limit to 12 digits
                        setFormData({ ...formData, phone: value });
                      }
                    }}
                    className="form-input w-full px-4 py-3 border border-gray-300  bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="age" className="form-label block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    type="text"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, ""); // remove non-digits
                      if (value.length <= 3) { // limit to 12 digits
                        setFormData({ ...formData, age: value });
                      }
                    }}
                    min="1"
                    max="120"
                    className="form-input w-full px-4 py-3 border border-gray-300  bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Category and Country Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-group">
                  <label htmlFor="category" className="form-label block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="form-select w-full px-4 py-3 border border-gray-300  bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Select Category</option>
                    {services?.map((service: Services) => (
                      <option key={service._id} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="country" className="form-label block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleCountryInputChange}
                    className="form-select w-full px-4 py-3 border border-gray-300  bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
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
              </div>

              {/* State Row */}
              <div className="form-group">
                <label htmlFor="state" className="form-label block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleCountryInputChange}
                  className="form-select w-full px-4 py-3 border border-gray-300 rounded-md bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select State</option>
                  {states.map((state, index) => (
                    <option key={index} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <div className="pt-4 text-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Book Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <CustomModal
        open={open}
        onClose={() => setOpen(false)}
        title="Are You sure to confirm this action?"
        // description={`This modal works with TypeScript. Service ID: ${selectedServiceId}`}
        size={{ width: 300 }}
        color="#f0f0f0"
        buttonText="OK"
        loading={isLoading}
        onButtonClick={async () => {
          await handleConfirmForm()
        }}
      />
    </section>
  )
}

export default BookingFormSection

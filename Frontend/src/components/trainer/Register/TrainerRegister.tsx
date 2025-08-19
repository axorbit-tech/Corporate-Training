import React, { useState } from 'react'
// import { useGetServicesQuery } from '../../../store/slices/userApiSlice'

const TrainerRegister: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    designation: '',
    website: "",
    language: '',
    category: '',
    country: '',
    state: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission logic here
  }

//   const {data: services } = useGetServicesQuery(undefined);

//   const [services, setServices] = useState<>

  const categories = [
    'Individual Counseling',
    'Corporate Training',
    'Group Therapy',
    'Family Counseling',
    'Stress Management',
    'Career Counseling'
  ]

  const countries = [
    'India',
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Other'
  ]

  const states = [
    'Kerala',
    'Karnataka',
    'Tamil Nadu',
    'Maharashtra',
    'Delhi',
    'Gujarat',
    'Other'
  ]

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
                    onChange={handleInputChange}
                    className="form-input w-full px-4 py-3 border border-gray-300  bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="designation" className="form-label block text-sm font-medium text-gray-700 mb-2">
                    Designation
                  </label>
                  <input
                    type="text"
                    id="designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    min="1"
                    max="120"
                    className="form-input w-full px-4 py-3 border border-gray-300  bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-group">
                  <label htmlFor="website" className="form-label block text-sm font-medium text-gray-700 mb-2">
                    website (optional)
                  </label>
                  <input
                    type="link"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="form-input w-full px-4 py-3 border border-gray-300  bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="language" className="form-label block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <input
                    type="text"
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
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
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="form-select w-full px-4 py-3 border border-gray-300  bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
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
                    onChange={handleInputChange}
                    className="form-select w-full px-4 py-3 border border-gray-300  bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Select Country</option>
                    {countries.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
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
                  onChange={handleInputChange}
                  className="form-select w-full px-4 py-3 border border-gray-300 rounded-md bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select State</option>
                  {states.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
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
  )
}

export default TrainerRegister

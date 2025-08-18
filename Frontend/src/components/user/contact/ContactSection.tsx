import React, { useState } from 'react'
import { useCreateEnquiryMutation } from '../../../store/slices/userApiSlice'
import { toast } from 'react-toastify'
import CustomModal from '../../admin/common/CustomeModal'

const ContactFormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const [createEnquiry, { isLoading }] = useCreateEnquiryMutation();
  const [open, setOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setOpen(true)
  }

  const confirmForm = async () => {
    try {
      const payload = {
        ...formData,
        phone: Number(formData.phone) // convert to number before sending
      };

      await createEnquiry(payload).unwrap();

      toast.success("Enquiry submitted successfully");
      setOpen(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })
    } catch (error) {
      toast.error("Failed to add service");
      console.error("Error adding service:", error);
      
    }
  };


  return (
    <section className="contact-form-section py-16 sm:py-20 lg:py-24 lg:px-10 lg:mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden shadow-xl">

          {/* Left Side - Text Content */}
          <div className="contact-text-section bg-green-100 p-8 sm:p-10 lg:p-12 xl:p-16 flex flex-col justify-center">
            <div className="space-y-6 sm:space-y-8">

              {/* Main Heading */}
              <h2 className="contact-form-heading text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight">
                Contact Us
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-group">
                  <label htmlFor="phone" className="form-label block text-sm font-medium text-gray-700 mb-2">
                    phone
                  </label>
                  <input
                    type="text"
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
                  <label htmlFor="phone" className="form-label block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-input w-full px-4 py-3 border border-gray-300  bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
              </div>


              <div className="form-group">
                <label htmlFor="message" className="form-label block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-input w-full px-4 py-3 border border-gray-300  bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                />
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
          await confirmForm()
        }}
      />
    </section>
  )
}

export default ContactFormSection

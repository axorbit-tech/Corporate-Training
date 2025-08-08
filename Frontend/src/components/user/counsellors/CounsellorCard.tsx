import React from 'react'

interface CounsellorCardProps {
  name: string
  profession: string
  email: string
  website: string
  phone: string
  aboutText: string
  image: string
  appointmentLink?: string
}

const TherapistCard: React.FC<CounsellorCardProps> = ({ 
  name, 
  profession, 
  email, 
  website, 
  phone, 
  aboutText, 
  image, 
  appointmentLink = "#" 
}) => {
  return (
    <div className="counsellor-card bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[300px] md:min-h-[250px]">
        
        {/* Left Section - Contact Info */}
        <div className="counsellor-contact-section md:col-span-4 bg-green-100 p-6 sm:p-8 flex flex-col justify-center">
          <div className="space-y-4 sm:space-y-6 text-center">
            
            {/* counsellor Name */}
            <h3 className="counsellor-name text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              {name}
            </h3>

            {/* Profession */}
            <p className="counsellor-profession text-sm sm:text-base text-gray-700 font-medium">
              {profession}
            </p>

            {/* Contact Information */}
            <div className="counsellor-contact-info space-y-2 sm:space-y-3">
              <div className="contact-item">
                <a 
                  href={`mailto:${email}`}
                  className="counsellor-contact-link text-sm sm:text-base text-gray-700 hover:text-blue-600 transition-colors duration-300"
                >
                  {email}
                </a>
              </div>
              
              <div className="contact-item">
                <a 
                  href={`https://${website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="counsellor-contact-link text-sm sm:text-base text-gray-700 hover:text-blue-600 transition-colors duration-300"
                >
                  {website}
                </a>
              </div>
              
              <div className="contact-item">
                <a 
                  href={`tel:${phone}`}
                  className="counsellor-contact-link text-sm sm:text-base text-gray-700 hover:text-blue-600 transition-colors duration-300"
                >
                  {phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section - About Me */}
        <div className="counsellor-about-section md:col-span-4 bg-sky-200 p-6 sm:p-8 flex flex-col justify-center">
          <div className="space-y-4 sm:space-y-6 text-center">
            
            {/* About Me Heading */}
            <h4 className="counsellor-about-heading text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              ABOUT ME
            </h4>

            {/* About Text */}
            <p className="counsellor-about-text text-sm sm:text-base text-gray-700 leading-relaxed">
              {aboutText}
            </p>

            {/* Book Appointment Button */}
            <div className="pt-2">
              <a 
                href={appointmentLink}
                className="counsellor-appointment-btn inline-block bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-6 py-3 rounded-xl font-medium text-sm tracking-wide transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                BOOK APPOINTMENT
              </a>
            </div>
          </div>
        </div>

        {/* Right Section - counsellor Photo */}
        <div className="counsellor-image-section md:col-span-4 relative overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={`${name} - ${profession}`}
            className="counsellor-image w-full h-full object-cover min-h-[250px] md:min-h-full"
          />
        </div>
      </div>
    </div>
  )
}

export default TherapistCard
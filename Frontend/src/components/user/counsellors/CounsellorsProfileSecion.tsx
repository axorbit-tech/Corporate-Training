import React from 'react'
import CounsellorCard from './CounsellorCard'

const CounsellorProfileSection: React.FC = () => {
  const counsellors = [
    {
      name: "SHABAD MK",
      profession: "Clinical Psychologist",
      email: "smk@gmail.com",
      website: "www.smk.com",
      phone: "+91 8547412614",
      aboutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
      image: "/assets/therpist-hero-image.jpg",
      appointmentLink: "/book-appointment/shabad-mk"
    },
    {
      name: "DR. SARAH JOHNSON",
      profession: "Licensed Therapist",
      email: "sarah@example.com",
      website: "www.sarahtherapy.com",
      phone: "+91 9876543210",
      aboutText: "Experienced therapist specializing in cognitive behavioral therapy and stress management. Dedicated to helping individuals achieve mental wellness and personal growth through evidence-based practices.",
      image: "/assets/therpist-hero-image.jpg",
      appointmentLink: "/book-appointment/sarah-johnson"
    },
    {
      name: "MICHAEL CHEN",
      profession: "Corporate Counselor",
      email: "michael@example.com",
      website: "www.corporatecounseling.com",
      phone: "+91 8765432109",
      aboutText: "Specializing in workplace mental health and corporate wellness programs. Helping organizations create healthier work environments and supporting employees in managing work-related stress.",
      image: "/assets/therpist-hero-image.jpg",
      appointmentLink: "/book-appointment/michael-chen"
    }
  ]

  return (
    <section className="counsellor-profile-section bg-gray-50 py-16 sm:py-20 lg:py-24 lg:px-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="counsellor-section-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            Meet Our counsellors
          </h2>
          <p className="counsellor-section-subheading text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Our team of experienced professionals is dedicated to providing personalized care and support for your mental health and wellness journey.
          </p>
        </div>

        {/* Therapists Grid */}
        <div className="space-y-8 sm:space-y-10 lg:space-y-12">
          {counsellors.map((counsellor, index) => (
            <CounsellorCard
              key={index}
              name={counsellor.name}
              profession={counsellor.profession}
              email={counsellor.email}
              website={counsellor.website}
              phone={counsellor.phone}
              aboutText={counsellor.aboutText}
              image={counsellor.image}
              appointmentLink={counsellor.appointmentLink}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CounsellorProfileSection;

import React from 'react'
import CounsellorCard from './CounsellorCard'
import Loader from '../../common/Loader'

const CounsellorProfileSection: React.FC = () => {
  const counsellors = [
    {
      name: "SHABAD MK",
      profession: "Clinical Psychologist",
      email: "smk@gmail.com",
      aboutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
      image: "/assets/therpist-hero-image.jpg",

    },
    {
      name: "DR. SARAH JOHNSON",
      profession: "Licensed Therapist",
      email: "sarah@example.com",
      aboutText: "Experienced therapist specializing in cognitive behavioral therapy and stress management. Dedicated to helping individuals achieve mental wellness and personal growth through evidence-based practices.",
      image: "/assets/therpist-hero-image.jpg",
    },
    {
      name: "MICHAEL CHEN",
      profession: "Corporate Counselor",
      email: "michael@example.com",
      aboutText: "Specializing in workplace mental health and corporate wellness programs. Helping organizations create healthier work environments and supporting employees in managing work-related stress.",
      image: "/assets/therpist-hero-image.jpg",
    }
  ]

  return (
    <section className="counsellor-profile-section bg-gray-50 py-10 sm:py-20 lg:py-24 lg:px-10">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {counsellors.map((counsellor, index) => (
            <CounsellorCard
              key={index}
              name={counsellor.name}
              profession={counsellor.profession}
              email={counsellor.email}
              aboutText={counsellor.aboutText}
              image={counsellor.image}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CounsellorProfileSection;

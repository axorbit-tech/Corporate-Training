import React from 'react'
import avatar from "/assets/dummy-avatar.jpg"


interface CounsellorCardProps {
  name: string
  profession: string
  email: string
  aboutText: string
  image: string
}

const TherapistCard: React.FC<CounsellorCardProps> = ({
  name,
  profession,
  aboutText,
  image,
  email
}) => {
  return (


    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md  hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col items-center p-6">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={image || avatar}
          alt={`${name} profile picture`}
        />
        <h5 className="mb-1 text-xl font-semibold text-black">
          {name}
        </h5>
        <span className="text-sm text-gray-800">
          {profession}
        </span>
        <span className="text-sm text-gray-400">
          {email}
        </span>
        <div className="mt-4 text-center">
          <h4 className="text-lg font-medium mb-2 text-blue-600">About Me</h4>
          <p className="footer-section text-gray-800">{aboutText}</p>
        </div>
      </div>
    </div>

  )
}

export default TherapistCard
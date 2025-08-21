import limitWords from "../../../utils/wordLimitor"

interface ServiceCardProps {
  image: string
  title: string
  description: string
}

const ServiceCard = ({ image, title, description }: ServiceCardProps) => {
  return (
    <div className=" rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative h-48 bg-gray-200">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-lg font-bold mb-3 uppercase tracking-wide">{title}</h3>

        <p className="text-gray-700 text-sm leading-relaxed">{limitWords(description, 30)}</p>
      </div>
    </div>
  )
}

export default ServiceCard

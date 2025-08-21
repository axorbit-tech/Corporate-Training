import ServiceCard from "../cards/ServiceCard"
import { useNavigate } from "react-router-dom"
import { useGetServicesQuery } from "../../../store/slices/userApiSlice"
import Loader from "../../common/Loader"

interface Service {
  _id: number
  image: string
  title: string
  content: string
}

const ServiceSection = () => {

  const { data: serviceResponse, isLoading: isLoadingServices, isError } = useGetServicesQuery(undefined)
  const services = serviceResponse?.data

  const navigate = useNavigate()
  // Sample service data - you can modify this as needed

  if(isLoadingServices) return <Loader />
  if(isError) return null
  

  return (
    <section className="service-section py-16 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="service-main-heading text-3xl font-bold text-blue-600 mb-2">Services</h2>
          {/* Blue underline */}
          {/* <div className="w-16 h-1 bg-blue-500 mx-auto"></div> */}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services?.slice(0, 6).map((service: Service) => (
            <ServiceCard
              key={service._id}
              image={service.image}
              title={service.title}
              description={service.content}
            />
          ))}
        </div>

          <div className="text-center">
          <button onClick={()=> navigate('/services')} className="bg-gradient-to-r border border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600 cursor-pointer px-16 py-4 rounded-2xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            ALL SERVICES
          </button>
        </div>


        {/* Know More Button */}
        {/* <div className="flex justify-center lg:justify-end">
          <button className="flex items-center justify-center w-32 h-32 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
            <div className="text-center">
              <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-500 group-hover:text-blue-600 transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                KNOW MORE
              </span>
            </div>
          </button>
        </div> */}
      </div>
    </section>
  )
}

export default ServiceSection

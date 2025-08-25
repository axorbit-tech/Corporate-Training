import { useEffect, useState } from 'react'
import React from 'react'
import ServiceCard from './ServicePageCard'
import { useGetServicesQuery } from '../../../store/slices/userApiSlice'
import Loader from '../../common/Loader'
import type { IService } from '../../../types/types'


const ServiceListSection: React.FC = () => {
  const { data: getService, isLoading, isError } = useGetServicesQuery(undefined)
  const [services, setServices] = useState<IService[]>([])

  useEffect(() => {
    if (getService) {
      setServices(getService?.data)
    }
  }, [getService])

  const [showAll, setShowAll] = useState(false)

  if (isLoading) return <Loader />

  if (isError) {
    return (
      <section className="py-16 text-center text-red-600">
        <p>Failed to load services. Please try again later.</p>
      </section>
    )
  }

  const visibleServices = showAll ? services : services.slice(0, 9)

  return (
    <section className="services-grid-section bg-gray-50 py-16 sm:py-20 lg:pt-20 lg:pb-16 lg:px-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {services.length > 0 ? (
          <>
            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {visibleServices?.map((service: IService) => (
                <ServiceCard
                  key={service._id}
                  id={service._id}
                  title={service.title}
                  description={service.content}
                />
              ))}
            </div>

            {/* Show Load More only if more than 9 */}
            {services.length > 9 && !showAll && (
              <div className="text-center p-10">
                <button
                  onClick={() => setShowAll(true)}
                  className="bg-gradient-to-r border border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600 cursor-pointer px-14 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        ) : (
          <div>No services found</div>
        )}
      </div>
    </section>
  )
}

export default ServiceListSection

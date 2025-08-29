import { useEffect, useState } from "react";
import React from "react";
import ServiceCard from "./ServicePageCard";
import { useGetServicesQuery } from "../../../store/slices/userApiSlice";
import Loader from "../../common/Loader";
import type { IService } from "../../../types/types";
import SomethingWentWrong from "../../common/error";

const ServiceListSection: React.FC = () => {
  const {
    data: getService,
    isLoading,
    isError,
  } = useGetServicesQuery(undefined);
  const [services, setServices] = useState<IService[]>([]);

  useEffect(() => {
    if (getService) {
      setServices(getService?.data);
    }
  }, [getService]);

  const [showAll, setShowAll] = useState(false);

  if (isLoading) return <Loader />;

  if (isError) {
    return <SomethingWentWrong/>
  }

  const visibleServices = showAll ? services : services.slice(0, 9);

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
          <div className="text-center py-12 sm:py-16 lg:py-20">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m-8 0V6a2 2 0 00-2 2v6.341" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                No Services Available
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                We're currently preparing our service offerings. Please check back soon for our comprehensive corporate training solutions!
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceListSection;
import React, { useEffect, useState } from "react";
import { useGetServiceDetailsQuery } from "../../../store/slices/userApiSlice";
import { useParams } from "react-router-dom";
import type { IService, ISubService } from "../../../types/types";

type ServiceDetailsImageSectionParams = {
  id: string;
};

const ServiceDetailsImageSection: React.FC = () => {
  const { id } = useParams<ServiceDetailsImageSectionParams>();
  const { data: serviceData, isLoading, error } = useGetServiceDetailsQuery(id);
  const [service, setService] = useState<IService>();

  useEffect(() => {
    setService(serviceData?.data);
  }, [serviceData]);

  if (isLoading) {
    return (
      <div className="admin-service-details min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading service details...</p>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="admin-service-details min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading service details</p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-8 md:px-6 md:py-16 lg:px-6 lg:py-15 mt-8">
      <div className="px-2 sm:px-4 sm:py-6 md:px-8 md:py-10 lg:px-12 lg:py-14">
        {/* Service Image */}
        <img
          src={service?.image || "/placeholder.svg"}
          alt={service?.title}
          className="w-full h-[300px] sm:h-[300px] md:h-[400px] lg:h-[600px] object-cover object-center rounded-lg shadow-lg"
        />

        {/* Service Title and Content */}
        <div className="mt-8 text-center">
          <h1 className="service-details-heading text-2xl sm:text-2xl md:text-4xl font-bold mb-6 text-gray-800">
            {service?.title}
          </h1>

          <div className="text-sm sm:text-base md:text-lg mx-4 sm:mx-8 md:mx-16 text-justify leading-relaxed text-gray-700 mb-12">
            {service?.content}
          </div>
        </div>

        {/* Subservices Section */}
        {service?.subServices && service.subServices.length > 0 && (
          <div className="mt-12 border-t border-gray-200 pt-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-8 text-gray-800">
              Our Services Include
            </h2>

            <div className="space-y-8">
              {service.subServices.map(
                (subservice: ISubService, index: number) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-6 sm:p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                  >
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-gray-800 border-l-4 border-blue-500 pl-4">
                      {subservice.title}
                    </h3>

                    <div className="text-sm sm:text-base text-gray-700 leading-relaxed text-justify">
                      {subservice.content}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceDetailsImageSection;

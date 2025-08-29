import React, { useEffect, useState } from "react";
import { useGetServiceDetailsQuery } from "../../../store/slices/userApiSlice";
import { useParams } from "react-router-dom";
import type { IService, ISubService } from "../../../types/types";
import LoaderComponent from "../../common/Loader";
import SomethingWentWrong from "../../common/error";

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
    return <LoaderComponent />;
  }

  if (error || !service) {
    return <SomethingWentWrong />;
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

          <div className="text-sm sm:text-base md:text-lg mx-4 sm:mx-8 md:mx-16 text-justify leading-relaxed text-gray-700 mb-12 whitespace-pre-line">
            {service?.content}
          </div>
        </div>

        {/* Subservices Section */}
        {/* Subservices Section */}
        {service?.subServices && service.subServices.length > 0 && (
          <div className="mt-12 border-t border-gray-200 pt-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-8 text-gray-800">
              Our Services Include
            </h2>

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {service.subServices.map(
                (subservice: ISubService, index: number) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-6 sm:p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col"
                  >
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-gray-800 border-l-4 border-blue-500 pl-4">
                      {subservice.title}
                    </h3>

                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line text-left">
                      {subservice.content}
                    </p>
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

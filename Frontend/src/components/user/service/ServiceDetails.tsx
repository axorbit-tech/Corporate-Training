import type React from "react"
import { ArrowLeft } from "lucide-react"
import { useGetServiceDetailsQuery } from "../../../store/slices/userApiSlice"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { IService, ISubService } from "../../../types/types";

type ServiceDetailsParams = {
    id: string;
};

interface ServiceDetailsProps {
    serviceId?: string
}

const ServiceDetails: React.FC<ServiceDetailsProps> = () => {

    const { id } = useParams<ServiceDetailsParams>();

    const { data: serviceData, isLoading, error } = useGetServiceDetailsQuery(id)
    console.log(serviceData, "service data")
    const [service, setService] = useState<IService>()

    useEffect(()=> {
        setService(serviceData)
    }, [serviceData])

    if (isLoading) {
        return (
            <div className="admin-service-details min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading service details...</p>
                </div>
            </div>
        )
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
        )
    }

    return (
        <div className="admin-service-details min-h-screen bg-gray-50  flex flex-col">
            {/* Header */}
            <div className="admin-service-header bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-3 items-center h-16">

                        {/* Left Section (Back Button) */}
                        <div className="flex items-center">
                            <button
                                onClick={() => window.history.back()}
                                className="admin-back-btn p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-200"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Center Section (Title & Status) */}
                        <div className="flex flex-col items-center">
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 text-center">
                                Service Details
                            </h1>
                        </div>

                        {/* Right Section (empty, for balance or future actions) */}
                        <div></div>
                    </div>
                </div>
            </div>


            {/* Main Content */}
            <div className="flex justify-center px-4 sm:px-6 lg:px-8 py-8">
                <div className="w-full max-w-4xl space-y-8">
                    {/* Service Header Info */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                            {service?.title}
                        </h2>
                    </div>

                    {/* Service Image */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Image</h3>
                        <div className="rounded-lg overflow-hidden">
                            <img
                                src={service.image || "/placeholder.svg"}
                                alt={service.title}
                                className="w-full h-64 sm:h-80 object-cover"
                            />
                        </div>
                    </div>

                    {/* Service Description */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Description</h3>
                        <div className="text-gray-700 leading-relaxed">
                            <p>{service.content}</p>
                        </div>
                    </div>

                    {/* Subservices Section */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">
                            Subservices ({service.subServices?.length || 0})
                        </h3>

                        {service.subServices && service.subServices.length > 0 ? (
                            <div className="space-y-6">
                                {service.subServices.map((subservice: ISubService, index: number) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                                        <h4 className="text-xl font-semibold text-gray-900 mb-3">
                                            {index + 1}. {subservice.title}
                                        </h4>
                                        <p className="text-gray-700 leading-relaxed">
                                            {subservice.content}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No subservices availablae for this service.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ServiceDetails

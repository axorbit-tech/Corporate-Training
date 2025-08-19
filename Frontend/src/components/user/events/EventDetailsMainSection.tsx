import React from 'react'
import Gallery from '../common/Gallery'
import { useGetEventDetailsQuery } from '../../../store/slices/userApiSlice'
import { useParams } from 'react-router-dom'
import { formatDateTimeWithSuffix } from '../../../utils/fomatDate'

type EventDetailsMainSectionParams = {
    id: string;
};



const EventDetailsMainSection: React.FC = () => {

    const { id } = useParams<EventDetailsMainSectionParams>();

    const { data, isLoading, error } = useGetEventDetailsQuery(id)
    const eventData = data?.data

    const { readableDate, time } = formatDateTimeWithSuffix(eventData?.date)


    if (isLoading) {
        return (
            <div className="admin-service-details min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading Event details...</p>
                </div>
            </div>
        )
    }

    if (error || !eventData) {
        return (
            <div className="admin-service-details min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Error loading Events details</p>
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
        <section className="px-4 py-16 sm:px-5 sm:py-8 md:px-5 md:py-16 lg:px-5 lg:py-20">
            <div className="px-2 sm:px-4 sm:py-6 md:px-8 md:py-10 lg:px-12 lg:py-14">
                <img
                    src={eventData.images[0]}
                    alt={eventData.title}
                    className="w-full h-[300px] sm:h-[300px] md:h-[400px] lg:h-[600px] object-center"
                />

                <div className='mt-6 text-center'>
                    <h2 className="event-details-heading text-xl sm:text-xl md:text-3xl font-bold mb-1">{eventData.title}</h2>
                    <div className="relative">
                        <p className="absolute top-1 left-8  text-sm text-gray-500">{readableDate} {time}</p>

                    </div>
                    <p className="text-sm sm:text-sm md:text-base mx-5 text-justify mt-10">
                        {eventData.content}
                    </p>
                </div>

            </div>

            <Gallery eventImages={eventData.images}/>
        </section>
    )
}

export default EventDetailsMainSection
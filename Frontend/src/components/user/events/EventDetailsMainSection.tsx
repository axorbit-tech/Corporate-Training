import React from 'react'
import Gallery from '../common/Gallery'
import { useGetEventDetailsQuery } from '../../../store/slices/userApiSlice'
import { useParams } from 'react-router-dom'
import { formatDateTimeWithSuffix } from '../../../utils/fomatDate'
import LoaderComponent from '../../common/Loader'
import SomethingWentWrong from '../../common/error'

type EventDetailsMainSectionParams = {
    id: string;
};



const EventDetailsMainSection: React.FC = () => {

    const { id } = useParams<EventDetailsMainSectionParams>();

    const { data, isLoading, error } = useGetEventDetailsQuery(id)
    const eventData = data?.data

    const { readableDate, time } = formatDateTimeWithSuffix(eventData?.date)


    if (isLoading) {
        return <LoaderComponent/>
    }

    if (error || !eventData) {
        return <SomethingWentWrong/>
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
                        <p className="absolute top-1 text-sm text-gray-500">{readableDate} {time}</p>

                    </div>
                    <p className="text-sm sm:text-sm md:text-base text-justify mt-10 whitespace-pre-line">
                        {eventData.content}
                    </p>
                </div>

            </div>

            <Gallery eventImages={eventData.images}/>
        </section>
    )
}

export default EventDetailsMainSection
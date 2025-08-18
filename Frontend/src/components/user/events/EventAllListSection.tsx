import EventCard from './EventCard'
import Pagination from '../../pagination';

interface EventAllListSectionProps {
    title: string
    events: Array<{
        date: string
        month: string
        title: string
        content: string
        images: string
        link?: string
    }>
    responses: {
        isLoading: boolean
        error: string
    };
    pagination?: {
        total: number;
        page: number;
        pages: number;
    };
    onPageChange?: (page: number) => void;
}


const EventAllListSection: React.FC<EventAllListSectionProps> = ({ title, events, responses, pagination, onPageChange }) => {
    const { isLoading, error } = responses


    if (isLoading) {
        return (
            <div className="admin-service-details min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading {title} details...</p>
                </div>
            </div>
        )
    }

    if (error || !events) {
        return (
            <div className="admin-service-details min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Error loading {title} details</p>
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
        <section className="all-events-section bg-gray-50 pt-12 sm:pt-12 lg:pt-24 lg:px-10">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* Left Side - Section Title */}
                    <div className="lg:col-span-3 xl:col-span-2">
                        <h2 className="all-events-heading text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight sticky top-8">
                            {title}
                        </h2>
                    </div>

                    {/* Right Side - Events Grid */}
                    <div className="lg:col-span-9 xl:col-span-10">
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {events.map((event, index) => (
                                <EventCard
                                    key={index}
                                    date={event.date}
                                    title={event.title}
                                    description={event.content}
                                    image={event.images?.[0] || "/placeholder.svg"}
                                    link={event.link}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        {pagination && onPageChange && (
                            <Pagination currentPage={pagination.page} totalPages={pagination.pages} onPageChange={onPageChange} />
                        )}
                    </div>
                </div>
            </div>
        </section>

    )
}

export default EventAllListSection

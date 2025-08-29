import { useState } from "react";
import Header from "../../../components/user/common/Header";
import Footer from "../../../components/user/common/Footer";
import EventsHeroSection from "../../../components/user/events/EventHeroSection";
import EventListSection from "../../../components/user/events/EventListSection";
import EventAllListSection from "../../../components/user/events/EventAllListSection";
import { useGetEventsQuery } from "../../../store/slices/userApiSlice";

export default function Events() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data: eventData,
    isLoading,
    error,
  } = useGetEventsQuery({ page, limit });
  const allEvents = eventData?.data?.allEvents || [];
  const upcomingEvents = eventData?.data?.upcomingEvents || [];
  const recentEvents = eventData?.data?.recentEvents || [];
  const pagination = eventData?.pagination;

  const responses = {
    isLoading,
    error,
  };

  const errorMessage: string = responses.error
    ? "status" in responses.error
      ? `Error ${responses.error.status}`
      : responses.error.message || "Unknown error"
    : "";

  // Check if there are no events at all
  const hasNoEvents = !isLoading && allEvents.length === 0 && upcomingEvents.length === 0 && recentEvents.length === 0;

  return (
    <div className="min-h-screen">
      <Header />
      <EventsHeroSection />
      
      {/* Show No Events Message if no events exist */}
      {hasNoEvents ? (
        <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12 sm:py-16 lg:py-20">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                  No Events Available
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  We're planning exciting events for you. Stay tuned for upcoming workshops, seminars, and training sessions!
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Show event sections only if they have events */}
          {upcomingEvents.length > 0 && (
            <EventListSection
              title="Upcoming Events"
              events={upcomingEvents}
              responses={{ isLoading: responses.isLoading, error: errorMessage }}
            />
          )}
          {recentEvents.length > 0 && (
            <EventListSection
              title="Recent Events"
              events={recentEvents}
              responses={{ isLoading: responses.isLoading, error: errorMessage }}
            />
          )}

          {allEvents.length > 0 && (
            <EventAllListSection
              title="All Events"
              events={allEvents}
              responses={{ isLoading: responses.isLoading, error: errorMessage }}
              pagination={pagination}
              onPageChange={setPage}
            />
          )}
        </>
      )}
      
      <Footer />
    </div>
  );
}
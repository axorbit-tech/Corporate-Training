import Header from "../../../components/user/common/Header"
import Footer from "../../../components/user/common/Footer"
import EventsHeroSection from "../../../components/user/events/EventHeroSection"
import EventListSection from '../../../components/user/events/EventListSection'
import EventAllListSection from "../../../components/user/events/EventAllListSection"
import { useGetEventsQuery } from "../../../store/slices/userApiSlice"

export default function events() {

  const { data: eventData, isLoading, error } = useGetEventsQuery(undefined);
  console.log('eventsssss : ', eventData)
  const allEvents = eventData?.data?.allEvents || []
  const upcomingEvents = eventData?.data?.upcomingEvents || []
  const recentEvents = eventData?.data?.recentEvents || []

  const responses = {
    isLoading,
    error
  }

  return (
    <div className='min-h-screen'>
      <Header />
      <EventsHeroSection />
      {upcomingEvents.length > 0 &&
        <EventListSection title="Upcoming Events" events={upcomingEvents} responses={responses} />
      }
      {recentEvents.length > 0 &&
        <EventListSection title="Recent Events" events={recentEvents} responses={responses} />
      }

      {allEvents.length > 0 &&
        <EventAllListSection title="All Events" events={allEvents} responses={responses} />
      }
      <Footer />
    </div>
  )
}

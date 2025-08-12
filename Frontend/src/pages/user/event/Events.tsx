import Header from "../../../components/user/common/Header"
import Footer from "../../../components/user/common/Footer"
import EventsHeroSection from "../../../components/user/events/EventHeroSection"
import EventListSection from '../../../components/user/events/EventListSection'

export default function events() {
  return (
    <>
    <div className='min-h-screen'>
        <Header/>
        <EventsHeroSection/>
        <EventListSection/>
        <EventListSection/>
        <EventListSection/>
        </div>
        <Footer/>
    </>
  )
}

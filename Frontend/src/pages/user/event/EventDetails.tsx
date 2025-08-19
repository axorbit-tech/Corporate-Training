import Header from '../../../components/user/common/Header'
import Footer from '../../../components/user/common/Footer'
import EventDetailsMainSection from '../../../components/user/events/EventDetailsMainSection'


export default function home() {
    return (
        <div className='min-h-screen'>
            <Header />
            <EventDetailsMainSection />
            <Footer />
        </div>
    )
}

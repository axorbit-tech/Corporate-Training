import Header from "../../../components/user/common/Header"
import Footer from "../../../components/user/common/Footer"
import BookingForm from '../../../components/user/booking/BookingFromSection'

export default function Booking() {
  return (
    <>
    <div className='min-h-screen'>
        <Header/>
        <BookingForm/>
        <Footer/>
        </div>
    </>
  )
}

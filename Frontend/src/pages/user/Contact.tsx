import Header from "../../components/user/common/Header"
import Footer from "../../components/user/common/Footer"
import ContactFormSection from "../../components/user/contact/ContactSection"

export default function Contact() {
  return (
    <>
    <div className='min-h-screen'>
        <Header/>
        <ContactFormSection/>
        <Footer/>
        </div>
    </>
  )
}

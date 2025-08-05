import Header from '../../components/user/Header'
import Hero from '../../components/user/HeroSection'
import Footer from '../../components/user/Footer'
import About from '../../components/user/AboutSection'
import ServiceSection from '../../components/user/ServiceSection'
import WhyChooseUsSection from '../../components/user/whyChooseUsSection'
import TestimonialsSection from '../../components/user/testimonialSection'
import BlogSection from '../../components/user/BlogSection'

export default function home() {
  return (
    <>
        <Header/>
        <Hero/>
        <About/>
        <ServiceSection/>
        <WhyChooseUsSection/>
        <TestimonialsSection/>
        <BlogSection/>
        <Footer/>
    </>
  )
}

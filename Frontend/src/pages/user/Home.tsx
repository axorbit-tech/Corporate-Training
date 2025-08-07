import Header from '../../components/user/Header'
import Hero from '../../components/user/HeroSection'
import Footer from '../../components/user/Footer'
import About from '../../components/user/AboutSection'
import ServiceSection from '../../components/user/ServiceSection'
import TestimonialsSection from '../../components/user/TestimonialSection'
import BlogSection from '../../components/user/BlogSection'
import SolutionsSection from '../../components/user/SolutionsSection'
import BenefitsSection from '../../components/user/BenefitSection'
import MindsetCTASection from '../../components/user/MindsetCTASection'

export default function home() {
  return (
    <>
    <div className='min-h-screen'>
    <Header/>
        <Hero/>
        <SolutionsSection/>
        <BenefitsSection/>
        <About/>
        <MindsetCTASection/>
        <ServiceSection/>
        <TestimonialsSection/>
        <BlogSection/>
        <Footer/>
    </div>
        
    </>
  )
}

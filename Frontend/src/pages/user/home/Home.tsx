import Header from '../../../components/user/common/Header'
import Hero from '../../../components/user/home/HeroSection'
import Footer from '../../../components/user/common/Footer'
import About from '../../../components/user/home/AboutSection'
import ServiceSection from '../../../components/user/home/ServiceSection'
import TestimonialsSection from '../../../components/user/home/TestimonialSection'
import BlogSection from '../../../components/user/home/BlogSection'
import SolutionsSection from '../../../components/user/home/SolutionsSection'
import BenefitsSection from '../../../components/user/home/BenefitSection'
import MindsetCTASection from '../../../components/user/home/MindsetCTASection'

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

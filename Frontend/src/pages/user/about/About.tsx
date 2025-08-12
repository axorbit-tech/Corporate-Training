import Header from '../../../components/user/common/Header'
import Footer from '../../../components/user/common/Footer'
import CompanyStorySection from '../../../components/user/about/CompanyStorySection'
import StatSection from '../../../components/user/about/StatSection'
import MissionVisionSection from '../../../components/user/about/MissionVisionSection'

export default function About() {
  return (
    <>
    <div className='min-h-screen'>
        <Header/>
        <CompanyStorySection/>
        <StatSection/>
        <MissionVisionSection/>
        <Footer/>
    </div>
        
    </>
  )
}

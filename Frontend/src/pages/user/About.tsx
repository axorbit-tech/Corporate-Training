import Header from '../../components/user/common/Header'
import Footer from '../../components/user/common/Footer'
import CompanyStorySection from '../../components/user/about/CompanyStorySection'
import StatSection from '../../components/user/about/StatSection'

export default function home() {
  return (
    <>
    <div className='min-h-screen'>
        <Header/>
        <CompanyStorySection/>
        <StatSection/>
        <Footer/>
    </div>
        
    </>
  )
}

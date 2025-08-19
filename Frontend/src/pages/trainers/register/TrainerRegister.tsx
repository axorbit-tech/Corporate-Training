import Header from '../../../components/user/common/Header'
import Footer from '../../../components/user/common/Footer'
import TrainerRegister from '../../../components/trainer/Register/TrainerRegister'

export default function TrainerRegisterPage() {
  return (
    <>
    <div className='min-h-screen'>
        <Header/>
            <TrainerRegister/>
        <Footer/>
    </div>
        
    </>
  )
}

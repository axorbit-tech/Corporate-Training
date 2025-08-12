import Header from '../../../components/user/common/Header'
import Footer from '../../../components/user/common/Footer'
import BlogDetailsSection from '../../../components/user/blogs/BlogDetailsImageSection'

export default function home() {
    return (
        <>
            <div className='min-h-screen'>
                <Header />
                <BlogDetailsSection />
                <Footer />
            </div>

        </>
    )
}



import Header from "../../components/user/common/Header"
import Footer from "../../components/user/common/Footer"
import BlogHeroSection from "../../components/user/blogs/BlogHeroSection"
import BlogPostsSection from "../../components/user/blogs/BlogPostSection"

export default function Blogs() {
  return (
    <>
    <div className='min-h-screen'>
        <Header/>
        <BlogHeroSection/>
        <BlogPostsSection/>
        <Footer/>
        </div>
    </>
  )
}

import Footer from "../../components/user/common/Footer";
import Header from "../../components/user/common/Header";
import CounsellorsHeroSection from '../../components/user/counsellors/CounsellorHeroSection'
import CounsellorProfileSection from "../../components/user/counsellors/CounsellorsProfileSecion";

export default function Counsellors() {
  return (
    <>
      <div className="min-h-screen">
        <Header />
        <CounsellorsHeroSection />
        <CounsellorProfileSection/>
        <Footer />
      </div>
    </>
  );
}

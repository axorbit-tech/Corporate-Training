import Footer from "../../../components/user/common/Footer";
import Header from "../../../components/user/common/Header";
import ServiceListSection from "../../../components/user/service/ServiceListSection";
import ServicesHeroSection from "../../../components/user/service/ServicesHeroSection";

export default function services() {
  return (
    <>
      <div className="min-h-screen">
        <Header />
        <ServicesHeroSection />
        <ServiceListSection />
        <Footer />
      </div>
    </>
  );
}

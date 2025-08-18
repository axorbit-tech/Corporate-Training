import Footer from "../../../components/user/common/Footer";
import Header from "../../../components/user/common/Header";
import ServiceDetails from "../../../components/user/service/ServiceDetails"


export default function services() {
  return (
    <>
      <div className="min-h-screen">
        {/* <Header /> */}
        <ServiceDetails />
        <Footer />
      </div>
    </>
  );
}

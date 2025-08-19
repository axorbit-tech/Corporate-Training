import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./routers/ProtectedRoutes";
import Home from "./pages/user/home/Home";
import About from "./pages/user/about/About";

import Services from "./pages/user/service/Services";
import Events from "./pages/user/event/Events";
import Blogs from "./pages/user/blog/Blogs";
import Counsellors from "./pages/user/counsellors/Counsellors";
import Booking from "./pages/user/booking/Booking";

import ServiceDetails from "./pages/user/service/ServiceDetails"
import BlogDetails from "./pages/user/blog/BlogDetails";
import EventDetails from "./pages/user/event/EventDetails";
import Contact from "./pages/user/contact/Contact";
import AdminDashboardPage from "./pages/admin/Dashboard";
import AdminBlogListingPage from "./pages/admin/blog/BlogListing";
import AdminAddBlogPage from "./pages/admin/blog/AddBlog";
import AdminBlogDetailsPage from "./pages/admin/blog/BlogDetails";
import AddEvent from "./pages/admin/event/AddEvent";
import AdminEventDetailsPage from "./pages/admin/event/EventDetails";
import AdminEventListingPage from "./pages/admin/event/EventListing";
import AdminAddServicePage from "./pages/admin/service/AddService";
import AdminServiceListing from "./pages/admin/service/ServiceListing";
import AdminServiceDetailsPage from "./pages/admin/service/ServiceDetails";
import AdminEditServicePage from "./pages/admin/service/EditService";
import AdminLoginPage from "./pages/admin/auth/AdminLogin";
import AdminEditBlogPage from "./pages/admin/blog/EditBlog";
import AdminEditEventPage from "./pages/admin/event/EditEvent";
import AdminClientListingPage from "./pages/admin/client/ClientListing";
import TrainerRegisterPage from "./pages/trainers/register/TrainerRegister";


function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Userside Details Pages */}
          <Route path="/event-details/:id" element={<EventDetails />} />
          <Route path="/services-details/:id" element={<ServiceDetails />} />
          <Route path="/blog-details/:id" element={<BlogDetails />} />
          

          <Route path="/services" element={<Services />} />
          <Route path="/events" element={<Events />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/counsellors" element={<Counsellors />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/trainer-registration" element={<TrainerRegisterPage />} />

          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/blogs" element={<AdminBlogListingPage />} />
          <Route path="/admin/add-blog" element={<AdminAddBlogPage />} />
          <Route path="/admin/blog-details/:id" element={<AdminBlogDetailsPage />} />
          <Route path="/admin/edit-blog/:id" element={<AdminEditBlogPage />} />
          <Route
            path="/admin/blog-details"
            element={<AdminBlogDetailsPage />}
          />

          <Route path="/admin/events" element={<AdminEventListingPage />} />
          <Route path="/admin/add-event" element={<AddEvent />} />
          <Route
            path="/admin/event-details/:id"
            element={<AdminEventDetailsPage />}
          />
          <Route path="/admin/edit-event/:id" element={<AdminEditEventPage />} />

          <Route path="/admin/services" element={<AdminServiceListing />} />
          <Route path="/admin/add-service" element={<AdminAddServicePage />} />
          <Route
            path="/admin/service-details/:id"
            element={<AdminServiceDetailsPage />}
          />
          <Route
            path="/admin/edit-service/:id"
            element={<AdminEditServicePage />}
          />


          <Route path="/admin/clients" element={<AdminClientListingPage />} />

          <Route path="/admin/login" element={<AdminLoginPage />} />

          <Route element={<ProtectedRoute />}>
            {/* <Route path="/admin" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/addServices" element={<AddServices />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/addSolutions" element={<AddSolutions />} />
            <Route path="/whyUs" element={<WhyUs />} />
            <Route path="/changePass" element={<ChangePass />} /> */}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

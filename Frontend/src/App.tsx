import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routers/ProtectedRoutes";
import PublicRoute from "./routers/PublicRoutes";
import Home from "./pages/user/Home";

import About from './pages/user/About';
import BlogDetails from './pages/user/BlogDetails';

import Services from './pages/user/Services'
import Events from './pages/user/Events'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/blog-details/id" element={<BlogDetails />} />

          <Route path="/services" element={<Services />} />
          <Route path="/events" element={<Events />} />

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

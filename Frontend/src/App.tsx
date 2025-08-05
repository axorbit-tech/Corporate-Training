import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routers/ProtectedRoutes";
import PublicRoute from "./routers/PublicRoutes";
import Home from "./pages/user/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PublicRoute />}>
            {/* <Route path="/login" element={<Login />} />
            <Route path="/resetPassword/:token" element={<ResetPassword />} /> */}
          </Route>
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

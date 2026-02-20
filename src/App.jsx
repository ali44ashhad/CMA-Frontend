import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer"; 
import PracticePapers from "./pages/PracticePapers";
import MockTests from "./pages/MockTests"; 
import FaqPage from "./pages/FaqPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import RefundPolicy from "./pages/RefundPolicy";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/student/StudentDashboard";
import EvaluatorDashboard from "./pages/evaluator/EvaluatorDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentRoute from "./routes/StudentRoute";
import AdminRoute from "./routes/AdminRoute";
import EvaluatorRoute from "./routes/EvaluatorRoute"; 
import Foundation from "./pages/Foundation";
import Intermediate from "./pages/Intermediate";
import Final from "./pages/Final";

const App = () => (
  <>
    <ScrollToTop />
    <Header />

    <Routes>
      <Route path="/" element={<Home />} />  
      <Route path="/foundation" element={<Foundation />} />
      <Route path="/intermediate" element={<Intermediate />} />
      <Route path="/final" element={<Final />} />
      <Route path="/practice-papers" element={<PracticePapers />} />
      <Route path="/mock-tests" element={<MockTests />} /> 
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/refund" element={<RefundPolicy />} />
      {/* Role-based dashboards */}
      <Route
        path="/student/dashboard"
        element={
          <StudentRoute>
            <StudentDashboard />
          </StudentRoute>
        }
      />
      <Route
        path="/evaluator/dashboard"
        element={
          <EvaluatorRoute>
            <EvaluatorDashboard />
          </EvaluatorRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>

    <Footer />
  </>
);

export default App;
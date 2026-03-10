import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";   
import About from "./pages/About";
import Contact from "./pages/Contact"; 
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/student/StudentDashboard";
import EvaluatorDashboard from "./pages/evaluator/EvaluatorDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentRoute from "./routes/StudentRoute";
import AdminRoute from "./routes/AdminRoute";
import EvaluatorRoute from "./routes/EvaluatorRoute";  
const App = () => (
  <>
    <ScrollToTop />
    <Header />

    <Routes>
      <Route path="/" element={<Home />} />   
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} /> 
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
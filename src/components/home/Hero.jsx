import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Hero = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (!isAuthenticated || !user) {
      navigate("/login");
      return;
    }
    if (user.role === "admin") navigate("/admin/dashboard");
    else if (user.role === "evaluator") navigate("/evaluator/dashboard");
    else navigate("/student/dashboard");
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-[#137952]/5 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-r from-[#137952]/5 to-purple-500/5 transform -skew-y-3 -translate-y-20" />

      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32">

        {/* 🔹 Badge (Separated) */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#137952]/10 to-[#137952]/5 border border-[#137952]/30 rounded-full">
            <div className="w-2 h-2 bg-[#137952] rounded-full animate-pulse" />
            <span className="text-sm font-medium text-[#137952]">
              #1 CMA Test Series Platform
            </span>
          </div>
        </div>

        {/* 🔹 Grid starts AFTER badge */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">

          {/* Left Section */}
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Ace Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#137952] to-[#0d5c3d] mt-2">
                CMA Exams with Rank-Level Preparation
              </span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              India&apos;s only exclusive test series for CMA students — delivering exam-oriented preparation that builds real exam confidence.
              Start practicing today and evaluate your performance before the actual results.
              Get real exam simulation, detailed analytics, and expert guidance.
            </p>

            <button
              type="button"
              onClick={handleGetStarted}
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#137952] to-[#0d5c3d] hover:from-[#0d5c3d] hover:to-[#0a4a2e] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Get Started
            </button>
          </div>

          {/* Right Section */}
          <div>
            <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-4 py-3 bg-gray-900 text-white text-center text-xs sm:text-sm font-semibold">
                Why Our Structure is Better Than Others ?
              </div>

              <div className="overflow-x-auto text-xs sm:text-sm">
              <table className="w-full border-t border-gray-200 text-sm">
  <thead>
    <tr className="bg-gray-100 text-gray-900">
      <th className="px-4 py-3 text-left font-semibold border border-gray-300">
        Chapterwise Test Series
      </th>
      <th className="px-4 py-3 text-left font-semibold border border-gray-300">
        Detailed Test Series
      </th>
      <th className="px-4 py-3 text-left font-semibold border border-gray-300 bg-emerald-200">
        Our Smart Trend Model
      </th>
    </tr>
  </thead>

  <tbody className="text-gray-800">
    <tr>
      <td className="px-4 py-3 border border-gray-300">
        One test for every chapter
      </td>
      <td className="px-4 py-3 border border-gray-300">
        Multiple chapters grouped without relevance logic
      </td>
      <td className="px-4 py-3 border border-gray-300 bg-emerald-100">
        High-relevance chapters as individual tests low-relevance chapters grouped
      </td>
    </tr>

    <tr>
      <td className="px-4 py-3 border border-gray-300">
        All chapters treated equally
      </td>
      <td className="px-4 py-3 border border-gray-300">
        All chapters treated equally
      </td>
      <td className="px-4 py-3 border border-gray-300 bg-emerald-100">
        Importance-based chapter treatment
      </td>
    </tr>

    <tr>
      <td className="px-4 py-3 border border-gray-300">
        Low-weightage chapters also separate tests
      </td>
      <td className="px-4 py-3 border border-gray-300">
        Random grouping of chapters
      </td>
      <td className="px-4 py-3 border border-gray-300 bg-emerald-100">
        Low-relevance chapters smart-grouped
      </td>
    </tr>

    <tr>
      <td className="px-4 py-3 border border-gray-300">
        No past exam analysis
      </td>
      <td className="px-4 py-3 border border-gray-300">
        No past exam analysis
      </td>
      <td className="px-4 py-3 border border-gray-300 bg-emerald-100">
        Designed using deep past trend analysis
      </td>
    </tr>
  </tbody>
</table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
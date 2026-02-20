import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MockTests = () => {
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

  const levels = [
    {
      title: "Foundation Mocks",
      desc: "Balanced mix of conceptual and numerical questions aligned to the Foundation syllabus.",
      bg: "bg-[#137952]/10",
      border: "border-[#137952]/20",
      text: "text-[#0d5c3d]",
    },
    {
      title: "Intermediate Mocks",
      desc: "Group-wise mocks with chapter coverage tracking and evaluator feedback.",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-800",
    },
    {
      title: "Final Mocks",
      desc: "Case-study and application-oriented tests with detailed evaluator comments.",
      bg: "bg-violet-50",
      border: "border-violet-200",
      text: "text-violet-800",
    },
  ];

  const benefits = [
    "Simulated exam environment with fixed duration and strict timers",
    "Instant scorecard with section-wise and topic-wise analysis",
    "Peer comparison and percentile insights",
    "Review mode with correct answers, solutions, and explanations",
    "Evaluator-checked descriptive answers with feedback",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background – same as site theme */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-r from-[#137952]/5 to-purple-500/5 transform -skew-y-3 -translate-y-12" />
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="mock-tests-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mock-tests-grid)" />
        </svg>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#137952]/10 to-[#137952]/5 border border-[#137952]/30 rounded-full mb-6">
            <div className="w-2 h-2 bg-[#137952] rounded-full animate-pulse" />
            <span className="text-sm font-medium text-[#137952]">Exam-style tests</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Mock{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#137952] to-[#0d5c3d]">
              Tests
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Attempt exam-style mocks with real-time evaluation, detailed analytics, and expert feedback.
          </p>
        </div>

        {/* Level cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {levels.map((level) => (
            <div
              key={level.title}
              className={`rounded-2xl border p-6 ${level.bg} ${level.border} hover:shadow-lg transition-shadow`}
            >
              <h2 className={`text-lg font-semibold ${level.text}`}>{level.title}</h2>
              <p className="mt-2 text-sm text-gray-600">{level.desc}</p>
            </div>
          ))}
        </div>

        {/* How it helps */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">How our mock tests help you</h2>
          <ul className="space-y-3">
            {benefits.map((item) => (
              <li key={item} className="flex items-start gap-3 text-gray-700">
                <span className="mt-1 w-5 h-5 rounded-full bg-[#137952]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-[#137952]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={handleGetStarted}
            className="inline-flex items-center px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#137952] to-[#0d5c3d] hover:from-[#0d5c3d] hover:to-[#0a4a2e] shadow-md hover:shadow-lg transition-all"
          >
            Start your first mock test
          </button>
        </div>
      </div>
    </div>
  );
};

export default MockTests;

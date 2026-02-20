import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PracticePapers = () => {
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background – same as site theme */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-r from-[#137952]/5 to-purple-500/5 transform -skew-y-3 -translate-y-12" />
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="practice-papers-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#practice-papers-grid)" />
        </svg>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#137952]/10 to-[#137952]/5 border border-[#137952]/30 rounded-full mb-6">
            <div className="w-2 h-2 bg-[#137952] rounded-full animate-pulse" />
            <span className="text-sm font-medium text-[#137952]">Build strength before the exam</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Practice{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#137952] to-[#0d5c3d]">
              Papers
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Chapter-wise and full-length papers to strengthen concepts, improve accuracy, and get exam-ready.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#137952]/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#137952]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Chapter-wise Practice</h2>
            <p className="mt-2 text-gray-600">
              Target specific chapters with focused question sets and step-by-step solutions aligned to the CMA syllabus.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 w-4 h-4 rounded-full bg-[#137952]/10 flex items-center justify-center flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#137952]" />
                </span>
                Concept-building questions with explanations
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-4 h-4 rounded-full bg-[#137952]/10 flex items-center justify-center flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#137952]" />
                </span>
                Sectional tests with timers
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-4 h-4 rounded-full bg-[#137952]/10 flex items-center justify-center flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#137952]" />
                </span>
                Instant feedback and detailed solutions
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#137952]/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#137952]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Full-Length Papers</h2>
            <p className="mt-2 text-gray-600">
              Simulate the real exam with full-length papers and a detailed performance breakdown by section and topic.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 w-4 h-4 rounded-full bg-[#137952]/10 flex items-center justify-center flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#137952]" />
                </span>
                Exam-like pattern and difficulty
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-4 h-4 rounded-full bg-[#137952]/10 flex items-center justify-center flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#137952]" />
                </span>
                Time management analytics
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 w-4 h-4 rounded-full bg-[#137952]/10 flex items-center justify-center flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#137952]" />
                </span>
                Section-wise strength & weakness report
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={handleGetStarted}
            className="inline-flex items-center px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#137952] to-[#0d5c3d] hover:from-[#0d5c3d] hover:to-[#0a4a2e] shadow-md hover:shadow-lg transition-all"
          >
            Get started with practice papers
          </button>
        </div>
      </div>
    </div>
  );
};

export default PracticePapers;

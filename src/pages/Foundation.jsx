import React from "react";
import { Link } from "react-router-dom";

const Foundation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-r from-[#137952]/5 to-purple-500/5 transform -skew-y-3 -translate-y-12"></div>

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="foundation-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#foundation-grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#137952]/10 to-[#137952]/5 border border-[#137952]/30 rounded-full mb-6">
            <div className="w-2 h-2 bg-[#137952] rounded-full animate-pulse" />
            <span className="text-sm font-medium text-[#137952]">Foundation (Free)</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Start Your CMA Journey
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#137952] to-[#0d5c3d]">
              With Free Foundation Tests
            </span>
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Build strong basics in Accounts, Law, Economics and Maths with our free CMA Foundation test
            series and smart analytics.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/student/dashboard"
              className="px-6 py-3 bg-gradient-to-r from-[#137952] to-[#0d5c3d] text-white font-semibold rounded-xl shadow-lg hover:from-[#0d5c3d] hover:to-[#0a4a2e] transition-all"
            >
              Go to Student Dashboard
            </Link> 
          </div>
        </div>

        {/* Stats / Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Free Access</h3>
            <p className="text-3xl font-bold text-gray-900 mb-1">₹0</p>
            <p className="text-sm text-gray-600">
              Take unlimited Foundation mock tests without paying anything. Just create your account and start.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Exam-style Questions</h3>
            <p className="text-3xl font-bold text-gray-900 mb-1">4</p>
            <p className="text-sm text-gray-600">
              Papers covered: Economics & Management, Accounting, Laws & Ethics, Maths & Statistics.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Smart Analytics</h3>
            <p className="text-3xl font-bold text-gray-900 mb-1">Topic-wise</p>
            <p className="text-sm text-gray-600">
              See strengths and weak areas by chapter to plan your revision effectively.
            </p>
          </div>
        </div>

        {/* What you get */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 lg:p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What&apos;s included in Foundation (Free)</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <ul className="space-y-2 text-gray-700">
              <li>✓ Chapter-wise MCQ tests for all 4 papers</li>
              <li>✓ Full-length mock tests with real exam pattern</li>
              <li>✓ Instant results with detailed solutions</li>
              <li>✓ Performance tracking across attempts</li>
            </ul>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Time-bound practice to build speed & accuracy</li>
              <li>✓ Foundation-friendly UI with clear analytics</li>
              <li>✓ Aligned with latest CMA Institute syllabus</li>
              <li>✓ Upgrade path to Intermediate & Final packages</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Foundation;


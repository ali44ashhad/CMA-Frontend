import React from "react";
import { Link } from "react-router-dom";

const Intermediate = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-r from-purple-500/10 to-[#137952]/10 transform -skew-y-3 -translate-y-12"></div>

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="intermediate-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#intermediate-grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/15 to-purple-500/10 border border-purple-300/70 rounded-full mb-6">
            <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-purple-700">Intermediate</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Master CMA Intermediate
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-[#137952]">
              With Structured Test Series
            </span>
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Strengthen your concepts in Accounting, Law, Tax and Costing with exam-focused mock tests and detailed analytics.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/pricing"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:from-purple-700 hover:to-purple-800 transition-all"
            >
              View Intermediate Packages
            </Link>
           
          </div>
        </div>

        {/* Stats / Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Two Groups, 8 Papers</h3>
            <p className="text-3xl font-bold text-gray-900 mb-1">Group I & II</p>
            <p className="text-sm text-gray-600">
              Full coverage of both groups with topic-wise and full-length mock tests.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Smart Planning</h3>
            <p className="text-3xl font-bold text-gray-900 mb-1">Roadmap</p>
            <p className="text-sm text-gray-600">
              Suggested order, weightage-based focus, and repeated-topic analysis from past attempts.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Performance Tracking</h3>
            <p className="text-3xl font-bold text-gray-900 mb-1">Group-wise</p>
            <p className="text-sm text-gray-600">
              Separate analytics for each group so you know when you&apos;re exam-ready.
            </p>
          </div>
        </div>

        {/* What you get */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 lg:p-8 shadow-xl mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Intermediate Test Series Features</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <ul className="space-y-2 text-gray-700">
              <li>✓ Chapter-wise and unit-wise tests for all 8 papers</li>
              <li>✓ Full syllabus mock tests for Group I and Group II</li>
              <li>✓ Time-bound tests simulating real exam environment</li>
              <li>✓ Detailed solutions and marking guidance</li>
            </ul>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Topic-wise performance heatmaps</li>
              <li>✓ Rank / percentile based on other students</li>
              <li>✓ Foundation-level recap for weak students</li>
              <li>✓ Priority support for doubts & technical issues</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Ready to start Intermediate preparation?</h3>
              <p className="text-xs text-gray-600">
                Buy an Intermediate package, then go to Student Dashboard → Available Exams to start tests from that package.
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all"
              >
                Login / Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intermediate;


import React from "react";
import { Link } from "react-router-dom";

const Final = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 transform -skew-y-3 -translate-y-12"></div>

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="final-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#final-grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600/15 to-teal-500/10 border border-emerald-300/70 rounded-full mb-6">
            <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-emerald-700">Final</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Crack CMA Final
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              With Case-study Focused Tests
            </span>
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Advanced level test series for Corporate Laws, Strategic Finance, Taxation and Performance Management to
            prepare you for the final step of CMA qualification.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/pricing"
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:from-emerald-700 hover:to-teal-700 transition-all"
            >
              View Final Packages
            </Link>
          
          </div>
        </div>

        {/* Stats / Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Highest Level</h3>
            <p className="text-3xl font-bold text-gray-900 mb-1">8 Papers</p>
            <p className="text-sm text-gray-600">
              Two groups covering advanced financial management, corporate laws, strategic cost & performance.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Case Study Emphasis</h3>
            <p className="text-3xl font-bold text-gray-900 mb-1">40–50%</p>
            <p className="text-sm text-gray-600">
              Special focus on application-based questions and integrated case studies as per latest pattern.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Job-ready Skills</h3>
            <p className="text-3xl font-bold text-gray-900 mb-1">Practical</p>
            <p className="text-sm text-gray-600">
              Questions aligned with industry scenarios, boardroom decisions and real finance problems.
            </p>
          </div>
        </div>

        {/* What you get */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 lg:p-8 shadow-xl mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Final Test Series Features</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <ul className="space-y-2 text-gray-700">
              <li>✓ Case-study oriented mock tests for all 8 papers</li>
              <li>✓ Integrated questions across subjects (law + finance + strategy)</li>
              <li>✓ Time management drills for long paper pattern</li>
              <li>✓ Detailed evaluator feedback on subjective answers (where applicable)</li>
            </ul>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Rank / percentile and comparison with toppers</li>
              <li>✓ Exam trend analysis for last few attempts</li>
              <li>✓ Revision-oriented tests close to exam date</li>
              <li>✓ Priority support for technical and content queries</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Finish strong with the right strategy</h3>
              <p className="text-xs text-gray-600">
                Plan backwards from exam date – use Foundation & Intermediate analytics to decide which areas need
                extra focus at Final level.
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                to="/student/dashboard"
                className="px-4 py-2 text-sm bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Final;


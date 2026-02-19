import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import EvaluatorProfile from "./EvaluatorProfile";
import EvaluatorAssignments from "./EvaluatorAssignments";

const EvaluatorDashboard = () => {
  const { user, accessToken, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("assignments");

  const renderContent = () => {
    if (!accessToken) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Authentication Required
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            No evaluator token found. Please login again.
          </p>
          <button
            onClick={logout}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#137952] to-[#0d5c3d] text-white font-medium rounded-xl hover:from-[#0d5c3d] hover:to-[#0a4a2e] transition-all shadow-lg"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            Go to Login
          </button>
        </div>
      );
    }

    if (activeTab === "profile") {
      return <EvaluatorProfile user={user} />;
    }

    if (activeTab === "assignments") {
      return <EvaluatorAssignments accessToken={accessToken} />;
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-r from-[#137952]/5 to-purple-500/5 transform -skew-y-3 -translate-y-12" />
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="eval-dashboard-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#eval-dashboard-grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#137952]/10 to-[#137952]/5 border border-[#137952]/30 rounded-full mb-4">
            <div className="w-2 h-2 bg-[#137952] rounded-full animate-pulse" />
            <span className="text-sm font-medium text-[#137952]">
              Evaluator Dashboard
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Welcome back,
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#137952] to-[#0d5c3d]">
                  {user?.name || "Evaluator"} 👋
                </span>
              </h1>
              <p className="text-gray-600">
                Review assigned answer sheets, accept or reject assignments, and
                submit evaluations.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-[#137952]/80 to-[#137952] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {user?.name?.charAt(0) || "E"}
                </div>
                <div>
                  <div className="text-sm text-gray-500">Logged in as</div>
                  <div className="font-semibold text-gray-900">
                    {user?.email || "evaluator@example.com"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-80">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-[#137952] to-[#0d5c3d] px-6 py-5">
                <h2 className="text-lg font-semibold text-white mb-1">
                  Evaluator Panel
                </h2>
                <p className="text-sm text-white/90 opacity-90">
                  Manage your evaluations
                </p>
              </div>
              <nav className="p-4">
                <div className="space-y-2">
                  {[
                    {
                      id: "assignments",
                      label: "Assignments",
                      icon: "M9 12h6m-6 4h6M5 8h14M9 4h6m2 0a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2",
                    },
                    {
                      id: "profile",
                      label: "Profile",
                      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
                    },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-[#137952]/10 to-[#137952]/20 border border-[#137952]/30 text-[#137952]"
                          : "text-gray-700 hover:bg-gray-50 hover:border-gray-200 border border-transparent"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          activeTab === tab.id
                            ? "bg-gradient-to-r from-[#137952] to-[#0d5c3d] text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={tab.icon}
                          />
                        </svg>
                      </div>
                      <span className="flex-1 text-left">{tab.label}</span>
                      {activeTab === tab.id && (
                        <div className="w-1.5 h-1.5 bg-[#137952] rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="bg-gradient-to-br from-[#137952]/10 to-emerald-50 rounded-xl p-4">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Quick Tip
                    </h4>
                    <p className="text-xs text-gray-600">
                      Accept pending assignments, then upload your checked PDF
                      with marks and remarks from the Assignments tab.
                    </p>
                  </div>
                </div>
              </nav>
            </div>
          </aside>

          <main className="flex-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 lg:p-8">
              {renderContent()}
            </div>
          </main>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Need help? Contact support at{" "}
            <a
              href="mailto:support@cmatestseries.com"
              className="text-[#137952] hover:text-[#0d5c3d] font-medium"
            >
              support@cmatestseries.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EvaluatorDashboard;

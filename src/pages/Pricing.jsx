import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Index PDF opens in Google Drive (not WhatsApp). Prefer .env: VITE_INDEX_PDF_URL=your_link
// Or paste the same link below as a fallback:
const INDEX_PDF_URL_INLINE = "https://drive.google.com/file/d/19yVdckx1fY3YyE1kG13Ea_82Y6wF7_13/view?usp=sharing";

const INDEX_PDF_URL =
  (import.meta.env.VITE_INDEX_PDF_URL && String(import.meta.env.VITE_INDEX_PDF_URL).trim()) ||
  (typeof INDEX_PDF_URL_INLINE === "string" && INDEX_PDF_URL_INLINE.trim()) ||
  "";

const Pricing = () => {
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

  const plans = [
    {
      name: "Foundation",
      level: "Foundation",
      price: "₹0",
      period: "per attempt",
      highlight: "Best for first-time CMA aspirants",
      features: [
        "Full syllabus mock test",  
        "Detailed performance analytics",
        "Section-wise strength",
        "AI-based time management insights",
        "Exam pattern based mock tests"
        
      ],
      badge: "Popular for Foundation",
      color: "from-[#137952] to-[#0d5c3d]",
    },
    {
      name: "Intermediate",
      level: "Intermediate",
      price: "₹1,499",
      period: "per attempt",
      highlight: "Ideal for serious CMA candidates",
      features: [
        "2 full syllabus mock tests",
        "Topic-wise mini tests",
        "Evaluator feedback with remarks",
        "WhatsApp / Email performance report",
        "Priority doubt resolution support",
      ],
      badge: "Coming soon",
      color: "from-gray-400 to-gray-500",
      comingSoon: true,
    },
    {
      name: "Final",
      level: "Final",
      price: "₹1,499",
      period: "per Group",
      individualPaperLabel: "Individual paper",
      individualPaperPrice: "₹500",
      highlight: "For rank-oriented CMA Final students",
      features: [
        "Full syllabus mock test",
        "Topic Wise test",
        "Detailed performance analytics",
        "AI-based time management insights",
        "Exam pattern based mock tests",
      ],
      badge: "For Rank Aspirants",
      color: "from-emerald-500 to-emerald-600",
      showIndexPdf: true,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Background Elements - same pattern as other static pages */}
      <div className="absolute top-0 left-0 right-0 h-64  transform -skew-y-3 -translate-y-12" />
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#137952]/10 to-[#137952]/5 border border-[#137952]/30 rounded-full mb-6">
            <div className="w-2 h-2 bg-[#137952] rounded-full animate-pulse" />
            <span className="text-sm font-medium text-[#137952]">
              Transparent & Student-Friendly Pricing
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Choose the{" "}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#137952] to-[#0d5c3d]">
              Perfect Plan
            </span>
            for Your CMA Journey
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            No hidden fees. No confusing bundles. Just clear, outcome-driven pricing designed
            specifically for CMA Foundation, Intermediate, and Final students.
          </p>
        </div>

        {/* Quick USP Banner */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 lg:p-8 mb-16">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#137952]/10 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-[#137952]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Real exam pattern-based mock tests
                </p>
                <p className="text-xs text-gray-500">Set by experienced CMA faculties</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Evaluator checked answer sheets
                </p>
                <p className="text-xs text-gray-500">Get detailed remarks and improvement tips</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Data-driven performance analytics
                </p>
                <p className="text-xs text-gray-500">Know exactly where you stand</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mb-20">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-6 lg:p-8 flex flex-col ${
                  plan.comingSoon
                    ? "bg-gray-100 border-gray-300 shadow-md opacity-95"
                    : plan.featured
                      ? "bg-white border-[#137952] shadow-2xl scale-[1.02]"
                      : "bg-white border-gray-200 shadow-lg"
                }`}
              >
                {plan.badge && (
                  <div
                    className={`absolute -top-3 left-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${plan.color}`}
                  >
                    {plan.badge}
                  </div>
                )}

                <div className="mb-4">
                  <p
                    className={`text-xs font-semibold uppercase tracking-wide ${
                      plan.comingSoon ? "text-gray-500" : "text-[#137952]"
                    }`}
                  >
                    {plan.level}
                  </p>
                  <h3
                    className={`text-xl font-bold mt-1 mb-2 ${
                      plan.comingSoon ? "text-gray-600" : "text-gray-900"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${plan.comingSoon ? "text-gray-500" : "text-gray-600"}`}>
                    {plan.highlight}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`text-3xl font-bold ${
                        plan.comingSoon ? "text-gray-500" : "text-gray-900"
                      }`}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={`text-xs text-gray-500 ${
                        String(plan.level).toLowerCase() === "final"
                          ? "font-extrabold"
                          : "font-normal"
                      }`}
                    >
                      {plan.period}
                    </span>
                  </div>
                  {plan.individualPaperPrice && (
                    <p
                      className={`text-sm mt-2 ${
                        plan.comingSoon ? "text-gray-500" : "text-gray-700"
                      }`}
                    >
                      <span className={plan.comingSoon ? "text-gray-500" : "text-gray-600"}>
                        {plan.individualPaperLabel ?? "Individual paper"}:{" "}
                      </span>
                      <span
                        className={`font-semibold ${
                          plan.comingSoon ? "text-gray-600" : "text-emerald-700"
                        }`}
                      >
                        {plan.individualPaperPrice}
                      </span>
                    </p>
                  )}
                </div>

                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-2 text-sm ${
                        plan.comingSoon ? "text-gray-500" : "text-gray-700"
                      }`}
                    >
                      <span
                        className={`mt-1 w-4 h-4 rounded-full flex items-center justify-center ${
                          plan.comingSoon ? "bg-gray-200" : "bg-[#137952]/10"
                        }`}
                      >
                        <svg
                          className={`w-3 h-3 ${plan.comingSoon ? "text-gray-400" : "text-[#137952]"}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.comingSoon ? (
                  <button
                    type="button"
                    disabled
                    className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl text-sm font-semibold text-gray-500 bg-gray-200 border border-gray-300 cursor-not-allowed"
                  >
                    Coming soon
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleGetStarted}
                    className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#137952] to-[#0d5c3d] hover:from-[#0d5c3d] hover:to-[#0a4a2e] shadow-md hover:shadow-lg transition-all"
                  >
                    Get Started
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                )}

                {plan.showIndexPdf && !plan.comingSoon && INDEX_PDF_URL && (
                  <a
                    href={INDEX_PDF_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-[#137952] border border-[#137952]/35 bg-[#137952]/5 hover:bg-[#137952]/10 transition-all"
                  >
                    <svg
                      className="w-5 h-5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Get index (PDF)
                  </a>
                )}

                <p
                  className={`mt-3 text-[11px] text-center ${
                    plan.comingSoon ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Prices inclusive of all taxes. Payment powered by secure Razorpay gateway.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ / Note Section */}
        <div className="bg-gradient-to-r from-[#137952]/10 to-indigo-50 rounded-2xl border border-[#137952]/20 p-6 lg:p-8">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Need a Custom Plan?</h2>
              <p className="text-sm text-gray-600 mb-4">
                Coaching institutes or batch bookings (10+ students) can get special pricing with
                dedicated reports and admin dashboard access.
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-4 h-4 rounded-full bg-[#137952] text-white text-[10px] flex items-center justify-center">
                    i
                  </span>
                  <span>Institute-wise performance tracking available on request.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 w-4 h-4 rounded-full bg-[#137952] text-white text-[10px] flex items-center justify-center">
                    %
                  </span>
                  <span>Attractive discounts for early bird and repeat students.</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Frequently Asked Pricing Questions
              </h3>
              <div className="space-y-3 text-xs text-gray-700">
                <div>
                  <p className="font-medium text-gray-900">Is this price per subject or group?</p>
                  <p className="text-gray-600">
                    Pricing shown is typically per subject / attempt. For group or combo offers,
                    please check current offers on the Test Series page.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Are there any hidden charges?</p>
                  <p className="text-gray-600">
                    No. All taxes and payment gateway charges are included. You only pay what is
                    shown on the checkout page.
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Do you offer refunds?</p>
                  <p className="text-gray-600">
                    Refunds are governed as per our official{" "}
                    <span className="underline">Refund Policy</span>. Please read it carefully
                    before making a purchase.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;


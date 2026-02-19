import React from "react";

const Pricing = () => {
  const plans = [
    {
      name: "Foundation Starter",
      level: "Foundation",
      price: "₹899",
      period: "per attempt",
      highlight: "Best for first-time CMA aspirants",
      features: [
        "Full syllabus mock test (Objective + Descriptive)",
        "Detailed performance analytics",
        "Section-wise strength / weakness report",
        "1-time evaluator checked answer sheet",
        "AI-based time management insights",
      ],
      badge: "Popular for Foundation",
      color: "from-[#137952] to-[#0d5c3d]",
    },
    {
      name: "Intermediate Pro",
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
      badge: "Most Popular",
      color: "from-indigo-500 to-indigo-700",
      featured: true,
    },
    {
      name: "Final Ranker",
      level: "Final",
      price: "₹1,999",
      period: "per attempt",
      highlight: "For rank-oriented CMA Final students",
      features: [
        "Exam pattern based mock tests",
        "Question-wise marking scheme",
        "Evaluator comments for improvement",
        "Leaderboard & comparative analysis",
        "Revision test before actual exam",
      ],
      badge: "For Rank Aspirants",
      color: "from-emerald-500 to-emerald-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Background Elements - same pattern as other static pages */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-r from-[#137952]/5 to-purple-500/5 transform -skew-y-3 -translate-y-12" />
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
                className={`relative bg-white rounded-2xl border ${
                  plan.featured ? "border-[#137952] shadow-2xl scale-[1.02]" : "border-gray-200 shadow-lg"
                } p-6 lg:p-8 flex flex-col`}
              >
                {plan.badge && (
                  <div
                    className={`absolute -top-3 left-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${plan.color}`}
                  >
                    {plan.badge}
                  </div>
                )}

                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#137952]">
                    {plan.level}
                  </p>
                  <h3 className="text-xl font-bold text-gray-900 mt-1 mb-2">{plan.name}</h3>
                  <p className="text-sm text-gray-600">{plan.highlight}</p>
                </div>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-xs text-gray-500">{plan.period}</span>
                </div>

                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-1 w-4 h-4 rounded-full bg-[#137952]/10 flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-[#137952]"
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

                <button className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#137952] to-[#0d5c3d] hover:from-[#0d5c3d] hover:to-[#0a4a2e] shadow-md hover:shadow-lg transition-all">
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

                <p className="mt-3 text-[11px] text-gray-500 text-center">
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


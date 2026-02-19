import { useState } from 'react';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Background Elements - Consistent with theme */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-r from-[#137952]/5 to-purple-500/5 transform -skew-y-3 -translate-y-12"></div>
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#137952]/10 to-[#137952]/5 border border-[#137952]/30 rounded-full mb-6">
            <div className="w-2 h-2 bg-[#137952] rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-[#137952]">
              Your Privacy Matters
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Privacy
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#137952] to-[#0d5c3d]">
              Policy
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are committed to protecting your personal data and respecting your privacy. 
            This policy explains how we collect, use, and safeguard your information when you use our CMA test series platform.
          </p>
        </div>

        {/* Last Updated Banner */}
        <div className="bg-gradient-to-r from-[#137952]/10 to-indigo-50 rounded-2xl border border-[#137952]/30 p-6 mb-12 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center gap-3 mb-3 sm:mb-0">
            <div className="w-10 h-10 bg-[#137952]/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-[#137952]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <span className="text-sm text-gray-600">Last Updated:</span>
              <span className="ml-2 font-semibold text-gray-900">February 15, 2024</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">GDPR & DPDPA Compliant</span>
          </div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 bg-gradient-to-r from-[#137952] to-[#0d5c3d]">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  Policy Sections
                </h3>
              </div>
              <nav className="p-4 space-y-1">
                {[
                  { id: 'introduction', label: 'Introduction', icon: '📋' },
                  { id: 'information', label: 'Information We Collect', icon: '📊' },
                  { id: 'usage', label: 'How We Use Information', icon: '⚙️' },
                  { id: 'sharing', label: 'Information Sharing', icon: '🔄' },
                  { id: 'cookies', label: 'Cookies & Tracking', icon: '🍪' },
                  { id: 'security', label: 'Data Security', icon: '🔒' },
                  { id: 'rights', label: 'Your Rights', icon: '⚖️' },
                  { id: 'children', label: 'Children\'s Privacy', icon: '👤' },
                  { id: 'changes', label: 'Policy Changes', icon: '📝' },
                  { id: 'contact', label: 'Contact Us', icon: '📞' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-[#137952]/10 to-indigo-50 text-[#137952] border-l-4 border-[#137952]'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-left">{item.label}</span>
                  </button>
                ))}
              </nav>
              
              {/* Download PDF Button */}
              <div className="p-4 border-t border-gray-200">
                <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 font-medium transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-8">
            {/* Introduction Section */}
            {activeSection === 'introduction' && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#137952]/80 to-[#137952] rounded-xl flex items-center justify-center">
                    <span className="text-2xl text-white">📋</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Introduction</h2>
                </div>
                
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    CMA Test Series ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our test series platform.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Please read this privacy policy carefully. By accessing or using our platform, you acknowledge that you have read, understood, and agree to be bound by all the terms outlined in this Privacy Policy.
                  </p>
                  <div className="bg-[#137952]/10 p-5 rounded-xl border border-[#137952]/30 mt-6">
                    <div className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-[#137952] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Our Commitment</h4>
                        <p className="text-gray-600 text-sm">
                          We do not sell your personal information to third parties. Your trust is our most valuable asset, and we take data protection seriously.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Information We Collect */}
            {activeSection === 'information' && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-2xl text-white">📊</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Information We Collect</h2>
                </div>

                <div className="space-y-6">
                  {/* Personal Information */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#137952] rounded-full"></div>
                      Personal Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Full name</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Email address</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Phone number</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Date of birth</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">CMA registration number</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">Educational qualifications</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      Payment Information
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      We collect payment information necessary to process your purchases. All payment processing is handled by our secure payment gateway partner, Razorpay.
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold">•</span>
                        <span className="text-sm">Credit/debit card details (processed directly by Razorpay, never stored on our servers)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold">•</span>
                        <span className="text-sm">UPI ID and transaction IDs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 font-bold">•</span>
                        <span className="text-sm">Net banking information (processed via encrypted channels)</span>
                      </li>
                    </ul>
                  </div>

                  {/* Usage Information */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                      Usage & Device Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span className="text-sm text-gray-700">IP address and location data</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span className="text-sm text-gray-700">Browser type and version</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span className="text-sm text-gray-700">Operating system</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span className="text-sm text-gray-700">Test performance metrics</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span className="text-sm text-gray-700">Time spent on platform</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span className="text-sm text-gray-700">Features accessed frequently</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* How We Use Information */}
            {activeSection === 'usage' && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <span className="text-2xl text-white">⚙️</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">How We Use Your Information</h2>
                </div>

                <div className="space-y-5">
                  <div className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                    <div className="w-10 h-10 bg-[#137952]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-[#137952]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">To Provide & Improve Services</h3>
                      <p className="text-sm text-gray-600">Process your registration, deliver test series, evaluate answer sheets, provide performance analytics, and continuously improve our platform based on usage patterns.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">To Communicate With You</h3>
                      <p className="text-sm text-gray-600">Send important updates about your test series, notify about evaluation completion, respond to your support queries, and share relevant exam tips and resources.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">To Process Payments</h3>
                      <p className="text-sm text-gray-600">Securely process your test series purchases, generate invoices, handle refunds, and prevent fraudulent transactions.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">To Analyze & Improve</h3>
                      <p className="text-sm text-gray-600">Analyze test performance patterns to improve question quality, identify common weak areas, and enhance our platform's user experience.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-5 bg-gradient-to-r from-[#137952]/10 to-indigo-50 rounded-xl border border-[#137952]/30">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#137952] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Legal Basis:</span> We process your personal information based on consent, contract fulfillment, legitimate business interests, and legal compliance as per applicable data protection laws.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Information Sharing */}
            {activeSection === 'sharing' && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <span className="text-2xl text-white">🔄</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Information Sharing</h2>
                </div>

                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      We DO NOT Sell Your Information
                    </h3>
                    <p className="text-sm text-gray-700">
                      We never sell, rent, or trade your personal information to third parties for marketing purposes. Your data is only shared in the following limited circumstances:
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                      <div className="w-8 h-8 bg-[#137952]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[#137952] font-bold text-sm">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">Service Providers</h4>
                        <p className="text-xs text-gray-600">With trusted third-party vendors who assist us in operating our platform (payment processing, cloud storage, email services). All vendors sign strict data processing agreements.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-600 font-bold text-sm">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">Legal Compliance</h4>
                        <p className="text-xs text-gray-600">When required by law, court order, or government authorities to comply with legal obligations or protect our rights.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-emerald-600 font-bold text-sm">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">Business Transfers</h4>
                        <p className="text-xs text-gray-600">In the event of a merger, acquisition, or asset sale, your information may be transferred. You will be notified of any such change.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-600 font-bold text-sm">4</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">With Your Consent</h4>
                        <p className="text-xs text-gray-600">When you explicitly request or authorize us to share your information with specific third parties.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Cookies & Tracking */}
            {activeSection === 'cookies' && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center">
                    <span className="text-2xl text-white">🍪</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Cookies & Tracking</h2>
                </div>

                <p className="text-gray-700 mb-6">
                  We use cookies and similar tracking technologies to enhance your experience on our platform. Cookies are small text files stored on your device that help us recognize you and remember your preferences.
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-[#137952] rounded-full"></div>
                      <h4 className="font-semibold text-gray-900">Essential Cookies</h4>
                    </div>
                    <p className="text-xs text-gray-600">Required for platform functionality, login sessions, and security. Cannot be disabled.</p>
                  </div>
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <h4 className="font-semibold text-gray-900">Performance Cookies</h4>
                    </div>
                    <p className="text-xs text-gray-600">Help us understand how visitors use our platform to improve performance.</p>
                  </div>
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                      <h4 className="font-semibold text-gray-900">Functional Cookies</h4>
                    </div>
                    <p className="text-xs text-gray-600">Remember your preferences and test settings for personalized experience.</p>
                  </div>
                  <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                      <h4 className="font-semibold text-gray-900">Analytics Cookies</h4>
                    </div>
                    <p className="text-xs text-gray-600">Google Analytics to track aggregated usage statistics (anonymized).</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-5 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Cookie Preferences</h4>
                  <p className="text-xs text-gray-600 mb-3">
                    You can control cookies through your browser settings. However, disabling certain cookies may affect platform functionality.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button className="px-4 py-2 bg-[#137952] text-white text-xs font-medium rounded-lg hover:bg-[#0d5c3d] transition-colors">
                      Accept All Cookies
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-300 transition-colors">
                      Cookie Settings
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Data Security */}
            {activeSection === 'security' && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <span className="text-2xl text-white">🔒</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Data Security</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-5 rounded-xl">
                    <div className="w-10 h-10 bg-[#137952]/20 rounded-lg flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-[#137952]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">256-bit Encryption</h4>
                    <p className="text-sm text-gray-600">All data transmitted between your device and our servers is encrypted using industry-standard TLS 1.3 protocol.</p>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-xl">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">ISO 27001 Certified</h4>
                    <p className="text-sm text-gray-600">Our security practices follow international standards. Regular audits and penetration testing.</p>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-xl">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Regular Backups</h4>
                    <p className="text-sm text-gray-600">Automated daily backups with geographic redundancy to prevent data loss.</p>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-xl">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Access Control</h4>
                    <p className="text-sm text-gray-600">Strict role-based access controls. Employee access limited to what's necessary.</p>
                  </div>
                </div>

                <div className="bg-[#137952]/10 p-5 rounded-xl border border-[#137952]/30">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Important:</span> While we implement robust security measures, no method of transmission over the Internet is 100% secure. We strive to protect your data but cannot guarantee absolute security.
                  </p>
                </div>
              </div>
            )}

            {/* Your Rights */}
            {activeSection === 'rights' && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <span className="text-2xl text-white">⚖️</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Your Rights</h2>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 bg-[#137952]/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[#137952] font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Right to Access</h4>
                      <p className="text-sm text-gray-600">Request a copy of the personal information we hold about you.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Right to Rectification</h4>
                      <p className="text-sm text-gray-600">Correct inaccurate or incomplete information in your account.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-emerald-600 font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Right to Erasure</h4>
                      <p className="text-sm text-gray-600">Request deletion of your account and personal data (subject to legal retention requirements).</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-amber-600 font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Right to Restrict Processing</h4>
                      <p className="text-sm text-gray-600">Limit how we use your personal information in certain circumstances.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-red-600 font-bold">5</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Right to Data Portability</h4>
                      <p className="text-sm text-gray-600">Receive your data in a structured, machine-readable format.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-teal-600 font-bold">6</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Right to Object</h4>
                      <p className="text-sm text-gray-600">Object to processing based on legitimate interests or direct marketing.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#137952]/10 to-indigo-50 p-5 rounded-xl border border-[#137952]/30">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#137952]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    How to Exercise Your Rights
                  </h4>
                  <p className="text-sm text-gray-700 mb-3">
                    To exercise any of these rights, please contact our Data Protection Officer:
                  </p>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Email:</span> dpo@cmatestseries.com</p>
                    <p><span className="font-medium">Response Time:</span> Within 30 days of verification</p>
                    <p><span className="font-medium">Cost:</span> Free of charge (excessive requests may incur a reasonable fee)</p>
                  </div>
                </div>
              </div>
            )}

            {/* Children's Privacy */}
            {activeSection === 'children' && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <span className="text-2xl text-white">👤</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Children's Privacy</h2>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <svg className="w-8 h-8 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Age Restriction</h4>
                      <p className="text-gray-700">
                        Our platform is intended for individuals who are at least 18 years of age or pursuing CMA certification. 
                        We do not knowingly collect personal information from children under 13.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">
                  If you are a parent or guardian and believe your child has provided us with personal information without your consent, 
                  please contact us immediately. We will take steps to remove such information and terminate the child's account.
                </p>
              </div>
            )}

            {/* Policy Changes */}
            {activeSection === 'changes' && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-slate-500 to-slate-600 rounded-xl flex items-center justify-center">
                    <span className="text-2xl text-white">📝</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Changes to This Policy</h2>
                </div>

                <p className="text-gray-700 mb-4">
                  We may update this Privacy Policy from time to time to reflect changes in our practices, 
                  legal requirements, or operational requirements. When we make material changes, we will notify you by:
                </p>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-[#137952] font-bold">•</span>
                    <span className="text-gray-700">Posting a prominent notice on our website</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#137952] font-bold">•</span>
                    <span className="text-gray-700">Sending an email to your registered email address</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#137952] font-bold">•</span>
                    <span className="text-gray-700">Updating the "Last Updated" date at the top of this policy</span>
                  </li>
                </ul>

                <div className="bg-gray-50 p-5 rounded-xl">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Version History:</span> We maintain an archive of previous privacy policies. 
                    You can request access to previous versions by contacting our support team.
                  </p>
                </div>
              </div>
            )}

            {/* Contact Us */}
            {activeSection === 'contact' && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#137952]/80 to-[#137952] rounded-xl flex items-center justify-center">
                    <span className="text-2xl text-white">📞</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Contact Us</h2>
                </div>

                <p className="text-gray-700 mb-6">
                  If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-[#137952]/10 to-indigo-50 p-6 rounded-xl border border-[#137952]/30">
                    <div className="w-12 h-12 bg-[#137952]/20 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-[#137952]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                    <p className="text-sm text-gray-600 mb-1">Data Protection Officer:</p>
                    <p className="text-[#137952] font-medium">privacy@cmatestseries.com</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
                    <p className="text-sm text-gray-600">
                      CMA Test Series Pvt. Ltd.<br />
                      401, Ackruti Trade Center,<br />
                      Andheri East, Mumbai - 400093<br />
                      Maharashtra, India
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-5 rounded-xl">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-gray-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Response Time:</span> We aim to respond to all privacy-related inquiries within 2 business days.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Consent Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#137952] to-[#0d5c3d] rounded-2xl p-6 lg:p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Your Privacy, Our Priority</h3>
                <p className="text-white/90 text-sm max-w-2xl">
                  We're committed to transparency and protecting your data. If you have any concerns about how we handle your information, please don't hesitate to reach out to our Data Protection Officer.
                </p>
              </div>
            </div>
            <button className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#137952] font-semibold rounded-xl hover:bg-gray-50 transition-colors shadow-lg whitespace-nowrap">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Contact DPO
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-xs text-gray-600">
              This Privacy Policy is compliant with Indian IT Act 2000, GDPR, and DPDPA 2023. 
              By using our platform, you consent to our privacy practices.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
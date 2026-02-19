import { useState } from 'react';

const RefundPolicy = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedProcedure, setSelectedProcedure] = useState('general');

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
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
              Refund & Cancellation
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Refund Policy & 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#137952] to-[#0d5c3d]">
              Procedures
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We believe in fair and transparent policies. Our refund process is designed 
            to be simple, hassle-free, and student-friendly while maintaining the 
            integrity of our educational services.
          </p>
        </div>

        {/* Policy Highlights Banner */}
        <div className="bg-gradient-to-r from-[#137952] to-[#0d5c3d] rounded-2xl shadow-xl p-6 lg:p-8 mb-16 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold">7 Days</div>
                <div className="text-white/90 text-sm">Refund Window</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold">100%</div>
                <div className="text-white/90 text-sm">Money-back Guarantee*</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold">3-5 Days</div>
                <div className="text-white/90 text-sm">Processing Time</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Policy Content */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {/* Left Column - Policy Categories */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Summary Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#137952]/80 to-[#137952] rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quick Summary</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-600">7-day refund window from purchase date</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-600">No refund after 7 days or 1 test taken</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-600">3-5 business days for refund processing</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-gray-600">Refund to original payment method</span>
                </li>
              </ul>
            </div>

            {/* Important Notes Card */}
            <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h4 className="font-semibold text-amber-800 mb-2">Important Notes</h4>
                  <ul className="space-y-2 text-sm text-amber-700">
                    <li className="flex items-start gap-2">
                      • Refunds are processed only after account verification
                    </li>
                    <li className="flex items-start gap-2">
                      • Duplicate payments will be refunded automatically
                    </li>
                    <li className="flex items-start gap-2">
                      • Bank processing times may vary (3-7 business days)
                    </li>
                    <li className="flex items-start gap-2">
                      • Refund eligibility is automatically checked by our system
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Support Card */}
            <div className="bg-gradient-to-br from-[#137952]/10 to-purple-50 rounded-2xl border border-[#137952]/30 p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#137952]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#137952]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Need Help with Refund?</h4>
                  <p className="text-sm text-gray-600 mb-3">Our support team is here to assist you</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center text-gray-700">
                      <span className="font-medium mr-2">Email:</span>
                      <span className="text-[#137952]">refunds@cmatestseries.com</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="font-medium mr-2">Phone:</span>
                      <span className="text-[#137952]">+91 1800-123-4567</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Policies */}
          <div className="lg:col-span-2 space-y-8">
            {/* Eligibility Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Refund Eligibility Criteria</h2>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Full Refund (100%)</h3>
                    <p className="text-gray-600 text-sm">Request within 7 days of purchase AND no test papers have been submitted for evaluation.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-yellow-600 font-bold">!</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">No Refund Cases</h3>
                    <p className="text-gray-600 text-sm">After 7 days of purchase OR after submitting 1 or more test papers for evaluation.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-[#137952]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[#137952]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Special Circumstances</h3>
                    <p className="text-gray-600 text-sm">Technical issues preventing test access, duplicate payments, or incorrect charges - eligible for full refund regardless of time.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Procedure Tabs */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-[#137952]/10 to-[#137952]/20 border-b border-[#137952]/30">
                <h3 className="text-xl font-bold text-gray-900">Step-by-Step Refund Process</h3>
              </div>

              {/* Procedure Type Selector */}
              <div className="flex flex-wrap gap-2 p-6 pb-0">
                {['general', 'technical', 'payment'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedProcedure(type)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      selectedProcedure === type
                        ? 'bg-[#137952] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type === 'general' && 'General Refund'}
                    {type === 'technical' && 'Technical Issues'}
                    {type === 'payment' && 'Payment Disputes'}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {selectedProcedure === 'general' && (
                  <div className="space-y-6">
                    <div className="relative">
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#137952] to-purple-500"></div>
                      {[
                        { step: '1', title: 'Login to Dashboard', desc: 'Access your CMA Test Series account and navigate to "My Purchases" section.' },
                        { step: '2', title: 'Select Order', desc: 'Find the test series you want to request a refund for and click on "Request Refund".' },
                        { step: '3', title: 'Submit Request', desc: 'Fill the refund request form with reason for cancellation and submit.' },
                        { step: '4', title: 'Verification', desc: 'Our team verifies eligibility based on purchase date and test usage (1-2 business days).' },
                        { step: '5', title: 'Approval & Processing', desc: 'If approved, refund is initiated to original payment source (3-5 business days).' },
                      ].map((item, index) => (
                        <div key={index} className="flex items-start mb-6 relative">
                          <div className="w-8 h-8 bg-gradient-to-r from-[#137952]/80 to-[#137952] rounded-lg flex items-center justify-center text-white font-bold mr-4 z-10">
                            {item.step}
                          </div>
                          <div className="flex-1 pt-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-4 bg-[#137952]/10 rounded-xl">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-[#137952] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium text-gray-900">Pro Tip:</span> Keep your order ID handy. You can find it in your purchase confirmation email or under "My Orders" in your dashboard.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedProcedure === 'technical' && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-4">Technical Issue Refund Process</h4>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-red-600 text-xs font-bold">1</span>
                          </div>
                          <div>
                            <p className="text-gray-700">Report the technical issue via email to <span className="text-[#137952] font-medium">tech@cmatestseries.com</span> with subject line "Technical Issue Refund Request"</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-red-600 text-xs font-bold">2</span>
                          </div>
                          <div>
                            <p className="text-gray-700">Attach screenshot/video evidence of the issue</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-red-600 text-xs font-bold">3</span>
                          </div>
                          <div>
                            <p className="text-gray-700">Our technical team will verify within 24 hours</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-red-600 text-xs font-bold">4</span>
                          </div>
                          <div>
                            <p className="text-gray-700">Upon confirmation, refund processed within 2 business days</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                      <p className="text-sm text-yellow-800">
                        <span className="font-bold">Note:</span> Technical issues include: test not loading, payment deducted but access not granted, answer sheet upload failures, evaluation not received within 7 days.
                      </p>
                    </div>
                  </div>
                )}

                {selectedProcedure === 'payment' && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-5 rounded-xl">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Duplicate Payment</h4>
                        <p className="text-sm text-gray-600 mb-3">If you were charged twice for the same order</p>
                        <ul className="text-xs space-y-1 text-gray-500">
                          <li>• Automatic detection & refund within 48 hours</li>
                          <li>• Manual request via support@cmatestseries.com</li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 p-5 rounded-xl">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Incorrect Amount</h4>
                        <p className="text-sm text-gray-600 mb-3">Charged more than the displayed price</p>
                        <ul className="text-xs space-y-1 text-gray-500">
                          <li>• Full refund of excess amount</li>
                          <li>• Processing within 3-5 business days</li>
                        </ul>
                      </div>
                    </div>
                    <div className="p-4 bg-[#137952]/10 rounded-xl">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Payment Gateway Charges:</span> In case of payment disputes, please contact your bank/payment provider first. All payments are processed through Razorpay's secure gateway.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Non-Refundable Items */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">Non-Refundable Items & Services</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span className="text-gray-700">Evaluated test papers (once submitted)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span className="text-gray-700">One-on-one mentorship sessions</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span className="text-gray-700">Custom study plans created for students</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span className="text-gray-700">Certificate courses (once accessed)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span className="text-gray-700">Partial refunds for partially used services</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span className="text-gray-700">Gift cards and promotional credits</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our refund policy and process
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "Can I get a refund if I haven't taken any tests?",
                a: "Yes, if you request within 7 days of purchase and haven't submitted any test papers for evaluation, you are eligible for a 100% full refund."
              },
              {
                q: "How long does it take to receive the refund amount?",
                a: "Once approved, refunds are processed within 3-5 business days. The amount reflects in your account based on your bank's processing time (typically 5-7 business days)."
              },
              {
                q: "I purchased the wrong test series by mistake. What should I do?",
                a: "Contact our support team within 24 hours of purchase. We can either process a full refund or help you exchange it for the correct test series."
              },
              {
                q: "Will I get a refund if I'm not satisfied with the evaluation?",
                a: "Our evaluation process follows CMA institute guidelines. If you have concerns about evaluation quality, please contact our academic support team for reevaluation instead of refund."
              },
              {
                q: "What happens to my refund if I paid via education loan?",
                a: "Refunds for education loan payments are processed to the same loan account. Please coordinate with your bank/NBFC for crediting timelines."
              },
              {
                q: "Can I cancel my subscription and get a pro-rata refund?",
                a: "No, we do not offer pro-rata refunds for mid-subscription cancellations. Refunds are only applicable within the 7-day window with zero test submissions."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{faq.q}</span>
                  <svg 
                    className={`w-5 h-5 text-gray-500 transition-transform ${activeFaq === index ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#137952] to-[#0d5c3d] rounded-2xl p-8 lg:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need to Request a Refund?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Our support team is ready to assist you with your refund request. 
            We aim to process all eligible refunds within 48 hours of approval.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#137952] font-semibold rounded-xl hover:bg-gray-50 transition-colors shadow-lg">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Request Refund
            </button>
            <button className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Check Refund Status
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-xs text-gray-600">
              This refund policy was last updated on January 1, 2024. CMA Test Series reserves the right to modify this policy with prior notice.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
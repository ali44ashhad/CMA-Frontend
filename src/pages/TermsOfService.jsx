import { useState } from 'react';

const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'definitions', title: 'Key Definitions' },
    { id: 'user-agreement', title: 'User Agreement' },
    { id: 'eligibility', title: 'Eligibility' },
    { id: 'account-registration', title: 'Account Registration' }, 
    { id: 'payment-terms', title: 'Payment Terms' }, 
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Background Elements - Matching Theme */}
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
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#137952]/10 to-[#137952]/5 border border-[#137952]/30 rounded-full mb-6">
            <div className="w-2 h-2 bg-[#137952] rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-[#137952]">
              Legal Terms
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Terms of
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#137952] to-[#0d5c3d]">
              Service & Usage
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Please read these terms carefully before using our CMA Test Series platform. 
            By accessing or using our services, you agree to be bound by these terms.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#137952]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Last Updated: 10 Feb, 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#137952]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Version 3.2</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-[#137952]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Quick Navigation
                </h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-[#137952]/10 to-[#137952]/20 border border-[#137952]/30 text-[#137952] font-semibold'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-3 ${
                          activeSection === section.id ? 'bg-[#137952]' : 'bg-gray-300'
                        }`}></div>
                        {section.title}
                      </div>
                    </button>
                  ))}
                </nav>
 
              </div>

              {/* Help Card */}
              <div className="mt-6 bg-gradient-to-r from-[#137952]/10 to-emerald-50 rounded-2xl border border-[#137952]/30 p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Need Help?</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Have questions about these terms? Contact our legal team.
                </p>
                <a 
                  href="#" 
                  className="inline-flex items-center justify-center w-full px-4 py-3 bg-white border border-[#137952]/30 text-[#137952] font-semibold rounded-xl hover:bg-[#137952]/10 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Legal Support
                </a>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              {/* Terms Content */}
              <div className="p-8">
                {/* Important Notice */}
                <div className="mb-8 p-6 bg-gradient-to-r from-[#137952]/10 to-[#137952]/20 border border-[#137952]/30 rounded-2xl">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#137952]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-[#137952]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.698-.833-2.464 0L4.196 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0d5c3d] mb-2">Important Legal Notice</h3>
                      <p className="text-[#137952]">
                        These Terms of Service constitute a legally binding agreement between you 
                        and CMA Test Series. By accessing or using our platform, you acknowledge 
                        that you have read, understood, and agree to be bound by these terms.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Terms Sections */}
                <div className="space-y-12">
                  {/* Introduction */}
                  <section id="introduction" className="scroll-mt-24">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <span className="w-8 h-8 bg-gradient-to-r from-[#137952]/80 to-[#137952] rounded-lg flex items-center justify-center text-white text-sm mr-3">1</span>
                      Introduction & Acceptance
                    </h2>
                    <div className="space-y-4 text-gray-600 leading-relaxed">
                      <p>
                        Welcome to CMA Test Series ("Platform", "Service", "we", "us", or "our"). 
                        These Terms of Service ("Terms") govern your access to and use of our 
                        website, mobile applications, and services provided by CMA Test Series.
                      </p>
                      <p>
                        By accessing or using our Platform, you agree to comply with and be bound 
                        by these Terms. If you do not agree to these Terms, you must not access or 
                        use our Platform.
                      </p>
                    </div>
                  </section>

                  {/* Definitions */}
                  <section id="definitions" className="scroll-mt-24">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <span className="w-8 h-8 bg-gradient-to-r from-[#137952]/80 to-[#137952] rounded-lg flex items-center justify-center text-white text-sm mr-3">2</span>
                      Key Definitions
                    </h2>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <dl className="grid md:grid-cols-2 gap-4">
                        <div>
                          <dt className="font-semibold text-gray-900">"Platform"</dt>
                          <dd className="text-gray-600 text-sm mt-1">Our website, mobile applications, and all related services</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-gray-900">"User"</dt>
                          <dd className="text-gray-600 text-sm mt-1">Any individual or entity accessing our Platform</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-gray-900">"Content"</dt>
                          <dd className="text-gray-600 text-sm mt-1">All materials, tests, questions, and educational resources</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-gray-900">"Subscription"</dt>
                          <dd className="text-gray-600 text-sm mt-1">Paid access to premium features and test series</dd>
                        </div>
                      </dl>
                    </div>
                  </section>

                  {/* User Agreement */}
                  <section id="user-agreement" className="scroll-mt-24">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <span className="w-8 h-8 bg-gradient-to-r from-[#137952]/80 to-[#137952] rounded-lg flex items-center justify-center text-white text-sm mr-3">3</span>
                      User Agreement & Modifications
                    </h2>
                    <div className="space-y-4 text-gray-600 leading-relaxed">
                      <p>
                        We reserve the right to modify these Terms at any time. We will notify you 
                        of material changes through email or Platform notifications. Your continued 
                        use of the Platform after changes constitutes acceptance of the modified Terms.
                      </p>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                        <p className="text-yellow-800 text-sm">
                          <strong>Note:</strong> It is your responsibility to review these Terms 
                          periodically for updates. The "Last Updated" date at the top indicates 
                          when changes were last made.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Eligibility */}
                  <section id="eligibility" className="scroll-mt-24">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <span className="w-8 h-8 bg-gradient-to-r from-[#137952]/80 to-[#137952] rounded-lg flex items-center justify-center text-white text-sm mr-3">4</span>
                      Eligibility Requirements
                    </h2>
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white border border-gray-200 rounded-xl p-5">
                          <div className="w-10 h-10 bg-[#137952]/20 rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-5 h-5 text-[#137952]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-2">Individual Users</h4>
                          <p className="text-sm text-gray-600">
                            Must be at least 18 years old or have parental consent. 
                            Must be a CMA aspirant or student.
                          </p>
                        </div>
                        
                        <div className="bg-white border border-gray-200 rounded-xl p-5">
                          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-2">Institutional Users</h4>
                          <p className="text-sm text-gray-600">
                            Educational institutions must provide valid registration 
                            and contact information.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Account Registration */}
                  <section id="account-registration" className="scroll-mt-24">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <span className="w-8 h-8 bg-gradient-to-r from-[#137952]/80 to-[#137952] rounded-lg flex items-center justify-center text-white text-sm mr-3">5</span>
                      Account Registration & Security
                    </h2>
                    <div className="space-y-4 text-gray-600 leading-relaxed">
                      <p>
                        To access certain features, you must register for an account. You agree to:
                      </p>
                      <ul className="space-y-3 pl-5">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-[#137952] rounded-full mt-2 mr-3"></div>
                          Provide accurate, current, and complete information
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-[#137952] rounded-full mt-2 mr-3"></div>
                          Maintain and promptly update your account information
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-[#137952] rounded-full mt-2 mr-3"></div>
                          Keep your password secure and confidential
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-[#137952] rounded-full mt-2 mr-3"></div>
                          Notify us immediately of any unauthorized access
                        </li>
                      </ul>
                    </div>
                  </section>

                  {/* Payment Terms */}
                  <section id="payment-terms" className="scroll-mt-24">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <span className="w-8 h-8 bg-gradient-to-r from-[#137952]/80 to-[#137952] rounded-lg flex items-center justify-center text-white text-sm mr-3">6</span>
                      Payment Terms & Refunds
                    </h2>
                    <div className="bg-gradient-to-r from-[#137952]/10 to-[#137952]/20 rounded-xl p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white rounded-xl">
                          <div>
                            <h4 className="font-semibold text-gray-900">Subscription Fees</h4>
                            <p className="text-sm text-gray-600">Payable in advance, non-transferable</p>
                          </div>
                          <div className="text-[#137952] font-semibold">Auto-renewal</div>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-white rounded-xl">
                          <div>
                            <h4 className="font-semibold text-gray-900">Refund Policy</h4>
                            <p className="text-sm text-gray-600">7-day refund policy from date of purchase</p>
                          </div>
                          <div className="text-green-600 font-semibold">7 Days</div>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-white rounded-xl">
                          <div>
                            <h4 className="font-semibold text-gray-900">Payment Methods</h4>
                            <p className="text-sm text-gray-600">Credit/Debit cards, UPI, Net Banking</p>
                          </div>
                          <div className="text-purple-600 font-semibold">Multiple Options</div>
                        </div>
                      </div>
                    </div>
                  </section>

             
                </div>
              </div>
            </div>

            {/* Contact Support Banner */}
            <div className="mt-8 bg-gradient-to-r from-[#137952] to-[#0d5c3d] rounded-2xl p-8 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Questions About Terms?</h3>
                  <p className="text-white/90 max-w-2xl">
                    Our legal team is available to clarify any aspect of these terms 
                    and conditions. Contact us for assistance.
                  </p>
                </div>
                <a 
                  href="/contact" 
                  className="mt-4 md:mt-0 inline-flex items-center justify-center px-6 py-3 bg-white text-[#137952] font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Legal Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
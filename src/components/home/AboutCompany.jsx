const AboutCompany = () => {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-[#137952]/10 rounded-full mb-4">
              <span className="text-[#137952] text-sm font-medium">
                About Us
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Revolutionizing CMA Education
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're on a mission to make CMA exam preparation accessible, effective, 
              and result-oriented through technology and expert guidance.
            </p>
          </div>
  
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Left Content */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Our Vision & Mission
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#137952]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#137952]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Vision</h4>
                    <p className="text-gray-600">
                      To become India's most trusted CMA test series platform, empowering 
                      every aspirant with personalized, technology-driven learning.
                    </p>
                  </div>
                </div>
  
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Mission</h4>
                    <p className="text-gray-600">
                      Democratize CMA education by providing affordable, high-quality test 
                      series with expert evaluation and data-driven insights.
                    </p>
                  </div>
                </div>
  
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Community</h4>
                    <p className="text-gray-600">
                      Building a supportive community where CMA aspirants can learn, 
                      grow, and succeed together through mentorship and peer learning.
                    </p>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Right Image/Content */}
            <div className="relative">
              <div className="bg-gradient-to-br from-[#137952]/10 to-emerald-50 rounded-2xl p-8 border border-[#137952]/30">
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="text-3xl font-bold text-[#137952] mb-2">2018</div>
                    <div className="text-sm text-gray-600">Founded</div>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="text-3xl font-bold text-[#137952] mb-2">10K+</div>
                    <div className="text-sm text-gray-600">Students Trained</div>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="text-3xl font-bold text-[#137952] mb-2">50+</div>
                    <div className="text-sm text-gray-600">Cities</div>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <div className="text-3xl font-bold text-[#137952] mb-2">25K+</div>
                    <div className="text-sm text-gray-600">Tests Conducted</div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Our Core Values</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#137952] rounded-full"></div>
                      <span className="text-sm text-gray-600">Excellence in Education</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#137952] rounded-full"></div>
                      <span className="text-sm text-gray-600">Student Success First</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#137952] rounded-full"></div>
                      <span className="text-sm text-gray-600">Innovation & Technology</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#137952] rounded-full"></div>
                      <span className="text-sm text-gray-600">Integrity & Transparency</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#137952]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#137952]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Innovative Technology</h4>
              <p className="text-gray-600 text-sm">
                AI-powered analytics, real-time evaluation, and personalized learning paths.
              </p>
            </div>
  
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Industry Expertise</h4>
              <p className="text-gray-600 text-sm">
                Content curated by CMA experts with 15+ years of teaching experience.
              </p>
            </div>
  
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Secure Platform</h4>
              <p className="text-gray-600 text-sm">
                Bank-level security for all student data, payments, and communications.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  };
  export default AboutCompany;
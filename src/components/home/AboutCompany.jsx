const AboutCompany = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-[#137952]/10 rounded-full mb-4">
            <span className="text-[#137952] text-sm font-medium">About Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Empowering
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#137952] to-[#0d5c3d]">
              CMA Aspirants Nationwide
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are India&apos;s leading platform dedicated to helping CMA students conquer their exams
            through innovative technology, expert guidance, and comprehensive test series.
          </p>
        </div>

        {/* Stats Banner */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 lg:p-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="text-3xl lg:text-4xl font-bold text-[#137952] mb-2">5+</div>
              <div className="text-sm text-gray-600 font-medium">Years Experience</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl lg:text-4xl font-bold text-[#137952] mb-2">25K+</div>
              <div className="text-sm text-gray-600 font-medium">Mock Tests Taken</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl lg:text-4xl font-bold text-[#137952] mb-2">94%</div>
              <div className="text-sm text-gray-600 font-medium">Success Rate</div>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl lg:text-4xl font-bold text-[#137952] mb-2">50+</div>
              <div className="text-sm text-gray-600 font-medium">Cities Served</div>
            </div>
          </div>
        </div>

        {/* Mission & Vision + Right Box */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Content */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission & Vision</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#137952]/80 to-[#137952] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Our Vision</h4>
                  <p className="text-gray-600">
                    To revolutionize CMA education in India by making exam preparation accessible, affordable, and
                    effective for every aspirant, regardless of their location or background.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Our Mission</h4>
                  <p className="text-gray-600">
                    Provide world-class CMA test series with personalized feedback, expert evaluation, and data-driven
                    insights to maximize success rates and build confidence in every student.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Our Values</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#137952] rounded-full"></div>
                      <span className="text-gray-600">Student Success First</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#137952] rounded-full"></div>
                      <span className="text-gray-600">Innovation in Education</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#137952] rounded-full"></div>
                      <span className="text-gray-600">Integrity & Transparency</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#137952] rounded-full"></div>
                      <span className="text-gray-600">Community Building</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Box */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[#137952]/10 to-emerald-50 rounded-2xl p-8 border border-[#137952]/30">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="text-3xl font-bold text-[#137952] mb-2">2026</div>
                  <div className="text-sm text-gray-600">Founded</div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <div className="text-3xl font-bold text-[#137952] mb-2">50+</div>
                  <div className="text-sm text-gray-600">Students Enrolled</div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Unique Selling Propositions</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#137952] rounded-full shrink-0"></div>
                    <span className="text-sm text-gray-600">Only Test Series Designed Exclusively for CMA Students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#137952] rounded-full shrink-0"></div>
                    <span className="text-sm text-gray-600">Experience Real Exam with Built-In Timer-Based Tests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#137952] rounded-full shrink-0"></div>
                    <span className="text-sm text-gray-600">Get Evaluated Within 24 Hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#137952] rounded-full shrink-0"></div>
                    <span className="text-sm text-gray-600">Exam-Oriented Practice Papers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Journey */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8 mb-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Journey</h3>
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-gradient-to-r from-[#137952]/80 to-[#137952] rounded-xl flex items-center justify-center text-white font-bold shrink-0">
              2026
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-2">Launched</h4>
              <p className="text-gray-600">
                Launched with CMA Foundation and Final Group 4 test series; more levels coming soon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCompany;

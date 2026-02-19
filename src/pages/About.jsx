import { useState } from 'react';

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState('team');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Background Elements */}
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
              About CMA Test Series
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Empowering
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#137952] to-[#0d5c3d]">
              CMA Aspirants Nationwide
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are India's leading platform dedicated to helping CMA students 
            conquer their exams through innovative technology, expert guidance, 
            and comprehensive test series.
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

        {/* Mission & Vision Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Mission & Vision
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-[#137952]/80 to-[#137952] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Our Vision</h3>
                  <p className="text-gray-600">
                    To revolutionize CMA education in India by making exam preparation accessible, 
                    affordable, and effective for every aspirant, regardless of their location or 
                    background.
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
                  <h3 className="font-semibold text-gray-900 mb-2">Our Mission</h3>
                  <p className="text-gray-600">
                    Provide world-class CMA test series with personalized feedback, expert evaluation, 
                    and data-driven insights to maximize success rates and build confidence in every 
                    student.
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
                  <h3 className="font-semibold text-gray-900 mb-2">Our Values</h3>
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

          {/* Right Content - Core Features */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[#137952]/10 to-emerald-50 rounded-2xl p-8 border border-[#137952]/30">
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">What Makes Us Different</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#137952]/20 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-[#137952]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Expert Evaluation</h4>
                        <p className="text-sm text-gray-600">Evaluated by practicing CMAs with 10+ years experience</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Real-time Analytics</h4>
                        <p className="text-sm text-gray-600">Detailed performance tracking and improvement areas</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Flexible Timing</h4>
                        <p className="text-sm text-gray-600">Take tests anytime with time extension options</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-16">
          <div className="flex flex-wrap gap-2 mb-8">
            {['team', 'journey'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-[#137952] to-[#0d5c3d] text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:border-[#137952]'
                }`}
              >
                {tab === 'team' && 'Our Team'}
                {tab === 'journey' && 'Our Journey'} 
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">
            {activeTab === 'team' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Meet Our Expert Team</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { name: 'Dr. Rajesh Sharma', role: 'Founder & CEO', exp: '15+ years CMA teaching experience', icon: '👨‍🏫' },
                    { name: 'Prof. Meena Patel', role: 'Academic Head', exp: '12+ years curriculum development', icon: '👩‍💼' },
                    { name: 'CA Ankit Verma', role: 'Technology Director', exp: 'EdTech platform specialist', icon: '👨‍💻' },
                  ].map((member, index) => (
                    <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200">
                      <div className="text-3xl mb-4">{member.icon}</div>
                      <h4 className="font-semibold text-gray-900 mb-1">{member.name}</h4>
                      <div className="text-[#137952] text-sm font-medium mb-2">{member.role}</div>
                      <p className="text-sm text-gray-600">{member.exp}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'journey' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Journey Since 2018</h3>
                <div className="relative">
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#137952] to-purple-500"></div>
                  {[
                    { year: '2018', title: 'Foundation', desc: 'Launched with Foundation level test series' },
                    { year: '2019', title: 'Expansion', desc: 'Added Intermediate level and mobile platform' },
                    { year: '2020', title: 'Innovation', desc: 'Introduced AI-powered analytics and evaluations' },
                    { year: '2023', title: 'Leadership', desc: 'Became India\'s largest CMA test platform' },
                  ].map((milestone, index) => (
                    <div key={index} className="flex items-start mb-8 relative">
                      <div className="w-16 h-16 bg-gradient-to-r from-[#137952]/80 to-[#137952] rounded-xl flex items-center justify-center text-white font-bold mr-6 z-10">
                        {milestone.year}
                      </div>
                      <div className="flex-1 pt-2">
                        <h4 className="font-semibold text-gray-900 mb-1">{milestone.title}</h4>
                        <p className="text-gray-600">{milestone.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )} 
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#137952] to-[#0d5c3d] rounded-2xl p-8 lg:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Ace Your CMA Exams?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of successful CMA aspirants who have transformed their 
            preparation with our comprehensive test series.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#137952] font-semibold rounded-xl hover:bg-gray-50 transition-colors shadow-lg">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 10v4a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Start Free Foundation Test
            </button>
            <button className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Book Demo Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
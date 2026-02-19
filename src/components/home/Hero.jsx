const Hero = () => {
    return (
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-[#137952]/5 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-r from-[#137952]/5 to-purple-500/5 transform -skew-y-3 -translate-y-20"></div>
        
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
  
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Column - Content */}
            <div className="text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#137952]/10 to-[#137952]/5 border border-[#137952]/30 rounded-full mb-6">
                <div className="w-2 h-2 bg-[#137952] rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-[#137952]">
                  #1 CMA Test Series Platform
                </span>
              </div>
  
              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Ace Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#137952] to-[#0d5c3d] mt-2">
                  CMA Exams with Confidence
                </span>
              </h1>
  
              {/* Description */}
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl">
                Master CMA Foundation, Intermediate & Final exams with our 
                <span className="font-semibold text-[#137952]">test series</span>. 
                Get real exam simulation, detailed analytics, and expert guidance.
              </p>
  
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#137952] to-[#0d5c3d] hover:from-[#0d5c3d] hover:to-[#0a4a2e] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 10v4a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Get started
                </button>
                
                <button className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-gray-300 hover:border-[#137952] text-gray-800 font-semibold rounded-xl shadow-sm hover:shadow transition-all duration-300">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View All Test Series
                </button>
              </div>
  
              {/* Trust Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-500 mt-1">Active Students</div>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">25K+</div>
                  <div className="text-sm text-gray-500 mt-1">Mock Tests Taken</div>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">94%</div>
                  <div className="text-sm text-gray-500 mt-1">Success Rate</div>
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">4.9★</div>
                  <div className="text-sm text-gray-500 mt-1">Rating</div>
                </div>
              </div>
            </div>
  
            {/* Right Column - Visual */}
            <div className="relative">
              {/* Main Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                {/* Card Header */}
                <div className="px-6 py-4 bg-gradient-to-r from-[#137952]/10 to-[#137952]/20 border-b border-[#137952]/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       
                      <div>
                        <h3 className="font-semibold text-gray-900">Test Series Dashboard</h3>
                        <p className="text-xs text-gray-500">Live Preview</p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
  
                {/* Card Content */}
                <div className="p-6">
                  {/* Progress Section */}
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Overall Score</span>
                      <span className="text-sm font-bold text-[#137952]">82%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-400 to-[#137952] w-4/5"></div>
                    </div>
                  </div>
  
                  {/* Test Cards Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#137952]/10 p-4 rounded-xl border border-[#137952]/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-[#137952]">Foundation</span>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Free</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">85%</div>
                      <div className="text-xs text-gray-500">Mock Tests: 12</div>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-purple-700">Intermediate</span>
                        <span className="text-xs px-2 py-1 bg-[#137952]/20 text-[#137952] rounded-full">Paid</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">78%</div>
                      <div className="text-xs text-gray-500">Mock Tests: 24</div>
                    </div>
                  </div>
  
                  {/* Analytics Section */}
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-gray-900">Performance Trend</span>
                      <span className="text-xs text-[#137952] font-medium">↑ 12%</span>
                    </div>
                    <div className="h-24 flex items-end space-x-1">
                      {[40, 60, 75, 65, 80, 85, 82].map((height, index) => (
                        <div key={index} className="flex-1">
                          <div 
                            className={`w-full rounded-t ${index === 6 ? 'bg-gradient-to-t from-[#137952] to-[#137952]/80' : 'bg-gradient-to-t from-gray-300 to-gray-200'}`}
                            style={{ height: `${height}%` }}
                          ></div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span className="font-semibold text-[#137952]">Today</span>
                    </div>
                  </div>
  
                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-3 mt-6">
                    <div className="text-center p-3 bg-white border border-gray-200 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">12</div>
                      <div className="text-xs text-gray-500">Tests Taken</div>
                    </div>
                    <div className="text-center p-3 bg-white border border-gray-200 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">92%</div>
                      <div className="text-xs text-gray-500">Accuracy</div>
                    </div>
                    <div className="text-center p-3 bg-white border border-gray-200 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">4.2</div>
                      <div className="text-xs text-gray-500">Avg. Time</div>
                    </div>
                  </div>
                </div>
              </div>
  
              
   
            </div>
          </div>
        </div>
  
        {/* Animation CSS */}
        <style>{`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
        `}</style>
      </section>
    );
  };
  
  export default Hero;
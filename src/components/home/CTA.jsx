const CTA = () => {
    return (
      <section className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#137952] via-[#0d5c3d] to-[#0a4a2e]">
          {/* Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="cta-pattern" x="0" y="0" width="100" height="100">
                  <circle cx="50" cy="50" r="2" fill="white" />
                  <circle cx="30" cy="30" r="1" fill="white" />
                  <circle cx="70" cy="70" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-pattern)" />
            </svg>
          </div>
  
          {/* Floating blobs */}
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#137952] rounded-full blur-3xl opacity-20 animate-float" />
          <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-20 animate-float animation-delay-2000" />
        </div>
  
        <div className="relative max-w-7xl mx-auto px-4 py-24 lg:py-32 text-center">
         
  
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Transform Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-cyan-200 mt-2">
              CMA Exam Preparation
            </span>
          </h2>
  
          {/* Subtitle */}
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-14">
            Comprehensive test series with
            <span className="text-white font-semibold"> AI analytics</span>,
            <span className="text-white font-semibold"> expert evaluation</span> &
            <span className="text-white font-semibold"> personalized feedback</span>.
          </p>
  
          {/* STATS → CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
            {[
              { value: "100%", label: "Free Foundation" },
              { value: "94%", label: "Success Rate" },
              { value: "48h", label: "Evaluation Time" },
              { value: "24/7", label: "Expert Support" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur rounded-2xl border border-white/20 p-6"
              >
                <div className="text-3xl font-bold text-white mb-1">
                  {item.value}
                </div>
                <div className="text-sm text-white/80">{item.label}</div>
              </div>
            ))}
          </div>
  
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
            <button className="px-10 py-5 bg-white text-[#137952] font-bold text-lg rounded-xl shadow-xl hover:-translate-y-1 transition">
              Start Free Foundation Test
            </button>
  
            <button className="px-10 py-5 border-2 border-white/30 text-white font-bold text-lg rounded-xl backdrop-blur hover:border-white transition">
              View All Test Series
            </button>
          </div>
  
          {/* TRUST CARD */}
          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 max-w-3xl mx-auto mb-16">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-left">
                <h4 className="text-white font-semibold mb-1">
                  No Credit Card Required
                </h4>
                <p className="text-white/80 text-sm">
                  Start free. Upgrade anytime as you progress.
                </p>
              </div>
  
              <div className="flex items-center gap-4 text-white">
                <div className="text-center">
                  <div className="text-2xl font-bold">₹0</div>
                  <div className="text-xs text-white/80">Foundation</div>
                </div>
                <span>→</span>
                <div className="text-center">
                  <div className="text-2xl font-bold">₹8,999</div>
                  <div className="text-xs text-white/80">Intermediate</div>
                </div>
                <span>→</span>
                <div className="text-center">
                  <div className="text-2xl font-bold">₹12,999</div>
                  <div className="text-xs text-white/80">Final</div>
                </div>
              </div>
            </div>
          </div>
   
          
        </div>
  
<div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
          </svg>
        </div>
        {/* Float Animation */}
        <style>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
        `}</style>
      </section>
    );
  };
  
  export default CTA;
  
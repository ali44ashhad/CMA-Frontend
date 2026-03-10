import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AboutCompany from '../components/home/AboutCompany';

const AboutUs = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const userRole = user?.role || '';

  const getJourneyPath = () => {
    if (!isAuthenticated) return '/register';
    if (userRole === 'student') return '/student/dashboard';
    if (userRole === 'admin') return '/admin/dashboard';
    if (userRole === 'evaluator') return '/evaluator/dashboard';
    return '/login';
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="relative">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 right-0 h-64 transform -skew-y-3 -translate-y-12"></div>

        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-about" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-about)" />
          </svg>
        </div>

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <AboutCompany />
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        <div className="bg-gradient-to-r from-[#137952] to-[#0d5c3d] rounded-2xl p-8 lg:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Ace Your CMA Exams?</h2>
          <p className="text-white/90 mb-10 max-w-2xl mx-auto">
            Join India&apos;s only exclusive test series for CMA students — delivering exam-oriented preparation
            that builds real exam confidence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <button
              type="button"
              onClick={() => navigate(getJourneyPath())}
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 10v4a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {isAuthenticated ? 'Go to my dashboard' : 'Start Your Journey'}
            </button>
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Check pricing
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

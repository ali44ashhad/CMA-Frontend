import { useState } from 'react';

const FAQPage = () => {
  const [openSections, setOpenSections] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const faqData = {
    general: {
      title: "General Questions",
      icon: "📋",
      questions: [
        {
          question: "What is CMA Test Series Platform?",
          answer: "CMA Test Series Platform is India's leading online platform dedicated to helping CMA (Cost Management Accountant) aspirants prepare for their Foundation, Intermediate, and Final exams through comprehensive mock tests, expert evaluation, and performance analytics."
        },
        {
          question: "Who is this platform for?",
          answer: "Our platform is designed for CMA students at all levels: Foundation (beginners), Intermediate, and Final levels. Whether you're just starting your CMA journey or preparing for final exams, our test series cater to all stages of preparation."
        },
        {
          question: "Do you offer any free tests?",
          answer: "Yes! We offer completely free test series for CMA Foundation level. You can register and start taking Foundation tests immediately without any payment."
        },
        {
          question: "How is this different from traditional coaching?",
          answer: "Our platform offers flexibility (study anytime), personalized feedback on answer sheets, detailed performance analytics, real exam simulation, and access to a vast question bank at a fraction of traditional coaching costs."
        }
      ]
    },
    registration: {
      title: "Registration & Account",
      icon: "👤",
      questions: [
        {
          question: "How do I create an account?",
          answer: "Click on 'Register' button, provide your email address, create a password, and verify your email. Complete your profile with CMA registration details to access personalized test series."
        },
        {
          question: "Is there a mobile app available?",
          answer: "Currently, we offer a fully responsive web application that works perfectly on mobile browsers. We are developing dedicated mobile apps which will be launched soon."
        },
        {
          question: "Can I change my email/phone number after registration?",
          answer: "For security reasons, email cannot be changed. However, you can update your phone number and other profile details from the 'My Profile' section in your dashboard."
        },
        {
          question: "I forgot my password. How can I reset it?",
          answer: "Click on 'Forgot Password' on the login page, enter your registered email, and you'll receive a password reset link. The link will expire in 2 hours for security."
        }
      ]
    },
    testSeries: {
      title: "Test Series & Exams",
      icon: "📝",
      questions: [
        {
          question: "How many tests are available in each series?",
          answer: "Foundation: 12 free tests | Intermediate: 24 tests per group | Final: 24 tests per group. Combination packages include all groups with 48+ tests."
        },
        {
          question: "What is the duration of each test?",
          answer: "Tests simulate actual CMA exam patterns: Foundation: 3 hours, Intermediate: 4 hours, Final: 4 hours per group. You can extend time by 15 minutes up to 3 times."
        },
        {
          question: "Can I pause and resume a test?",
          answer: "No, once started, the test timer runs continuously to simulate real exam conditions. We recommend taking tests in one sitting without interruptions."
        },
        {
          question: "How do I submit my answer sheet?",
          answer: "After completing your test on paper, scan or take clear photos of your answer sheets, convert to PDF, and upload through the upload interface before the timer ends."
        },
        {
          question: "What format should my answer sheet be in?",
          answer: "Only PDF format is accepted. Maximum file size: 10MB. Ensure your answers are clearly visible and pages are in correct order."
        }
      ]
    },
    evaluation: {
      title: "Evaluation & Results",
      icon: "📊",
      questions: [
        {
          question: "Who evaluates my answer sheets?",
          answer: "All answer sheets are evaluated by practicing CMAs with minimum 10 years of teaching/evaluation experience. Each evaluator is certified and trained in our evaluation standards."
        },
        {
          question: "How long does evaluation take?",
          answer: "Typically 48-72 hours. You'll receive email and in-app notifications when your evaluated paper is ready. During peak exam seasons, it may take up to 5 days."
        },
        {
          question: "What kind of feedback will I receive?",
          answer: "You'll receive: 1) Overall score and subject-wise marks, 2) Evaluator remarks on improvements, 3) Checked answer sheet with comments, 4) Comparison with average scores, 5) Suggested study areas."
        },
        {
          question: "Can I request re-evaluation?",
          answer: "Yes, you can request re-evaluation within 7 days of receiving results for a nominal fee. The paper is then evaluated by a senior examiner."
        }
      ]
    },
    payments: {
      title: "Payments & Pricing",
      icon: "💰",
      questions: [
        {
          question: "What are the payment options?",
          answer: "We accept all major payment methods: Credit/Debit Cards, Net Banking, UPI, and wallets through our secure Razorpay integration. EMI options are available for packages above ₹5000."
        },
        {
          question: "Is there a refund policy?",
          answer: "You can request a full refund within 7 days of purchase if you haven't attempted any tests. After attempting even one test, only partial refunds are available as per our refund policy."
        },
        {
          question: "Are there any discounts for bulk purchases?",
          answer: "Yes, we offer special discounts for group enrollments (5+ students) and institutional partnerships. Contact our business team at admin@cmatestseries.com for custom quotes."
        },
        {
          question: "Do prices include GST?",
          answer: "Yes, all displayed prices are inclusive of 18% GST. You'll receive a proper invoice with GST details for all paid transactions."
        }
      ]
    },
    technical: {
      title: "Technical Support",
      icon: "💻",
      questions: [
        {
          question: "What are the system requirements?",
          answer: "Any modern browser (Chrome 80+, Firefox 75+, Safari 13+), stable internet connection (minimum 2 Mbps), PDF viewer, and ability to create PDF files from your device."
        },
        {
          question: "My upload failed. What should I do?",
          answer: "1) Check file size (<10MB), 2) Ensure PDF format, 3) Try uploading from a different browser, 4) Contact support if issue persists - we'll extend your submission time."
        },
        {
          question: "The timer is not working properly. Help!",
          answer: "Refresh the page once. If issue continues, take screenshots of the timer and contact support immediately. We maintain backup logs of all exam sessions."
        },
        {
          question: "How secure is my data?",
          answer: "We use bank-level security: SSL encryption, secure servers, regular backups, and comply with data protection regulations. Your answer sheets and personal data are completely confidential."
        }
      ]
    }
  };

  const toggleQuestion = (category, index) => {
    const key = `${category}-${index}`;
    setOpenSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const categories = [
    { id: 'all', name: 'All Questions', icon: '📚' },
    { id: 'general', name: 'General', icon: '📋' },
    { id: 'registration', name: 'Account', icon: '👤' },
    { id: 'testSeries', name: 'Test Series', icon: '📝' },
    { id: 'evaluation', name: 'Evaluation', icon: '📊' },
    { id: 'payments', name: 'Payments', icon: '💰' },
    { id: 'technical', name: 'Technical', icon: '💻' }
  ];

  const filteredQuestions = Object.entries(faqData).flatMap(([category, data]) => 
    data.questions.map(q => ({ ...q, category: data.title }))
  ).filter(q => 
    q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderQuestions = () => {
    if (activeCategory === 'all') {
      return Object.entries(faqData).map(([catKey, category]) => (
        <div key={catKey} className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">{category.icon}</span>
            <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
          </div>
          <div className="space-y-4">
            {category.questions.map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[#137952]/50 transition-colors"
              >
                <button
                  onClick={() => toggleQuestion(catKey, index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{item.question}</span>
                  <svg 
                    className={`w-5 h-5 text-[#137952] transition-transform ${openSections[`${catKey}-${index}`] ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openSections[`${catKey}-${index}`] && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ));
    } else {
      const category = faqData[activeCategory];
      return (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">{category.icon}</span>
            <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
          </div>
          <div className="space-y-4">
            {category.questions.map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[#137952]/50 transition-colors"
              >
                <button
                  onClick={() => toggleQuestion(activeCategory, index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{item.question}</span>
                  <svg 
                    className={`w-5 h-5 text-[#137952] transition-transform ${openSections[`${activeCategory}-${index}`] ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openSections[`${activeCategory}-${index}`] && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

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
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#137952]/10 to-[#137952]/5 border border-[#137952]/30 rounded-full mb-6">
            <div className="w-2 h-2 bg-[#137952] rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-[#137952]">
              Help Center
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Frequently Asked
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#137952] to-[#0d5c3d]">
              Questions
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Find answers to common questions about our CMA test series platform, 
            registration process, test procedures, and technical support.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for questions about tests, payments, technical issues..."
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#137952] focus:border-[#137952] transition-colors shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Categories Navigation */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 pb-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-[#137952] to-[#0d5c3d] text-white shadow-lg'
                    : 'bg-white border border-gray-300 text-gray-700 hover:border-[#137952] hover:shadow-md'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Quick Help */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Help Card */}
              <div className="bg-gradient-to-br from-[#137952]/10 to-[#137952]/20 rounded-2xl p-6 border border-[#137952]/30">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Help</h3>
                <div className="space-y-3">
                  <a href="/contact" className="flex items-center gap-3 p-3 bg-white rounded-xl hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-[#137952]/20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#137952]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Contact Support</div>
                      <div className="text-xs text-gray-500">Email/Phone support</div>
                    </div>
                  </a>
                  
                  <a href="#" className="flex items-center gap-3 p-3 bg-white rounded-xl hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.304-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">WhatsApp Support</div>
                      <div className="text-xs text-gray-500">Instant chat support</div>
                    </div>
                  </a>
                  
                  <a href="#" className="flex items-center gap-3 p-3 bg-white rounded-xl hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Documentation</div>
                      <div className="text-xs text-gray-500">Guides & tutorials</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Popular Questions */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Popular Questions</h3>
                <div className="space-y-3">
                  {[
                    "How do I upload answer sheets?",
                    "What is the refund policy?",
                    "How long does evaluation take?",
                    "Are Foundation tests really free?"
                  ].map((question, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchQuery(question.split('?')[0]);
                        setActiveCategory('all');
                      }}
                      className="block w-full text-left p-3 text-sm text-gray-600 hover:text-[#137952] hover:bg-[#137952]/10 rounded-lg transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - FAQ Questions */}
          <div className="lg:col-span-3">
            {searchQuery && (
              <div className="mb-6 p-4 bg-[#137952]/10 rounded-xl border border-[#137952]/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Search Results for "{searchQuery}"
                    </h3>
                    <p className="text-sm text-gray-600">
                      Found {filteredQuestions.length} matching questions
                    </p>
                  </div>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-sm text-[#137952] hover:text-[#137952] font-medium"
                  >
                    Clear search
                  </button>
                </div>
              </div>
            )}

            {searchQuery ? (
              filteredQuestions.length > 0 ? (
                <div className="space-y-4">
                  {filteredQuestions.map((item, index) => (
                    <div 
                      key={index} 
                      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[#137952]/50 transition-colors"
                    >
                      <button
                        onClick={() => toggleQuestion('search', index)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <div>
                          <div className="text-xs text-gray-500 mb-1">{item.category}</div>
                          <span className="font-medium text-gray-900">{item.question}</span>
                        </div>
                        <svg 
                          className={`w-5 h-5 text-[#137952] transition-transform ${openSections[`search-${index}`] ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openSections[`search-${index}`] && (
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                          <p className="text-gray-600">{item.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600 mb-4">Try different keywords or browse categories</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#137952] text-white rounded-lg hover:bg-[#0d5c3d] transition-colors"
                  >
                    View All Questions
                  </button>
                </div>
              )
            ) : (
              renderQuestions()
            )}
          </div>
        </div>

        {/* Still Have Questions */}
        <div className="mt-16 bg-gradient-to-r from-[#137952] to-[#0d5c3d] rounded-2xl p-8 lg:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Still Have Questions?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our support team is here to help you 
            with any questions about our CMA test series platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#137952] font-semibold rounded-xl hover:bg-gray-50 transition-colors shadow-lg"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Support Team
            </a>
            <a 
              href="tel:+9118001234567" 
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call: 1800-123-4567
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
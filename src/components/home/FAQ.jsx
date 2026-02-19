import { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Is the Foundation test series really free?",
      answer: "Yes, the CMA Foundation test series is completely free forever. You get access to 12 full-length mock tests, 1500+ practice questions, basic performance analytics, and email support without any charges.",
   
    },
    {
      question: "How does the evaluation process work?",
      answer: "Our evaluation process involves three stages: 1) Automated initial checking for objective questions, 2) Manual evaluation by CMA experts for subjective answers, 3) Detailed feedback and scoring. You'll receive personalized comments, mark distribution, and improvement suggestions within 48 hours.",
     
    },
    {
      question: "What makes your test series different from others?",
      answer: "We offer: AI-powered performance analytics, real CMA expert evaluators, exam-simulation environment, detailed solution explanations, comparative ranking with peers, personalized study recommendations, and 24/7 doubt support via chat.",
  
    },
    {
      question: "Can I access test series on mobile?",
      answer: "Yes, our platform is fully responsive and works seamlessly on mobile, tablet, and desktop. We also have dedicated mobile apps for iOS and Android with offline access to previously attempted tests.",
 
    },
    {
      question: "How many mock tests are included in each package?",
      answer: "Foundation: 12 mock tests, Intermediate: 24 mock tests, Final: 36 mock tests. Each mock test simulates actual exam conditions with time limits, question patterns, and difficulty levels matching the real CMA exams.",
    
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major payment methods: Credit/Debit Cards (Visa, MasterCard, RuPay), Net Banking, UPI, PayPal, and EMI options. All transactions are secured with 256-bit SSL encryption.",
 
    },
    {
      question: "Is there a refund policy?",
      answer: "Yes, we offer a 14-day money-back guarantee. If you're not satisfied with our platform within the first 14 days of purchase, we'll provide a full refund, no questions asked.",
     
    },
    {
      question: "How soon will I get my results after submitting a test?",
      answer: "For objective sections: Instant results. For subjective evaluations: Within 24-48 hours. For detailed analytics and expert feedback: Within 72 hours maximum.",
   
    },
    {
      question: "Do you provide study material along with tests?",
      answer: "Yes, all test series include comprehensive study material: Syllabus breakdown, important formulas, previous year question papers, topic-wise notes, and recommended reference books.",
 
    },
    {
      question: "Can I upgrade my plan later?",
      answer: "Absolutely! You can upgrade from Foundation to Intermediate or Final plans anytime. We'll deduct the amount you've already paid and charge only the difference for the remaining period.",
 
    }
  ]; 

  const filteredFaqs = faqs.filter(faq => 
    openIndex === 0 ? true : faq.category === categories[openIndex]
  );

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-[#137952]/10 rounded-full mb-4">
            <span className="text-[#137952] text-sm font-medium">
              Need Help?
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find quick answers to common questions about our test series platform.
            Can't find what you're looking for? Contact our support team.
          </p>
        </div>
 
           

          {/* Right Column - FAQs */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
             

              {/* FAQ List */}
              <div className="divide-y divide-gray-200">
                {filteredFaqs.map((faq, index) => {
                  const [isOpen, setIsOpen] = useState(index === 0);
                  
                  return (
                    <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                      <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full text-left flex items-start justify-between gap-4 focus:outline-none"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                           
                            <h3 className="text-lg font-semibold text-gray-900">
                              {faq.question}
                            </h3>
                          </div>
                          {isOpen && (
                            <p className="text-gray-600 mt-3 leading-relaxed">
                              {faq.answer}
                            </p>
                          )}
                        </div>
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full border ${isOpen ? 'bg-[#137952]/10 border-[#137952]/30' : 'bg-gray-50 border-gray-200'}`}>
                          <svg 
                            className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180 text-[#137952]' : 'text-gray-400'}`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
 
            </div>

            {/* Additional Information */}
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">24/7 Support</h4>
                <p className="text-sm text-gray-600">
                  Get instant help via chat, email, or phone anytime.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="w-12 h-12 bg-[#137952]/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#137952]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Secure Platform</h4>
                <p className="text-sm text-gray-600">
                  Bank-level security for all your data and payments.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Money Back Guarantee</h4>
                <p className="text-sm text-gray-600">
                  14-day refund policy if you're not satisfied.
                </p>
              </div>
            </div>
          </div>
        </div>
     
    </section>
  );
};

export default FAQ;
import { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    
    {
      question: "Is the Foundation test series really free?",
      answer: "Yes, the CMA Foundation test series is completely free. Register to access MCQs and get your answers evaluated instantly after submission.",
    },
    {
      question: "How quickly my test will be evaluated?",
      answer: "Foundation – Instant evaluation.   \n Intermediate & Final – Within 24 hours.",
    },
    {
      question: "What makes your test series different from others?",
      answer: "Our test series is designed exclusively for CMA students, ensuring every paper matches the exact exam pattern and expectations. You experience real exam conditions through built-in timer-based tests, practice with strictly exam-oriented papers, and receive evaluated answer sheets within 24 hours to continuously improve your performance.",
    },
    {
      question: "What is the test pattern — chapter-wise tests or full-length paper tests?",
      answer: "Our test structure is based on detailed CMA exam analysis. High-weightage chapters are tested individually, while comparatively less critical chapters are grouped into combined tests. Each paper concludes with a full-length mock test for complete exam readiness. You can view the complete index showing how each chapter is grouped in the Pricing section.    ",
    },
    {
      question: "Can I access test series on mobile?",
      answer: "Yes, our platform is fully responsive and works seamlessly on mobile, tablet, and desktop.",
    },
  ];

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
                {faqs.map((faq, index) => {
                  const isOpen = openIndex === index;
                  return (
                    <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                      <button
                        type="button"
                        onClick={() => setOpenIndex(isOpen ? null : index)}
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
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full border shrink-0 ${isOpen ? 'bg-[#137952]/10 border-[#137952]/30' : 'bg-gray-50 border-gray-200'}`}>
                          <svg
                            className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180 text-[#137952]' : 'text-gray-400'}`}
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
          </div>
      </div>
    </section>
  );
};

export default FAQ;
const HowItWorks = () => {
    const steps = [
      {
        number: "01",
        title: "Register & Login",
        description: "Create your account and access the dashboard instantly",
        color: "green",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        ),
      },
      {
        number: "02",
        title: "Start Exam",
        description: "Choose your test series and begin the timed exam",
        color: "emerald",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      },
      {
        number: "03",
        title: "Write on Paper",
        description: "Solve questions on paper like real exam conditions",
        color: "purple",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        ),
      },
      {
        number: "04",
        title: "Upload PDF",
        description: "Scan and upload your answer sheet via mobile or computer",
        color: "orange",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        ),
      },
      {
        number: "05",
        title: "Expert Evaluation",
        description: "CMA experts evaluate your paper with detailed feedback",
        color: "pink",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      },
      {
        number: "06",
        title: "Result Published",
        description: "Get analytics, ranking, and improvement tips",
        color: "indigo",
        icon: (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        ),
      },
    ];
  
    const gradients = {
      blue: "from-[#137952]/80 to-[#137952]",
      emerald: "from-emerald-500 to-emerald-600",
      purple: "from-purple-500 to-purple-600",
      orange: "from-orange-500 to-orange-600",
      pink: "from-pink-500 to-pink-600",
      indigo: "from-indigo-500 to-indigo-600",
    };
  
    return (
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
  
          {/* Header */}
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-[#137952]/10 text-[#137952] text-sm font-medium rounded-full mb-4">
              Simple Process
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Step-by-step exam workflow with expert evaluation.
            </p>
          </div>
  
          {/* Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition"
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 mb-4 rounded-xl flex items-center justify-center bg-gradient-to-br ${gradients[step.color]} text-white shadow`}
                >
                  {step.icon}
                </div>
  
                {/* Step Number */}
                <span className="text-sm font-semibold text-gray-400">
                  Step {step.number}
                </span>
  
                <h3 className="text-xl font-bold text-gray-900 mt-1 mb-2">
                  {step.title}
                </h3>
  
                <p className="text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default HowItWorks;
  
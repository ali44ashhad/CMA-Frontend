const MockTests = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-5xl mx-auto px-4 py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mock Tests</h1>
          <p className="mt-2 text-gray-600">
            Attempt exam-style mock tests with real-time evaluation and detailed analytics.
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          <section className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-xl bg-[#137952]/10 border border-[#137952]/20">
              <h2 className="text-sm font-semibold text-[#0d5c3d]">Foundation Mocks</h2>
              <p className="mt-1 text-xs text-[#137952]">
                Balanced mix of conceptual and numerical questions.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
              <h2 className="text-sm font-semibold text-emerald-900">Intermediate Mocks</h2>
              <p className="mt-1 text-xs text-emerald-800">
                Group-wise mocks with chapter coverage tracking.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-violet-50 border border-violet-100">
              <h2 className="text-sm font-semibold text-violet-900">Final Mocks</h2>
              <p className="mt-1 text-xs text-violet-800">
                Case-study oriented tests with detailed feedback.
              </p>
            </div>
          </section>

          <section className="border-t border-gray-100 pt-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">How our mock tests help you</h2>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Simulated exam environment with fixed duration</li>
              <li>Instant scorecard with section-wise analysis</li>
              <li>Peer comparison and percentile insights</li>
              <li>Review mode with correct answers and explanations</li>
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
};

export default MockTests;


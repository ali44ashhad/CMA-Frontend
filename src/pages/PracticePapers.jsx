const PracticePapers = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-5xl mx-auto px-4 py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Practice Papers</h1>
          <p className="mt-2 text-gray-600">
            Chapter-wise and full-length practice papers designed to strengthen concepts and improve accuracy.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900">Chapter-wise Practice</h2>
            <p className="mt-2 text-sm text-gray-600">
              Target specific chapters with focused sets of questions and detailed solutions.
            </p>
            <ul className="mt-4 list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>Concept building questions</li>
              <li>Sectional tests with timers</li>
              <li>Instant feedback and explanations</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900">Full-Length Papers</h2>
            <p className="mt-2 text-sm text-gray-600">
              Simulate the real exam with full-length practice papers and detailed performance breakdown.
            </p>
            <ul className="mt-4 list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>Exam-like pattern and difficulty</li>
              <li>Time management analytics</li>
              <li>Section-wise strength/weakness</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PracticePapers;


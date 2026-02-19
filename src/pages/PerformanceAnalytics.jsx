const PerformanceAnalytics = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-5xl mx-auto px-4 py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Performance Analytics</h1>
          <p className="mt-2 text-gray-600">
            Track your progress across tests, subjects, and attempts with intuitive analytics.
          </p>
        </header>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900">Score Trends</h2>
            <p className="mt-2 text-sm text-gray-600">
              Visualize how your scores improve over multiple attempts and identify consistency.
            </p>
            <p className="mt-4 text-xs text-gray-500">
              (Charts and detailed analytics will appear here based on your actual test data.)
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900">Topic-wise Analysis</h2>
            <p className="mt-2 text-sm text-gray-600">
              Discover strong and weak topics so you can revise with precision.
            </p>
            <ul className="mt-4 list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>Accuracy and attempt rate for each chapter</li>
              <li>Comparison with average performance of other aspirants</li>
              <li>Smart revision suggestions</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PerformanceAnalytics;


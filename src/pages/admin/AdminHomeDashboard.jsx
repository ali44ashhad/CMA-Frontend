import React, { useEffect, useState } from "react";
import { ADMIN_ENDPOINTS, authedJsonFetch } from "../../api";

const AdminHomeDashboard = ({ accessToken }) => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!accessToken) return;
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await authedJsonFetch(
          ADMIN_ENDPOINTS.ANALYTICS_DASHBOARD,
          accessToken
        );
        setAnalytics(data);
      } catch (e) {
        console.error("Admin analytics load error:", e);
        setError(e.message || "Failed to load dashboard analytics.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [accessToken]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <p className="text-xs text-gray-500">
            High level overview of students, evaluators, exams and revenue.
          </p>
        </div>
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-sm text-gray-500">Loading analytics...</div>
      )}

      {analytics && (
        <>
          <div className="grid gap-4 md:grid-cols-3 text-sm">
            <div className="p-3 rounded-lg border bg-white shadow-sm">
              <div className="text-xs text-gray-500">Total Students</div>
              <div className="text-2xl font-semibold">
                {analytics.totalStudents}
              </div>
            </div>
            <div className="p-3 rounded-lg border bg-white shadow-sm">
              <div className="text-xs text-gray-500">Total Evaluators</div>
              <div className="text-2xl font-semibold">
                {analytics.totalEvaluators}
              </div>
            </div>
            <div className="p-3 rounded-lg border bg-white shadow-sm">
              <div className="text-xs text-gray-500">Total Revenue</div>
              <div className="text-2xl font-semibold">
                ₹{analytics.totalRevenue}
              </div>
            </div>
            <div className="p-3 rounded-lg border bg-white shadow-sm">
              <div className="text-xs text-gray-500">
                Pending Evaluations
              </div>
              <div className="text-2xl font-semibold">
                {analytics.pendingEvaluations}
              </div>
            </div>
            <div className="p-3 rounded-lg border bg-white shadow-sm">
              <div className="text-xs text-gray-500">
                Completed Evaluations
              </div>
              <div className="text-2xl font-semibold">
                {analytics.completedEvaluations}
              </div>
            </div>
            <div className="p-3 rounded-lg border bg-white shadow-sm">
              <div className="text-xs text-gray-500">Active Packages</div>
              <div className="text-2xl font-semibold">
                {analytics.activePackages}
              </div>
            </div>
            <div className="p-3 rounded-lg border bg-white shadow-sm">
              <div className="text-xs text-gray-500">Active Exams</div>
              <div className="text-2xl font-semibold">
                {analytics.activeExams}
              </div>
            </div>
          </div>
 
        </>
      )}
    </div>
  );
};

export default AdminHomeDashboard;


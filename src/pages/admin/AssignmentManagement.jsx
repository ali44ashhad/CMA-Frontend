import React, { useEffect, useState } from "react";
import { BASE_URL_ADMINS, authedJsonFetch } from "../../api";

const AssignmentManagement = ({ accessToken }) => {
  const [pendingAssignments, setPendingAssignments] = useState([]);
  const [evaluators, setEvaluators] = useState([]);
  const [assignForm, setAssignForm] = useState({
    examAttemptId: "",
    evaluatorId: "",
  });
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignmentMessage, setAssignmentMessage] = useState("");
  const [assignmentError, setAssignmentError] = useState("");
  const [assignmentSaving, setAssignmentSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  const authedFetch = (path, options = {}) =>
    authedJsonFetch(`${BASE_URL_ADMINS}${path}`, accessToken, options);

  const loadPending = async () => {
    try {
      setLoading(true);
      setAssignmentError("");
      const data = await authedFetch(`/assignments/pending`);
      const list = Array.isArray(data?.pendingExams)
        ? data.pendingExams
        : Array.isArray(data?.items)
          ? data.items
          : Array.isArray(data)
            ? data
            : [];
      setPendingAssignments(list);
    } catch (e) {
      console.error("Assignment management error:", e);
      setAssignmentError(e.message || "Failed to load pending assignments.");
      setPendingAssignments([]);
    } finally {
      setLoading(false);
    }
  };

  const loadEvaluators = async () => {
    try {
      const data = await authedFetch(`/users?role=evaluator&limit=100`);
      const list = Array.isArray(data?.users) ? data.users : Array.isArray(data?.items) ? data.items : [];
      setEvaluators(list);
    } catch (e) {
      console.error("Evaluators load error:", e);
    }
  };

  useEffect(() => {
    if (!accessToken) return;
    loadPending();
    loadEvaluators();
  }, [accessToken]);

  useEffect(() => {
    if (assignmentMessage) {
      loadPending();
    }
  }, [assignmentMessage]);

  const openAssignModal = (attempt) => {
    setAssignmentError("");
    setShowAssignModal(true);
    setAssignForm({ examAttemptId: attempt._id, evaluatorId: evaluators[0]?._id || "" });
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    if (!assignForm.examAttemptId || !assignForm.evaluatorId) {
      setAssignmentError("Select an evaluator.");
      return;
    }
    try {
      setAssignmentSaving(true);
      setAssignmentError("");
      await authedFetch(`/assignments`, {
        method: "POST",
        body: JSON.stringify({
          examAttemptId: assignForm.examAttemptId,
          evaluatorId: assignForm.evaluatorId,
        }),
      });
      setAssignmentMessage("Assignment created successfully.");
      setShowAssignModal(false);
    } catch (err) {
      setAssignmentError(err.message || "Failed to assign.");
    } finally {
      setAssignmentSaving(false);
    }
  };

  return (
    <div className="space-y-5 text-xs">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Assignment Management
        </h2>
        <p className="text-xs text-gray-500">
          View pending answer sheets and assign / reassign them to evaluators.
        </p>
      </div>
      {assignmentError && (
        <div className="text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {assignmentError}
        </div>
      )}
      {assignmentMessage && (
        <div className="text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2">
          {assignmentMessage}
        </div>
      )}
      <div className="grid gap-6 md:grid-cols-3 items-start">
        <div className="md:col-span-2">
          <h3 className="text-sm font-semibold mb-2 text-gray-900">
            Pending Assignments
          </h3>
          {loading ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : pendingAssignments.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-6 text-center">
              <p className="text-sm text-gray-600 mb-1">No pending PDF answer sheets.</p>
              <p className="text-xs text-gray-500">
                When students submit <strong>PDF exams</strong>, they will appear here. MCQ exams are auto-graded and do not need assignment.
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm">
              <table className="w-full text-[11px]">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-3 py-2 border-b text-left">Attempt ID</th>
                    <th className="px-3 py-2 border-b text-left">Student</th>
                    <th className="px-3 py-2 border-b text-left">Exam</th>
                    <th className="px-3 py-2 border-b text-left">Submitted At</th>
                    <th className="px-3 py-2 border-b text-center w-24">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pendingAssignments.map((a) => (
                    <tr key={a._id} className="hover:bg-gray-50/60">
                      <td className="px-3 py-2 font-medium text-gray-900 truncate max-w-[120px]" title={a._id}>
                        {String(a._id).slice(-8)}
                      </td>
                      <td className="px-3 py-2 text-gray-700">{a.studentName || "-"}</td>
                      <td className="px-3 py-2 text-gray-700">{a.examName || "-"}</td>
                      <td className="px-3 py-2 text-gray-600">
                        {a.submittedAt ? new Date(a.submittedAt).toLocaleString() : "-"}
                      </td>
                      <td className="px-3 py-2 text-center">
                        <button
                          type="button"
                          onClick={() => openAssignModal(a)}
                          className="px-2 py-1 rounded-lg bg-[#137952] text-white text-[11px] font-medium hover:bg-[#0d5c3d]"
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Assign evaluator modal */}
      {showAssignModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-md">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Assign to evaluator</h3>
              <button
                type="button"
                onClick={() => setShowAssignModal(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleAssign} className="p-5 space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Evaluator</label>
                <select
                  value={assignForm.evaluatorId}
                  onChange={(e) => setAssignForm((f) => ({ ...f, evaluatorId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  required
                >
                  <option value="">Select evaluator</option>
                  {evaluators.map((ev) => (
                    <option key={ev._id} value={ev._id}>
                      {ev.name || ev.email || ev._id}
                    </option>
                  ))}
                </select>
                {evaluators.length === 0 && (
                  <p className="text-xs text-amber-600 mt-1">No evaluators found. Create one from User Management.</p>
                )}
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={assignmentSaving || evaluators.length === 0}
                  className="px-4 py-2 rounded-lg bg-[#137952] text-white disabled:opacity-50"
                >
                  {assignmentSaving ? "Assigning..." : "Assign"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default AssignmentManagement;
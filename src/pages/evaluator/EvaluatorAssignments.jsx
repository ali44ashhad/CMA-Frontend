import React, { useEffect, useState } from "react";
import { BASE_URL, EVALUATOR_ENDPOINTS, authedJsonFetch } from "../../api";

const EvaluatorAssignments = ({ accessToken }) => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [page] = useState(1);
  const [limit] = useState(20);
  const [evalForm, setEvalForm] = useState({
    assignmentId: "",
    marks: "",
    remarks: "",
    file: null,
  });
  const [selectedAssignmentPdfUrl, setSelectedAssignmentPdfUrl] = useState(null);
  const [showEvalModal, setShowEvalModal] = useState(false);
  const [evalSaving, setEvalSaving] = useState(false);
  const [evalError, setEvalError] = useState("");
  const [evalSuccess, setEvalSuccess] = useState("");

  const authedFetch = (path, options = {}) =>
    authedJsonFetch(path.startsWith("http") ? path : `${BASE_URL}${path}`, accessToken, options);

  const loadAssignments = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);
      params.set("page", String(page));
      params.set("limit", String(limit));
      const qs = params.toString();
      const data = await authedFetch(
        `${EVALUATOR_ENDPOINTS.ASSIGNMENTS}${qs ? `?${qs}` : ""}`
      );
      const list = data.assignments || data.items || data;
      setAssignments(Array.isArray(list) ? list : []);
    } catch (e) {
      console.error("Evaluator assignments error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!accessToken) return;
    loadAssignments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, statusFilter]);

  const handleAccept = async (assignmentId) => {
    if (!window.confirm("Accept this assignment? You will be responsible for evaluating it.")) return;
    try {
      await authedFetch(
        EVALUATOR_ENDPOINTS.ACCEPT_ASSIGNMENT(assignmentId),
        { method: "PUT" }
      );
      await loadAssignments();
    } catch (e) {
      console.error("Accept assignment failed", e);
    }
  };

  const handleReject = async (assignmentId) => {
    if (!window.confirm("Reject this assignment? It will be sent back for reassignment.")) return;
    try {
      await authedFetch(
        EVALUATOR_ENDPOINTS.REJECT_ASSIGNMENT(assignmentId),
        { method: "PUT" }
      );
      await loadAssignments();
    } catch (e) {
      console.error("Reject assignment failed", e);
    }
  };

  const openEvalForm = (assignment) => {
    const a = typeof assignment === "object" ? assignment : { _id: assignment, submittedPdfUrl: null };
    setEvalError("");
    setEvalSuccess("");
    setEvalForm({
      assignmentId: a._id,
      marks: "",
      remarks: "",
      file: null,
    });
    setSelectedAssignmentPdfUrl(a.submittedPdfUrl || null);
    setShowEvalModal(true);
  };

  const submitEvaluation = async (e) => {
    e.preventDefault();
    setEvalError("");
    setEvalSuccess("");
    if (!evalForm.assignmentId) {
      setEvalError("No assignment selected.");
      return;
    }
    if (!evalForm.marks || !evalForm.file) {
      setEvalError("Marks and checked PDF are required.");
      return;
    }
    try {
      setEvalSaving(true);
      const formData = new FormData();
      formData.append("checkedPdf", evalForm.file);
      formData.append("marks", evalForm.marks);
      formData.append("remarks", evalForm.remarks || "");

      const res = await fetch(
        `${BASE_URL}${EVALUATOR_ENDPOINTS.SUBMIT_EVALUATION(
          evalForm.assignmentId
        )}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to submit evaluation");
      }
      setEvalSuccess("Evaluation submitted successfully.");
      setEvalForm({ assignmentId: "", marks: "", remarks: "", file: null });
      setSelectedAssignmentPdfUrl(null);
      setShowEvalModal(false);
      await loadAssignments();
    } catch (err) {
      setEvalError(err.message || "Failed to submit evaluation.");
    } finally {
      setEvalSaving(false);
    }
  };

  const pendingCount = assignments.filter((a) => a.status === "pending").length;
  const acceptedCount = assignments.filter((a) => a.status === "accepted").length;
  const completedCount = assignments.filter((a) => a.status === "completed").length;

  return (
    <div className="space-y-5 text-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Assignments
          </h2>
          <p className="text-xs text-gray-500">
            Accept, reject, or submit evaluations for assigned answer sheets.
          </p>
        </div>
        <div className="inline-flex rounded-full border border-gray-200 bg-white shadow-sm overflow-hidden text-xs">
          <button
            onClick={() => setStatusFilter("")}
            className={`px-3 py-1.5 ${statusFilter === "" ? "bg-[#137952] text-white" : "bg-white"}`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter("pending")}
            className={`px-3 py-1.5 border-l border-gray-200 ${
              statusFilter === "pending" ? "bg-[#137952] text-white" : "bg-white"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setStatusFilter("accepted")}
            className={`px-3 py-1.5 border-l border-gray-200 ${
              statusFilter === "accepted"
                ? "bg-[#137952] text-white"
                : "bg-white"
            }`}
          >
            Accepted
          </button>
          <button
            onClick={() => setStatusFilter("completed")}
            className={`px-3 py-1.5 border-l border-gray-200 ${
              statusFilter === "completed"
                ? "bg-[#137952] text-white"
                : "bg-white"
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3 text-[11px]">
        <div className="rounded-2xl border border-gray-200 bg-white px-3 py-3 shadow-sm">
          <div className="text-[10px] text-gray-500 mb-1">Pending</div>
          <div className="text-lg font-semibold text-amber-600">{pendingCount}</div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white px-3 py-3 shadow-sm">
          <div className="text-[10px] text-gray-500 mb-1">Accepted</div>
          <div className="text-lg font-semibold text-[#137952]">{acceptedCount}</div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white px-3 py-3 shadow-sm">
          <div className="text-[10px] text-gray-500 mb-1">Completed</div>
          <div className="text-lg font-semibold text-emerald-600">{completedCount}</div>
        </div>
      </div>

      {loading ? (
        <p className="text-xs text-gray-500">Loading assignments...</p>
      ) : assignments.length === 0 ? (
        <p className="text-xs text-gray-500">No assignments found for the selected filter.</p>
      ) : (
        <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm">
          <table className="w-full text-xs min-w-[500px]">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-3 py-2 border-b text-left">Exam / Title</th>
                <th className="px-3 py-2 border-b text-left">Student</th>
                <th className="px-3 py-2 border-b text-left">Answer sheet</th>
                <th className="px-3 py-2 border-b text-left">Status</th>
                <th className="px-3 py-2 border-b text-center w-40">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {assignments.map((a) => (
                <tr key={a._id} className="hover:bg-gray-50/70">
                  <td className="px-3 py-2 font-medium text-gray-900">
                    {a.examName || a.title || "-"}
                  </td>
                  <td className="px-3 py-2 text-gray-700">
                    {a.studentName || "-"}
                  </td>
                  <td className="px-3 py-2">
                    {a.submittedPdfUrl ? (
                      <a
                        href={a.submittedPdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-[#137952]/10 text-[#137952] font-medium hover:bg-[#137952]/20 text-[11px]"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        View PDF
                      </a>
                    ) : (
                      <span className="text-gray-400 text-[11px]">No PDF uploaded</span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium capitalize ${
                        a.status === "pending"
                          ? "bg-amber-50 text-amber-700"
                          : a.status === "accepted"
                          ? "bg-[#137952]/10 text-[#137952]"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <div className="inline-flex items-center gap-1">
                      {a.status === "pending" && (
                        <>
                          <button
                            type="button"
                            className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium hover:bg-emerald-100 text-[11px]"
                            onClick={() => handleAccept(a._id)}
                          >
                            Accept
                          </button>
                          <button
                            type="button"
                            className="px-2 py-1 rounded-full bg-red-50 text-red-600 font-medium hover:bg-red-100 text-[11px]"
                            onClick={() => handleReject(a._id)}
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {a.status === "accepted" && (
                        <button
                          type="button"
                          className="px-2 py-1 rounded-full bg-[#137952]/10 text-[#137952] font-medium hover:bg-[#137952]/20 text-[11px]"
                          onClick={() => openEvalForm(a)}
                        >
                          Submit Evaluation
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Submit Evaluation Modal */}
      {showEvalModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4 overflow-y-auto py-6">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 text-xs relative my-auto">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Submit Evaluation
                </h3>
                <p className="text-[11px] text-gray-500">
                  Upload checked PDF and enter marks and remarks.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowEvalModal(false);
                  setEvalForm({ assignmentId: "", marks: "", remarks: "", file: null });
                  setSelectedAssignmentPdfUrl(null);
                  setEvalError("");
                  setEvalSuccess("");
                }}
                className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Student's answer sheet PDF - must view to evaluate */}
            <div className="mb-4 p-3 rounded-xl bg-gray-50 border border-gray-200">
              <h4 className="text-[11px] font-semibold text-gray-700 mb-2">Student&apos;s answer sheet (PDF)</h4>
              {selectedAssignmentPdfUrl ? (
                <a
                  href={selectedAssignmentPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#137952] text-white text-[11px] font-medium hover:bg-[#0d5c3d]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Open PDF in new tab
                </a>
              ) : (
                <p className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  No PDF uploaded by student yet. Evaluation cannot be completed until the student uploads their answer sheet.
                </p>
              )}
            </div>

            {evalError && (
              <div className="text-[11px] text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2 mb-2">
                {evalError}
              </div>
            )}
            {evalSuccess && (
              <div className="text-[11px] text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2 mb-2">
                {evalSuccess}
              </div>
            )}

            <form className="space-y-2" onSubmit={submitEvaluation}>
              <div>
                <label className="block mb-1 text-gray-600">Marks</label>
                <input
                  type="number"
                  value={evalForm.marks}
                  onChange={(e) =>
                    setEvalForm((f) => ({ ...f, marks: e.target.value }))
                  }
                  className="w-full border rounded-lg px-2 py-1.5"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-600">Remarks</label>
                <textarea
                  rows={2}
                  value={evalForm.remarks}
                  onChange={(e) =>
                    setEvalForm((f) => ({ ...f, remarks: e.target.value }))
                  }
                  className="w-full border rounded-lg px-2 py-1.5"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-600">
                  Checked PDF (required)
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) =>
                    setEvalForm((f) => ({
                      ...f,
                      file: e.target.files?.[0] || null,
                    }))
                  }
                  className="w-full text-[11px]"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowEvalModal(false);
                    setEvalForm({ assignmentId: "", marks: "", remarks: "", file: null });
                    setSelectedAssignmentPdfUrl(null);
                  }}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 text-[11px] hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={evalSaving}
                  className="px-4 py-1.5 rounded-lg bg-[#137952] text-white text-[11px] font-medium disabled:opacity-60"
                >
                  {evalSaving ? "Submitting..." : "Submit Evaluation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluatorAssignments;

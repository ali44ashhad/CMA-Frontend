import React, { useEffect, useState } from "react";
import { BASE_URL, BASE_URL_ADMINS, STUDENT_ENDPOINTS, authedJsonFetch } from "../../api";

const ExamManagement = ({ accessToken }) => {
  const [exams, setExams] = useState([]);
  const [examsLoading, setExamsLoading] = useState(false);
  const [topics, setTopics] = useState([]);
  const [mcqForm, setMcqForm] = useState({
    name: "",
    topicId: "",
    level: "foundation",
    year: "",
    duration: "",
    maxMarks: "",
    extensionsAllowed: "0",
    extensionInterval: "0",
  });
  const [questions, setQuestions] = useState([
    { questionText: "", options: ["", "", "", ""], correctOption: 0, marks: 1 },
  ]);
  const [pdfExamForm, setPdfExamForm] = useState({
    name: "",
    level: "intermediate",
    year: "",
    duration: "",
    maxMarks: "",
    topicId: "",
    extensionsAllowed: "0",
    extensionInterval: "0",
    questionPaper: null,
  });
  const [editingExam, setEditingExam] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    level: "foundation",
    year: "",
    topicId: "",
    duration: "",
    maxMarks: "",
    extensionsAllowed: "0",
    extensionInterval: "0",
  });
  const [examMessage, setExamMessage] = useState("");
  const [examError, setExamError] = useState("");
  const [examSaving, setExamSaving] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createType, setCreateType] = useState("mcq"); // 'mcq' | 'pdf'
  const emptyQuestion = () => ({
    questionText: "",
    options: ["", "", "", ""],
    correctOption: 0,
    marks: 1,
  });

  const addQuestion = () => {
    setQuestions((prev) => [...prev, emptyQuestion()]);
  };

  const authedFetch = (path, options = {}) =>
    authedJsonFetch(`${BASE_URL_ADMINS}${path}`, accessToken, options);

  const loadExams = async () => {
    if (!accessToken) return;
    try {
      setExamsLoading(true);
      const data = await authedJsonFetch(
        `${BASE_URL}${STUDENT_ENDPOINTS.EXAMS}`,
        accessToken
      );
      const list = data.exams || data.items || data;
      setExams(Array.isArray(list) ? list : []);
    } catch (e) {
      console.error("Load exams failed", e);
    } finally {
      setExamsLoading(false);
    }
  };

  useEffect(() => {
    const loadTopics = async () => {
      try {
        const data = await authedFetch(`/topics`);
        const list = data.items || data;
        setTopics(Array.isArray(list) ? list : []);
      } catch (e) {
        console.error("Load topics for exam management failed", e);
      }
    };
    if (accessToken) {
      loadTopics();
      loadExams();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return (
    <div className="space-y-5 text-xs">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Exam Management
        </h2>
        <p className="text-xs text-gray-500">
          Create MCQ / PDF exams, update existing exams and manage deletions.
        </p>
      </div>
      {examError && (
        <div className="text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {examError}
        </div>
      )}
      {examMessage && (
        <div className="text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2">
          {examMessage}
        </div>
      )}

      {/* Create new exam button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            setExamError("");
            setExamMessage("");
            setShowCreateModal(true);
            setCreateType("mcq");
            setQuestions([emptyQuestion()]);
            setMcqForm({
              name: "",
              topicId: "",
              level: "foundation",
              year: "",
              duration: "",
              maxMarks: "",
              extensionsAllowed: "0",
              extensionInterval: "0",
            });
            setPdfExamForm({
              name: "",
              level: "intermediate",
              year: "",
              duration: "",
              maxMarks: "",
              topicId: "",
              extensionsAllowed: "0",
              extensionInterval: "0",
              questionPaper: null,
            });
          }}
          className="inline-flex items-center px-4 py-2 rounded-xl bg-[#137952] text-white text-sm font-medium shadow-sm hover:bg-[#0d5c3d]"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create new exam
        </button>
      </div>

      {/* Existing exams list */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">
            Existing Exams ({exams.length})
          </h3>
        </div>
        {examsLoading ? (
          <p className="text-[11px] text-gray-500">Loading exams...</p>
        ) : exams.length === 0 ? (
          <p className="text-[11px] text-gray-500">
            No exams yet. Create MCQ or PDF exams below.
          </p>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-auto">
            <table className="w-full text-[11px] min-w-[640px]">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-3 py-2 border-b text-left">Name</th>
                  <th className="px-3 py-2 border-b text-left">Level</th>
                  <th className="px-3 py-2 border-b text-left">Year</th>
                  <th className="px-3 py-2 border-b text-left">Type</th>
                  <th className="px-3 py-2 border-b text-left">Max Marks</th>
                  <th className="px-3 py-2 border-b text-left">Topic</th>
                  <th className="px-3 py-2 border-b text-left">Duration</th>
                  <th className="px-3 py-2 border-b text-center w-28">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {exams.map((exam) => (
                  <tr key={exam._id} className="hover:bg-gray-50/70">
                    <td className="px-3 py-2 font-medium text-gray-900">
                      {exam.name}
                    </td>
                    <td className="px-3 py-2 capitalize text-gray-700">
                      {exam.level}
                    </td>
                    <td className="px-3 py-2 text-gray-700">
                      {exam.year ?? "-"}
                    </td>
                    <td className="px-3 py-2 text-gray-700 uppercase">
                      {exam.examType ?? "mcq"}
                    </td>
                    <td className="px-3 py-2 text-gray-700">
                      {exam.maxMarks ?? "-"}
                    </td>
                    <td className="px-3 py-2 text-gray-700">
                      {exam.topicName?? "-"}
                    </td>
                    <td className="px-3 py-2 text-gray-700">
                      {exam.duration != null ? `${exam.duration} min` : "-"}
                    </td>
                    <td className="px-3 py-2 text-center">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          className="px-2 py-1 rounded-full bg-[#137952]/10 text-[#137952] font-medium hover:bg-[#137952]/20 text-[11px]"
                          onClick={() => {
                            setExamError("");
                            setExamMessage("");
                            setEditingExam(exam);
                            const isPdf = (exam.examType || "").toLowerCase() === "pdf";
                            const allowedLevels = isPdf ? ["intermediate", "final"] : ["foundation"];
                            const currentLevel = exam.level ?? (isPdf ? "intermediate" : "foundation");
                            const safeLevel = allowedLevels.includes(currentLevel) ? currentLevel : allowedLevels[0];
                            const rawTopicId = exam.topicId?._id ? exam.topicId._id : (exam.topicId ?? "");
                            const topicForLevel = topics.find((t) => t._id === rawTopicId && (t.level || "").toLowerCase() === safeLevel);
                            const initialTopicId = topicForLevel ? rawTopicId : "";
                            setEditForm({
                              name: exam.name ?? "",
                              level: safeLevel,
                              year: exam.year != null ? String(exam.year) : "",
                              topicId: initialTopicId,
                              duration: exam.duration != null ? String(exam.duration) : "",
                              maxMarks: exam.maxMarks != null ? String(exam.maxMarks) : "",
                              extensionsAllowed: exam.extensionsAllowed != null ? String(exam.extensionsAllowed) : "0",
                              extensionInterval: exam.extensionInterval != null ? String(exam.extensionInterval) : "0",
                            });
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="px-2 py-1 rounded-full bg-red-50 text-red-600 font-medium hover:bg-red-100 text-[11px]"
                          onClick={async () => {
                            if (
                              !window.confirm(
                                "Are you sure you want to delete this exam?"
                              )
                            )
                              return;
                            try {
                              setExamError("");
                              setExamMessage("");
                              setExamSaving(true);
                              await authedFetch(`/exams/${exam._id}`, {
                                method: "DELETE",
                              });
                              setExamMessage("Exam deleted successfully.");
                              loadExams();
                            } catch (err) {
                              setExamError(
                                err.message || "Failed to delete exam."
                              );
                            } finally {
                              setExamSaving(false);
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit exam modal */}
      {editingExam && (
        <div className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center bg-black/40 p-4 overflow-y-auto min-h-screen">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-lg my-6 sm:my-8 min-w-0 mx-auto">
            <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-b border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Edit exam</h3>
              <button
                type="button"
                onClick={() => setEditingExam(null)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form
              className="p-4 sm:p-5 space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                setExamError("");
                setExamMessage("");
                if (!editForm.name?.trim()) {
                  setExamError("Name is required.");
                  return;
                }
                try {
                  setExamSaving(true);
                  const payload = {
                    name: editForm.name.trim(),
                    level: editForm.level,
                    year: editForm.year ? Number(editForm.year) : undefined,
                    topicId: editForm.topicId || undefined,
                    duration: editForm.duration ? Number(editForm.duration) : undefined,
                    maxMarks: editForm.maxMarks ? Number(editForm.maxMarks) : undefined,
                    extensionsAllowed: editForm.extensionsAllowed ? Number(editForm.extensionsAllowed) : 0,
                    extensionInterval: editForm.extensionInterval ? Number(editForm.extensionInterval) : 0,
                  };
                  await authedFetch(`/exams/${editingExam._id}`, {
                    method: "PUT",
                    body: JSON.stringify(payload),
                  });
                  setExamMessage("Exam updated successfully.");
                  setEditingExam(null);
                  loadExams();
                } catch (err) {
                  setExamError(err.message || "Failed to update exam.");
                } finally {
                  setExamSaving(false);
                }
              }}
            >
              <div>
                <label className="block text-gray-700 font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="Exam name"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Level</label>
                      <select
                        value={editForm.level}
                        onChange={(e) => {
                          const newLevel = e.target.value;
                          const currentTopic = topics.find((t) => t._id === editForm.topicId);
                          const topicStillValid = currentTopic && (currentTopic.level || "").toLowerCase() === newLevel;
                          setEditForm((f) => ({
                            ...f,
                            level: newLevel,
                            topicId: topicStillValid ? f.topicId : "",
                          }));
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      >
                    {(editingExam?.examType || "").toLowerCase() === "pdf" ? (
                      <>
                        <option value="intermediate">Intermediate</option>
                        <option value="final">Final</option>
                      </>
                    ) : (
                      <option value="foundation">Foundation</option>
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Year</label>
                  <input
                    type="number"
                    value={editForm.year}
                    onChange={(e) => setEditForm((f) => ({ ...f, year: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="YYYY"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Topic</label>
                <select
                  value={editForm.topicId}
                  onChange={(e) => setEditForm((f) => ({ ...f, topicId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="">Select topic</option>
                  {topics
                    .filter((t) => (t.level || "").toLowerCase() === (editForm.level || "").toLowerCase())
                    .map((t) => (
                      <option key={t._id} value={t._id}>{t.name}</option>
                    ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Duration (min)</label>
                  <input
                    type="number"
                    min="1"
                    value={editForm.duration}
                    onChange={(e) => setEditForm((f) => ({ ...f, duration: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Max Marks</label>
                  <input
                    type="number"
                    min="1"
                    value={editForm.maxMarks}
                    onChange={(e) => setEditForm((f) => ({ ...f, maxMarks: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Extensions allowed</label>
                  <input
                    type="number"
                    min="0"
                    value={editForm.extensionsAllowed}
                    onChange={(e) => setEditForm((f) => ({ ...f, extensionsAllowed: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Extension interval (min)</label>
                  <input
                    type="number"
                    min="0"
                    value={editForm.extensionInterval}
                    onChange={(e) => setEditForm((f) => ({ ...f, extensionInterval: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>
              {examError && (
                <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-[11px]">
                  {examError}
                </div>
              )}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingExam(null)}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={examSaving}
                  className="px-4 py-2 rounded-lg bg-[#137952] text-white disabled:opacity-60"
                >
                  {examSaving ? "Saving..." : "Save changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create new exam modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center bg-black/40 p-4 overflow-y-auto min-h-screen">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-4xl max-h-[calc(100vh-2rem)] sm:max-h-[90vh] overflow-hidden flex flex-col my-6 sm:my-8 min-w-0 min-h-0 mx-auto">
            <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-b border-gray-200 shrink-0">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Create new exam</h3>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-4 sm:px-5 py-2 border-b border-gray-100 flex gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setCreateType("mcq")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${createType === "mcq" ? "bg-[#137952] text-white" : "bg-gray-100 text-gray-700"}`}
              >
                MCQ Exam
              </button>
              <button
                type="button"
                onClick={() => setCreateType("pdf")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${createType === "pdf" ? "bg-[#137952] text-white" : "bg-gray-100 text-gray-700"}`}
              >
                PDF Exam
              </button>
            </div>

            <div className="p-4 sm:p-5 overflow-y-auto flex-1 min-h-0">
              {createType === "mcq" && (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setExamError("");
                    setExamMessage("");
                    if (!mcqForm.name || !mcqForm.topicId) {
                      setExamError("Name and topic are required.");
                      return;
                    }
                    const valid = questions.filter((q) => q.questionText.trim());
                    if (!valid.length) {
                      setExamError("Add at least one question with text.");
                      return;
                    }
                    try {
                      setExamSaving(true);
                      const payload = {
                        name: mcqForm.name,
                        topicId: mcqForm.topicId,
                        level: mcqForm.level,
                        year: mcqForm.year ? Number(mcqForm.year) : undefined,
                        duration: mcqForm.duration ? Number(mcqForm.duration) : undefined,
                        maxMarks: mcqForm.maxMarks ? Number(mcqForm.maxMarks) : valid.reduce((s, q) => s + Number(q.marks || 0), 0),
                        extensionsAllowed: Number(mcqForm.extensionsAllowed) || 0,
                        extensionInterval: Number(mcqForm.extensionInterval) || 0,
                        questions: valid.map((q) => ({
                          questionText: q.questionText,
                          options: q.options,
                          correctOption: Number(q.correctOption),
                          marks: Number(q.marks || 1),
                        })),
                      };
                      await authedFetch("/exams/mcq", { method: "POST", body: JSON.stringify(payload) });
                      setExamMessage("MCQ exam created successfully.");
                      loadExams();
                      setShowCreateModal(false);
                    } catch (err) {
                      setExamError(err.message || "Failed to create MCQ exam.");
                    } finally {
                      setExamSaving(false);
                    }
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Name</label>
                    <input
                      type="text"
                      value={mcqForm.name}
                      onChange={(e) => setMcqForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="Exam name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Level</label>
                      <select
                        value={mcqForm.level}
                        onChange={(e) => setMcqForm((f) => ({ ...f, level: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      >
                        <option value="foundation">Foundation</option>
                      </select>
                      <p className="text-[10px] text-gray-500 mt-0.5">MCQ exams are for Foundation level only.</p>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Year</label>
                      <input
                        type="number"
                        value={mcqForm.year}
                        onChange={(e) => setMcqForm((f) => ({ ...f, year: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="YYYY"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Topic</label>
                    <select
                      value={mcqForm.topicId}
                      onChange={(e) => setMcqForm((f) => ({ ...f, topicId: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="">Select topic</option>
                      {topics
                        .filter((t) => (t.level || "").toLowerCase() === "foundation")
                        .map((t) => (
                          <option key={t._id} value={t._id}>{t.name}</option>
                        ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Duration (min)</label>
                      <input
                        type="number"
                        min="1"
                        value={mcqForm.duration}
                        onChange={(e) => setMcqForm((f) => ({ ...f, duration: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Max Marks</label>
                      <input
                        type="number"
                        min="1"
                        value={mcqForm.maxMarks}
                        onChange={(e) => setMcqForm((f) => ({ ...f, maxMarks: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Extensions allowed</label>
                      <input
                        type="number"
                        min="0"
                        value={mcqForm.extensionsAllowed}
                        onChange={(e) => setMcqForm((f) => ({ ...f, extensionsAllowed: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Extension interval (min)</label>
                      <input
                        type="number"
                        min="0"
                        value={mcqForm.extensionInterval}
                        onChange={(e) => setMcqForm((f) => ({ ...f, extensionInterval: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-sm font-semibold text-gray-900">Questions ({questions.length})</span>
                      <button
                        type="button"
                        onClick={addQuestion}
                        className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 text-sm"
                      >
                        Add question
                      </button>
                    </div>
                    <div className="max-h-64 overflow-y-auto space-y-3 pr-1 border border-gray-300 rounded-lg p-2 bg-gray-50">
                      {questions.map((q, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-lg p-2 space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-700 text-sm">Q{index + 1}</span>
                            {questions.length > 1 && (
                              <button
                                type="button"
                                onClick={() => setQuestions((p) => p.filter((_, i) => i !== index))}
                                className="text-red-600 text-xs"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                          <textarea
                            rows={2}
                            placeholder="Question text"
                            value={q.questionText}
                            onChange={(e) => setQuestions((p) => p.map((qq, i) => (i === index ? { ...qq, questionText: e.target.value } : qq)))}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            {q.options.map((opt, oi) => (
                              <input
                                key={oi}
                                type="text"
                                placeholder={`Option ${oi + 1}`}
                                value={opt}
                                onChange={(e) => setQuestions((p) => p.map((qq, i) => (i === index ? { ...qq, options: qq.options.map((o, j) => (j === oi ? e.target.value : o)) } : qq)))}
                                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                              />
                            ))}
                          </div>
                          <div className="flex gap-2 items-center">
                            <select
                              value={q.correctOption}
                              onChange={(e) => setQuestions((p) => p.map((qq, i) => (i === index ? { ...qq, correctOption: Number(e.target.value) } : qq)))}
                              className="border border-gray-300 rounded px-2 py-1 text-sm"
                            >
                              {[0, 1, 2, 3].map((v) => (
                                <option key={v} value={v}>Correct: Option {v + 1}</option>
                              ))}
                            </select>
                            <input
                              type="number"
                              min={1}
                              value={q.marks}
                              onChange={(e) => setQuestions((p) => p.map((qq, i) => (i === index ? { ...qq, marks: e.target.value } : qq)))}
                              className="w-16 border border-gray-300 rounded px-2 py-1 text-sm"
                              placeholder="Marks"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {examError && (
                    <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm">
                      {examError}
                    </div>
                  )}
                  <div className="flex justify-end gap-2 pt-2">
                    <button type="button" onClick={() => setShowCreateModal(false)} className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700">
                      Cancel
                    </button>
                    <button type="submit" disabled={examSaving} className="px-4 py-2 rounded-lg bg-[#137952] text-white disabled:opacity-60">
                      {examSaving ? "Creating..." : "Create MCQ exam"}
                    </button>
                  </div>
                </form>
              )}

              {createType === "pdf" && (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setExamError("");
                    setExamMessage("");
                    if (!pdfExamForm.questionPaper) {
                      setExamError("Please select a question paper PDF.");
                      return;
                    }
                    if (!pdfExamForm.topicId?.trim()) {
                      setExamError("Please select a topic.");
                      return;
                    }
                    try {
                      setExamSaving(true);
                      const formData = new FormData();
                      formData.append("questionPaper", pdfExamForm.questionPaper);
                      formData.append("name", pdfExamForm.name);
                      formData.append("level", pdfExamForm.level);
                      formData.append("examType", "pdf");
                      formData.append("topicId", pdfExamForm.topicId);
                      if (pdfExamForm.year) formData.append("year", pdfExamForm.year);
                      if (pdfExamForm.duration) formData.append("duration", pdfExamForm.duration);
                      if (pdfExamForm.maxMarks) formData.append("maxMarks", pdfExamForm.maxMarks);
                      formData.append("extensionsAllowed", pdfExamForm.extensionsAllowed || "0");
                      formData.append("extensionInterval", pdfExamForm.extensionInterval || "0");
                      const res = await fetch(`${BASE_URL_ADMINS}/exams/pdf`, {
                        method: "POST",
                        headers: { Authorization: `Bearer ${accessToken}` },
                        body: formData,
                      });
                      const data = await res.json();
                      if (!data.success) throw new Error(data.message || "Failed to create PDF exam");
                      setExamMessage("PDF exam created successfully.");
                      loadExams();
                      setShowCreateModal(false);
                    } catch (err) {
                      setExamError(err.message || "Failed to create PDF exam.");
                    } finally {
                      setExamSaving(false);
                    }
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Name</label>
                    <input
                      type="text"
                      value={pdfExamForm.name}
                      onChange={(e) => setPdfExamForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="Exam name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Level</label>
                      <select
                        value={pdfExamForm.level}
                        onChange={(e) => {
                          const newLevel = e.target.value;
                          const currentTopic = topics.find((t) => t._id === pdfExamForm.topicId);
                          const topicStillValid = currentTopic && (currentTopic.level || "").toLowerCase() === newLevel;
                          setPdfExamForm((f) => ({
                            ...f,
                            level: newLevel,
                            topicId: topicStillValid ? f.topicId : "",
                          }));
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      >
                        <option value="intermediate">Intermediate</option>
                        <option value="final">Final</option>
                      </select>
                      <p className="text-[10px] text-gray-500 mt-0.5">PDF exams are for Intermediate or Final only.</p>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Year</label>
                      <input
                        type="number"
                        value={pdfExamForm.year}
                        onChange={(e) => setPdfExamForm((f) => ({ ...f, year: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        placeholder="YYYY"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Topic <span className="text-red-500">*</span></label>
                    <select
                      value={pdfExamForm.topicId}
                      onChange={(e) => setPdfExamForm((f) => ({ ...f, topicId: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      required
                    >
                      <option value="">Select topic</option>
                      {topics
                        .filter((t) => (t.level || "").toLowerCase() === (pdfExamForm.level || "").toLowerCase())
                        .map((t) => (
                          <option key={t._id} value={t._id}>{t.name}</option>
                        ))}
                    </select>
                    {topics.filter((t) => (t.level || "").toLowerCase() === (pdfExamForm.level || "").toLowerCase()).length === 0 && (
                      <p className="text-sm text-amber-600 mt-1">No topics yet. Create a topic under Topic Management first.</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Duration (min)</label>
                      <input
                        type="number"
                        min="1"
                        value={pdfExamForm.duration}
                        onChange={(e) => setPdfExamForm((f) => ({ ...f, duration: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Max Marks</label>
                      <input
                        type="number"
                        min="1"
                        value={pdfExamForm.maxMarks}
                        onChange={(e) => setPdfExamForm((f) => ({ ...f, maxMarks: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Extensions allowed</label>
                      <input
                        type="number"
                        min="0"
                        value={pdfExamForm.extensionsAllowed}
                        onChange={(e) => setPdfExamForm((f) => ({ ...f, extensionsAllowed: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Extension interval (min)</label>
                      <input
                        type="number"
                        min="0"
                        value={pdfExamForm.extensionInterval}
                        onChange={(e) => setPdfExamForm((f) => ({ ...f, extensionInterval: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Question paper (PDF)</label>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setPdfExamForm((f) => ({ ...f, questionPaper: e.target.files?.[0] || null }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  {examError && (
                    <div className="text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm">
                      {examError}
                    </div>
                  )}
                  <div className="flex justify-end gap-2 pt-2">
                    <button type="button" onClick={() => setShowCreateModal(false)} className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700">
                      Cancel
                    </button>
                    <button type="submit" disabled={examSaving} className="px-4 py-2 rounded-lg bg-[#137952] text-white disabled:opacity-60">
                      {examSaving ? "Uploading..." : "Create PDF exam"}
                    </button>
                  </div>
                </form>
              )}

              {examError && (
                <div className="mt-3 text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-[11px]">
                  {examError}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamManagement;


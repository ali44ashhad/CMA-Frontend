import React, { useEffect, useRef, useState } from "react";
import { BASE_URL, STUDENT_ENDPOINTS, authedJsonFetch } from "../../api";

// Live countdown: endTime is Unix ms
function useTimer(endTimeMs) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!endTimeMs || endTimeMs <= Date.now()) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [endTimeMs]);
  const remainingMs = Math.max(0, endTimeMs - now);
  const totalSec = Math.floor(remainingMs / 1000);
  const mins = Math.floor(totalSec / 60);
  const secs = totalSec % 60;
  return { remainingMs, formatted: `${mins}:${secs.toString().padStart(2, "0")}`, isExpired: remainingMs === 0 };
}

// Timer for when student is answering
function AttemptTimer({ startTime, durationMinutes, endTime, onExpired }) {
  const endTimeMs =
    endTime != null
      ? new Date(endTime).getTime()
      : startTime && durationMinutes != null
        ? new Date(startTime).getTime() + Number(durationMinutes) * 60 * 1000
        : null;
  const timer = useTimer(endTimeMs);
  const hasFiredExpired = useRef(false);
  useEffect(() => {
    if (timer.isExpired && onExpired && !hasFiredExpired.current) {
      hasFiredExpired.current = true;
      onExpired();
    }
  }, [timer.isExpired, onExpired]);
  if (!endTimeMs) return null;
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-100 border border-amber-200">
      <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span className="font-mono font-bold text-amber-900">
        {timer.isExpired ? "Time's up" : timer.formatted}
      </span>
      <span className="text-xs text-amber-700">{timer.isExpired ? "— Submitting..." : "left"}</span>
    </div>
  );
}

function InProgressCard({ exam, onContinue }) {
  const endTimeMs =
    exam?.attemptStartTime && exam?.attemptTimerDuration != null
      ? new Date(exam.attemptStartTime).getTime() +
        exam.attemptTimerDuration * 60 * 1000
      : null;
  const timer = useTimer(endTimeMs);
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{exam.name}</h4>
          <p className="text-xs text-gray-600 mt-0.5">
            {exam.examType?.toUpperCase()} · {exam.duration} min
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-1 rounded-lg bg-amber-100 text-amber-800 text-sm font-mono font-semibold">
              {timer.isExpired ? "Time's up" : `⏱ ${timer.formatted}`}
            </span>
            {timer.isExpired && (
              <span className="text-xs text-amber-700">Submit or forfeit below</span>
            )}
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onContinue(exam)}
        className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-sm whitespace-nowrap"
      >
        Continue exam
      </button>
    </div>
  );
}

// ---- Breadcrumb: Level > Package > Exams ----
function Breadcrumb({ levelName, packageName, onGoToLevels, onGoToPackages }) {
  const parts = [];
  if (levelName) parts.push({ label: levelName, onClick: packageName ? onGoToPackages : onGoToLevels });
  if (packageName) parts.push({ label: packageName, onClick: null });
  if (parts.length === 0) return null;
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
      <span className="text-gray-400">Available Exams</span>
      {parts.map((p, i) => (
        <span key={i} className="flex items-center gap-2">
          <span className="text-gray-400">/</span>
          {p.onClick ? (
            <button type="button" onClick={p.onClick} className="hover:text-[#137952] font-medium capitalize">
              {p.label}
            </button>
          ) : (
            <span className="font-medium text-gray-900">{p.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

// ---- Level list (3 cards: Foundation, Intermediate, Final) ----
function LevelList({ onSelectLevel }) {
  const levels = [
    { id: "foundation", label: "Foundation", desc: "Foundation level exams", gradient: "from-emerald-500 to-emerald-600" },
    { id: "intermediate", label: "Intermediate", desc: "Intermediate level packages & exams", gradient: "from-[#137952]/90 to-[#0d5c3d]" },
    { id: "final", label: "Final", desc: "Final level packages & exams", gradient: "from-purple-500 to-purple-600" },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {levels.map((lv) => (
        <button
          key={lv.id}
          type="button"
          onClick={() => onSelectLevel(lv.id)}
          className="bg-white rounded-2xl border-2 border-gray-200 p-8 text-left hover:border-[#137952]/40 hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-[#137952]/30 group"
        >
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${lv.gradient} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}>
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="font-bold text-gray-900 text-lg mb-1">{lv.label}</h3>
          <p className="text-sm text-gray-600">{lv.desc}</p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-[#137952] mt-3 group-hover:gap-2 transition-all">
            View packages
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </span>
        </button>
      ))}
    </div>
  );
}

// ---- Package list (card view) ----
function PackageList({ packages, onSelectPackage, onBack }) {
  if (!packages || packages.length === 0) {
    return (
      <div className="space-y-4">
        {onBack && (
          <button type="button" onClick={onBack} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#137952]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to levels
          </button>
        )}
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Packages in This Level</h3>
          <p className="text-sm text-gray-600">Purchase a package for this level, or check back later.</p>
        </div>
      </div>
    );
  }
  const getLevelGradient = (level) => {
    switch (String(level).toLowerCase()) {
      case "foundation": return "from-emerald-500 to-emerald-600";
      case "intermediate": return "from-[#137952]/90 to-[#0d5c3d]";
      case "final": return "from-purple-500 to-purple-600";
      default: return "from-gray-500 to-gray-600";
    }
  };
  return (
    <div className="space-y-4">
      {onBack && (
        <button type="button" onClick={onBack} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#137952]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back to levels
        </button>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {packages.map((pkg) => (
        <button
          key={pkg._id}
          type="button"
          onClick={() => onSelectPackage(pkg)}
          className="bg-white rounded-2xl border-2 border-gray-200 p-6 text-left hover:border-[#137952]/40 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#137952]/30"
        >
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getLevelGradient(pkg.level)} flex items-center justify-center mb-4`}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">{pkg.name}</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium capitalize">
              {pkg.level}
            </span>
            {pkg.examCount != null && (
              <span className="text-xs text-gray-500">{pkg.examCount} exam{pkg.examCount !== 1 ? "s" : ""}</span>
            )}
          </div>
          {pkg.description && (
            <p className="text-xs text-gray-500 mt-2 line-clamp-2">{pkg.description}</p>
          )}
        </button>
      ))}
      </div>
    </div>
  );
}

// ---- Exam list (cards) ----
function ExamList({ exams, onDetails, onLeaderboard, onStartExam, onBack }) {
  const availableToStart = exams.filter(
    (e) => e.attemptStatus !== "submitted" && e.attemptStatus !== "evaluated"
  );
  if (exams.length === 0) {
    return (
      <div className="space-y-4">
        {onBack && (
          <button type="button" onClick={onBack} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#137952]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to packages
          </button>
        )}
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Exams in This Package</h3>
          <p className="text-sm text-gray-600">There are no tests in this package yet.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#137952]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to packages
        </button>
      )}
      <div className="space-y-3">
        {availableToStart.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
            <p className="text-gray-600">No exams left to start in this package. Submitted exams appear in &quot;Your submitted exams&quot; below.</p>
          </div>
        ) : (
          availableToStart.map((exam) => (
            <div
              key={exam._id}
              className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#137952]/80 to-[#137952] rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{exam.name}</h3>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="inline-flex items-center px-2 py-0.5 bg-[#137952]/10 text-[#137952] text-xs font-medium rounded-full border border-[#137952]/30 capitalize">
                          {exam.level}
                        </span>
                        <span className="text-xs text-gray-500">
                          ⏱️ {exam.durationMinutes || exam.duration} min · {String(exam.examType || "").toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                    onClick={() => onDetails(exam._id)}
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 text-sm bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                    onClick={() => onLeaderboard(exam._id)}
                  >
                    Leaderboard
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 font-medium rounded-lg transition-all shadow-sm ${
                      exam.hasAccess
                        ? "bg-gradient-to-r from-[#137952] to-[#0d5c3d] text-white hover:from-[#0d5c3d] hover:to-[#0a4a2e]"
                        : "bg-gray-100 text-gray-500 border border-gray-200 cursor-not-allowed"
                    }`}
                    disabled={!exam.hasAccess}
                    onClick={() => exam.hasAccess && onStartExam(exam._id)}
                  >
                    {exam.hasAccess ? "Start Exam" : "Locked"}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const StudentExams = ({ accessToken, resetTrigger = 0 }) => {
  const [packages, setPackages] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState("");
  const [year, setYear] = useState("");

  const [view, setView] = useState("levels"); // 'levels' | 'packages' | 'exams'
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const [examDetails, setExamDetails] = useState(null);
  const [leaderboard, setLeaderboard] = useState(null);
  const [marksByExamId, setMarksByExamId] = useState({});

  const [attemptIdInput, setAttemptIdInput] = useState("");
  const [attemptDetails, setAttemptDetails] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [mcqSubmitted, setMcqSubmitted] = useState(false);
  const [pdfSubmittedLocal, setPdfSubmittedLocal] = useState(false);
  const pdfFileInputRef = useRef(null);

  const [examError, setExamError] = useState("");
  const [examMessage, setExamMessage] = useState("");

  const authedFetch = (path, options = {}) =>
    authedJsonFetch(path, accessToken, options);

  const loadData = async () => {
    if (!accessToken) return;
    try {
      setLoading(true);
      setExamError("");
      setExamMessage("");
      const params = new URLSearchParams();
      if (level) params.set("level", level);
      if (year) params.set("year", year);
      const qs = params.toString();

      const [pkgRes, purchasesRes, examsRes] = await Promise.all([
        fetch(`${BASE_URL}${STUDENT_ENDPOINTS.PACKAGES}${qs ? `?${qs}` : ""}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        }).then((r) => r.json()),
        authedFetch(STUDENT_ENDPOINTS.PURCHASES).then((d) => d || {}).catch(() => ({ purchases: [] })),
        authedFetch(`${STUDENT_ENDPOINTS.EXAMS}${qs ? `?${qs}` : ""}`).then((d) => d || {}).catch(() => ({ exams: [] })),
      ]);

      const pkgList = pkgRes?.data?.packages ?? pkgRes?.packages ?? [];
      setPackages(Array.isArray(pkgList) ? pkgList : []);
      const purchList = purchasesRes?.purchases ?? (Array.isArray(purchasesRes) ? purchasesRes : []);
      setPurchases(Array.isArray(purchList) ? purchList : []);
      const examList = examsRes?.exams ?? examsRes?.items ?? (Array.isArray(examsRes) ? examsRes : []);
      setExams(Array.isArray(examList) ? examList : []);
    } catch (e) {
      console.error("Student exams load error:", e);
      setExamError(e.message || "Failed to load data");
      setExams([]);
      setPackages([]);
      setPurchases([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  useEffect(() => {
    if (resetTrigger > 0) {
      setView("levels");
      setSelectedLevel(null);
      setSelectedPackage(null);
    }
  }, [resetTrigger]);

  // Fetch leaderboard myMarks for each submitted/evaluated exam so table shows same as leaderboard
  useEffect(() => {
    if (!accessToken || !exams.length) return;
    const submitted = exams.filter((e) => e.attemptStatus === "submitted" || e.attemptStatus === "evaluated");
    if (submitted.length === 0) return;
    let cancelled = false;
    (async () => {
      const next = {};
      await Promise.all(
        submitted.map(async (exam) => {
          try {
            const data = await authedFetch(
              `${STUDENT_ENDPOINTS.LEADERBOARD(exam._id)}?page=1&limit=1`
            );
            const payload = data?.data ?? data ?? {};
            if (!cancelled && payload.myMarks != null) next[exam._id] = payload.myMarks;
          } catch (_) {
            // ignore per-exam errors
          }
        })
      );
      if (!cancelled) setMarksByExamId((prev) => ({ ...prev, ...next }));
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, exams]);

  const purchasedPackageIds = new Set((purchases || []).map((p) => String(p.packageId?._id ?? p.packageId)));
  const accessibleExamPackageIds = new Set();
  (exams || []).forEach((e) => {
    if (!e.hasAccess) return;
    (e.topicPackageIds || []).forEach((pid) => accessibleExamPackageIds.add(pid));
  });
  const accessiblePackages = (packages || []).filter(
    (p) => accessibleExamPackageIds.has(String(p._id)) || purchasedPackageIds.has(String(p._id)) || String(p.level).toLowerCase() === "foundation"
  );

  const topicsForSelectedPackage = (() => {
    if (!selectedPackage || !exams.length) return [];
    const pkgId = String(selectedPackage._id);
    const topicMap = new Map();
    exams.forEach((e) => {
      if (!(e.topicPackageIds || []).includes(pkgId)) return;
      const tid = String(e.topicId);
      if (!topicMap.has(tid)) {
        topicMap.set(tid, { _id: e.topicId, name: e.topicName || "Topic", examCount: 0 });
      }
      const t = topicMap.get(tid);
      t.examCount += 1;
    });
    return Array.from(topicMap.values());
  })();

  const packagesForSelectedLevel = (() => {
    if (!selectedLevel) return [];
    return (accessiblePackages || []).filter(
      (p) => String(p.level).toLowerCase() === String(selectedLevel).toLowerCase()
    );
  })();

  const examsForSelectedPackage = (() => {
    if (!selectedPackage || !exams.length || !topicsForSelectedPackage.length) return [];
    const topicIds = new Set(topicsForSelectedPackage.map((t) => String(t._id)));
    return exams.filter((e) => topicIds.has(String(e.topicId)));
  })();

  const handleSelectLevel = (levelId) => {
    setSelectedLevel(levelId);
    setSelectedPackage(null);
    setView("packages");
  };

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
    setView("exams");
  };

  const handleBackToLevels = () => {
    setSelectedLevel(null);
    setSelectedPackage(null);
    setView("levels");
  };

  const handleBackToPackages = () => {
    setSelectedPackage(null);
    setView("packages");
  };

  const handleExamDetails = async (examId) => {
    try {
      setExamError("");
      const data = await authedFetch(STUDENT_ENDPOINTS.EXAM_DETAILS(examId));
      const details = data?.data ?? data;
      setExamDetails(details);
    } catch (e) {
      setExamError(e.message || "Failed to load exam details");
    }
  };

  const handleLeaderboard = async (examId) => {
    try {
      setExamError("");
      const data = await authedFetch(
        `${STUDENT_ENDPOINTS.LEADERBOARD(examId)}?page=1&limit=10`
      );
      const payload = data?.data ?? data;
      setLeaderboard(payload);
      if (payload && payload.myMarks != null) {
        setMarksByExamId((prev) => ({ ...prev, [examId]: payload.myMarks }));
      }
    } catch (e) {
      setExamError(e.message || "Failed to load leaderboard");
    }
  };

  const handleStartExam = async (examId) => {
    try {
      setExamError("");
      setExamMessage("");
      const data = await authedFetch(STUDENT_ENDPOINTS.START_EXAM(examId), { method: "POST" });
      setAttemptDetails(data);
      setAttemptIdInput(data?.attemptId ?? data?.attempt?.attemptId ?? "");
      setExamMessage(`Exam started! Your attempt ID: ${data?.attemptId ?? data?.attempt?.attemptId ?? ""}`);
    } catch (e) {
      setExamError(e.message || "Failed to start exam");
    }
  };

  const handleLoadAttempt = async (id) => {
    const attemptId = id ?? attemptIdInput;
    if (!attemptId) return;
    try {
      setExamError("");
      const data = await authedFetch(STUDENT_ENDPOINTS.EXAM_ATTEMPT(String(attemptId)));
      setAttemptIdInput(String(attemptId));
      setAttemptDetails(data);
      setCurrentQuestionIndex(0);
      setSelectedAnswers(data?.answers && typeof data.answers === "object" ? { ...data.answers } : {});
      setMcqSubmitted(data?.attemptStatus === "submitted" || data?.attemptStatus === "evaluated");
      setPdfSubmittedLocal(data?.status === "submitted" || !!data?.submittedPdfUrl);
    } catch (e) {
      setExamError(e.message || "Failed to load attempt");
    }
  };

  const handleContinueAttempt = (exam) => {
    if (exam?.attemptId) handleLoadAttempt(exam.attemptId);
  };

  const handleSaveAnswer = async (questionId, selectedOption) => {
    if (!attemptIdInput) {
      setExamError("Attempt ID not set.");
      return;
    }
    const qId = typeof questionId === "string" ? questionId : questionId?.toString?.();
    if (qId) setSelectedAnswers((prev) => ({ ...prev, [qId]: selectedOption }));
    try {
      setExamError("");
      await authedFetch(STUDENT_ENDPOINTS.SUBMIT_ANSWER(attemptIdInput), {
        method: "PUT",
        body: JSON.stringify({ questionId: qId || questionId, selectedOption }),
      });
      setExamMessage("✓ Answer saved.");
    } catch (e) {
      setExamError(e.message || "Failed to save answer");
    }
  };

  const clearAttemptFromView = () => {
    setAttemptDetails(null);
    setAttemptIdInput("");
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setMcqSubmitted(false);
    setPdfSubmittedLocal(false);
  };

  const handleSubmitMcq = async (options = {}) => {
    const { autoSubmit = false } = options;
    if (!attemptIdInput || mcqSubmitted) return;
    if (!autoSubmit && !window.confirm("Are you sure you want to submit? You cannot change answers after submission.")) return;
    try {
      setExamError("");
      const data = await authedFetch(STUDENT_ENDPOINTS.SUBMIT_MCQ(attemptIdInput), { method: "POST" });
      setMcqSubmitted(true);
      setExamMessage(`🎯 Submitted! Score: ${data.marks}/${data.maxMarks} | Rank: ${data.rank}`);
      await loadData();
      clearAttemptFromView();
    } catch (e) {
      setExamError(e.message || "Failed to submit MCQ exam");
    }
  };

  const handleUploadPdf = async (file) => {
    if (!attemptIdInput || !file) return;
    try {
      setExamError("");
      const formData = new FormData();
      formData.append("answerSheet", file);
      const res = await fetch(
        `${BASE_URL}${STUDENT_ENDPOINTS.UPLOAD_PDF(attemptIdInput)}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${accessToken}` },
          body: formData,
        }
      );
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Upload failed");
      const payload = data.data || data;
      setPdfSubmittedLocal(true);
      setExamMessage("📄 Answer sheet submitted successfully. Your exam has been submitted.");
      await loadData();
      clearAttemptFromView();
    } catch (e) {
      setExamError(e.message || "Failed to upload PDF answer");
    }
  };

  const handleExtendTime = async () => {
    if (!attemptIdInput) return;
    try {
      setExamError("");
      const data = await authedFetch(STUDENT_ENDPOINTS.EXTEND_TIME(attemptIdInput), { method: "POST" });
      if (data?.newEndTime) {
        setAttemptDetails((prev) => (prev ? { ...prev, endTime: data.newEndTime } : prev));
      }
      setExamMessage(`⏰ Time extended. New deadline: ${data?.newEndTime ? new Date(data.newEndTime).toLocaleString() : ""}`);
    } catch (e) {
      setExamError(e.message || "Failed to extend time");
    }
  };

  const handleForfeit = async () => {
    if (!attemptIdInput) return;
    if (!window.confirm("Are you sure you want to forfeit? This cannot be undone.")) return;
    try {
      setExamError("");
      await authedFetch(STUDENT_ENDPOINTS.FORFEIT_EXAM(attemptIdInput), { method: "DELETE" });
      setExamMessage("⚠️ Exam forfeited.");
      setAttemptDetails(null);
      setAttemptIdInput("");
    } catch (e) {
      setExamError(e.message || "Failed to forfeit exam");
    }
  };

  const isPdfExam = (attemptDetails?.examType || "").toLowerCase() === "pdf";
  const pdfSubmitted = isPdfExam && (pdfSubmittedLocal || attemptDetails?.status === "submitted" || !!attemptDetails?.submittedPdfUrl);

  // Compute attempt end time (for expiry check): endTime from server, or startTime + duration
  const attemptEndTimeMs =
    attemptDetails?.endTime != null
      ? new Date(attemptDetails.endTime).getTime()
      : attemptDetails?.startTime != null &&
          (attemptDetails?.duration != null || attemptDetails?.timerDuration != null)
        ? new Date(attemptDetails.startTime).getTime() +
          Number(attemptDetails.duration ?? attemptDetails.timerDuration ?? 0) * 60 * 1000
        : null;
  const { isExpired: timeExpired } = useTimer(attemptEndTimeMs ?? 0);
  const attemptTimeExpired = attemptEndTimeMs != null && timeExpired;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Available Exams</h2>
          <p className="text-sm text-gray-600 mb-1">Choose a level → package → test</p>
          
        </div>
        <div className="flex flex-wrap items-end gap-2 bg-white p-3 rounded-xl border border-gray-200">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#137952]/20 focus:border-[#137952]"
            >
              <option value="">All Levels</option>
              <option value="foundation">Foundation</option>
              <option value="intermediate">Intermediate</option>
              <option value="final">Final</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Year</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="YYYY"
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-24 focus:outline-none focus:ring-2 focus:ring-[#137952]/20 focus:border-[#137952]"
            />
          </div>
          <button
            onClick={loadData}
            className="px-4 py-2 bg-gradient-to-r from-[#137952] to-[#0d5c3d] text-white font-medium rounded-lg hover:from-[#0d5c3d] hover:to-[#0a4a2e] transition-all shadow-sm text-sm"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {examError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-sm text-red-700">{examError}</p>
        </div>
      )}
      {examMessage && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <p className="text-sm text-emerald-700">{examMessage}</p>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-10 h-10 border-4 border-[#137952]/30 border-t-[#137952] rounded-full animate-spin" />
          <p className="text-sm text-gray-600 mt-3">Loading...</p>
        </div>
      ) : (
        <>
          {view === "levels" && (
            <LevelList onSelectLevel={handleSelectLevel} />
          )}
          {view === "packages" && (
            <PackageList
              packages={packagesForSelectedLevel}
              onSelectPackage={handleSelectPackage}
              onBack={handleBackToLevels}
            />
          )}
          {view === "exams" && (
            <ExamList
              exams={examsForSelectedPackage}
              onDetails={handleExamDetails}
              onLeaderboard={handleLeaderboard}
              onStartExam={handleStartExam}
              onBack={handleBackToPackages}
            />
          )}
        </>
      )}

      {/* Modals: Exam Details, Leaderboard */}
      {examDetails && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Exam Details</h3>
              <button onClick={() => setExamDetails(null)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="px-5 py-4 space-y-4 text-sm">
              <h4 className="text-base font-semibold text-gray-900">{examDetails.name}</h4>
              <p className="text-xs text-gray-500">Level: <span className="capitalize">{examDetails.level}</span>{examDetails.year && ` · Year: ${examDetails.year}`}</p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-3">
                  <div className="text-gray-500 mb-1">Exam Type</div>
                  <div className="font-semibold text-gray-900 uppercase">{examDetails.examType}</div>
                </div>
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-3">
                  <div className="text-gray-500 mb-1">Duration</div>
                  <div className="font-semibold text-gray-900">{examDetails.duration} minutes</div>
                </div>
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-3">
                  <div className="text-gray-500 mb-1">Max Marks</div>
                  <div className="font-semibold text-gray-900">{examDetails.maxMarks}</div>
                </div>
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-3">
                  <div className="text-gray-500 mb-1">Extensions</div>
                  <div className="font-semibold text-gray-900">{examDetails.extensionsAllowed ?? 0} × {examDetails.extensionInterval ?? 0} min</div>
                </div>
              </div>
              {examDetails.examType === "mcq" && (
                <div className="bg-[#137952]/10 rounded-xl border border-[#137952]/20 p-3 text-xs">
                  <div className="font-semibold text-[#0d5c3d] mb-1">MCQ Pattern</div>
                  <p className="text-[#137952]">Total Questions: <span className="font-semibold">{examDetails.totalQuestions}</span>. Select the correct option and submit before time ends.</p>
                </div>
              )}
              {examDetails.examType === "pdf" && (
                <div className="bg-amber-50 rounded-xl border border-amber-100 p-3 text-xs">
                  <div className="font-semibold text-amber-800 mb-1">PDF Exam</div>
                  <p className="text-amber-800">Question paper as PDF. Write answers, scan and upload the answer sheet PDF before time ends.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {leaderboard && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Leaderboard</h3>
                <p className="text-xs text-gray-500">{leaderboard.examName}{leaderboard.year && ` · ${leaderboard.year}`}</p>
              </div>
              <button onClick={() => setLeaderboard(null)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="px-5 py-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-[#137952]/10 rounded-xl border border-[#137952]/20 p-3 text-center">
                  <div className="text-xs text-[#137952] font-medium mb-0.5">Your Rank</div>
                  <div className="text-lg font-bold text-[#0d5c3d]">{leaderboard.myRank != null ? `#${leaderboard.myRank}` : "—"}</div>
                </div>
                <div className="bg-emerald-50 rounded-xl border border-emerald-100 p-3 text-center">
                  <div className="text-xs text-emerald-600 font-medium mb-0.5">Your Marks</div>
                  <div className="text-lg font-bold text-emerald-800">{leaderboard.myMarks != null ? leaderboard.myMarks : "—"}</div>
                </div>
              </div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Rankings</h4>
              {!(leaderboard.rankings && leaderboard.rankings.length) ? (
                <div className="text-center py-8 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-sm text-gray-600">No submissions yet.</p>
                </div>
              ) : (
                <div className="rounded-xl border border-gray-200">
                  <div className="w-full overflow-x-auto">
                  <table className="w-full text-xs min-w-[360px]">
                    <thead className="bg-gray-50 text-gray-600">
                      <tr>
                        <th className="px-3 py-2 text-left">Rank</th>
                        <th className="px-3 py-2 text-left">Student</th>
                        <th className="px-3 py-2 text-right">Marks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {leaderboard.rankings.map((row, idx) => (
                        <tr key={row._id || idx} className="hover:bg-gray-50/70">
                          <td className="px-3 py-2 font-semibold text-gray-900">#{row.rank ?? idx + 1}</td>
                          <td className="px-3 py-2 text-gray-700">{row.studentName ?? row.name ?? "—"}</td>
                          <td className="px-3 py-2 text-right font-medium text-gray-900">{row.marks ?? "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Exam Attempt Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mt-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Exam Attempt</h3>
        </div>

        <div className="space-y-4">
          {exams.filter((e) => (e.attemptStatus === "in_progress" || e.attemptStatus === "in-progress") && e.attemptId && !(mcqSubmitted && String(e.attemptId) === String(attemptIdInput))).length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700">Your exam in progress</h4>
              {exams
                .filter((e) => (e.attemptStatus === "in_progress" || e.attemptStatus === "in-progress") && e.attemptId && !(mcqSubmitted && String(e.attemptId) === String(attemptIdInput)))
                .map((exam) => (
                  <InProgressCard key={exam.attemptId} exam={exam} onContinue={handleContinueAttempt} />
                ))}
            </div>
          )}

          {attemptDetails && attemptDetails.questions && attemptDetails.questions.length > 0 && (() => {
            const questions = attemptDetails.questions;
            const idx = Math.max(0, Math.min(currentQuestionIndex, questions.length - 1));
            const q = questions[idx];
            const qIdStr = q._id?.toString?.() ?? q._id;
            const selectedOption = selectedAnswers[qIdStr];
            return (
              <div className="mt-6 space-y-6">
                <div className="flex justify-center sm:justify-start">
                  {mcqSubmitted ? (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-100 border border-emerald-200">
                      <svg className="w-5 h-5 text-emerald-700" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      <span className="font-semibold text-emerald-800">Exam submitted</span>
                    </div>
                  ) : (
                    <AttemptTimer startTime={attemptDetails.startTime} durationMinutes={attemptDetails.duration} endTime={attemptDetails.endTime} onExpired={() => handleSubmitMcq({ autoSubmit: true })} />
                  )}
                </div>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h4 className="font-semibold text-gray-900">Question {idx + 1} of {questions.length}</h4>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => setCurrentQuestionIndex((i) => Math.max(0, i - 1))} disabled={idx === 0} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">← Back</button>
                    <button type="button" onClick={() => setCurrentQuestionIndex((i) => Math.min(questions.length - 1, i + 1))} disabled={idx === questions.length - 1} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">Next →</button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {questions.map((ques, i) => {
                    const idStr = ques._id?.toString?.() ?? ques._id;
                    const answered = selectedAnswers[idStr] !== undefined && selectedAnswers[idStr] !== null;
                    const isCurrent = i === idx;
                    return (
                      <button key={idStr} type="button" onClick={() => setCurrentQuestionIndex(i)}
                        className={`w-9 h-9 rounded-lg font-semibold text-sm flex items-center justify-center transition-all ${isCurrent ? "ring-2 ring-[#137952] bg-[#137952]/20 text-[#0d5c3d]" : answered ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                        title={answered ? "Answered" : `Question ${i + 1}`}>
                        {answered ? <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> : i + 1}
                      </button>
                    );
                  })}
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="w-8 h-8 bg-[#137952]/20 text-[#137952] rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">{idx + 1}</span>
                    <p className="text-sm text-gray-900 flex-1 font-medium">{q.questionText}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {q.options.map((opt, i) => {
                      const isSelected = selectedOption === i;
                      return (
                        <button key={i} type="button" onClick={() => !attemptTimeExpired && handleSaveAnswer(q._id, i)} disabled={attemptTimeExpired}
                          className={`flex items-center gap-2 p-3 text-left rounded-lg border-2 transition-all ${attemptTimeExpired ? "opacity-60 cursor-not-allowed border-gray-200" : isSelected ? "border-emerald-500 bg-emerald-50 text-emerald-900" : "border-gray-200 hover:bg-[#137952]/10 hover:border-[#137952]/50"}`}>
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${isSelected ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-700"}`}>
                            {isSelected ? <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> : String.fromCharCode(65 + i)}
                          </span>
                          <span className="text-sm flex-1">{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="flex justify-center pt-2">
                  <button type="button" onClick={handleSubmitMcq} disabled={mcqSubmitted || attemptTimeExpired}
                    className={`px-8 py-3 font-semibold rounded-xl transition-all shadow-lg flex items-center gap-2 ${mcqSubmitted || attemptTimeExpired ? "bg-gray-400 text-white cursor-not-allowed" : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700"}`}>
                    {mcqSubmitted ? <><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> Submitted</> : attemptTimeExpired ? <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Time expired</> : <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Submit MCQ Exam</>}
                  </button>
                </div>
              </div>
            );
          })()}

          {attemptDetails && attemptDetails.questionPaperUrl && !(attemptDetails.questions && attemptDetails.questions.length > 0) && (
            <div className="mt-6 space-y-6">
              <div className="flex justify-center sm:justify-start">
                {pdfSubmitted ? (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-100 border border-emerald-200">
                    <svg className="w-5 h-5 text-emerald-700" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span className="font-semibold text-emerald-800">Exam submitted</span>
                  </div>
                ) : attemptTimeExpired ? (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-100 border border-red-200">
                    <svg className="w-5 h-5 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="font-semibold text-red-800">Time expired</span>
                  </div>
                ) : (
                  <AttemptTimer startTime={attemptDetails.startTime} durationMinutes={attemptDetails.duration} endTime={attemptDetails.endTime} />
                )}
              </div>
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Question paper (PDF)</h4>
                <p className="text-sm text-gray-600 mb-3">View the question paper below. Write answers on paper, then scan and upload the answer sheet PDF before time ends.</p>
                <a href={attemptDetails.questionPaperUrl.startsWith("http") ? attemptDetails.questionPaperUrl : `${typeof window !== "undefined" ? window.location.origin : ""}/api/v1${attemptDetails.questionPaperUrl.startsWith("/") ? "" : "/"}${attemptDetails.questionPaperUrl}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#137952] text-white font-medium hover:bg-[#0d5c3d] mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Open question paper (PDF)
                </a>
                <div className="rounded-lg border border-gray-200 bg-white overflow-hidden" style={{ minHeight: "480px" }}>
                  <iframe title="Question paper PDF" src={attemptDetails.questionPaperUrl.startsWith("http") ? attemptDetails.questionPaperUrl : `${typeof window !== "undefined" ? window.location.origin : ""}/api/v1${attemptDetails.questionPaperUrl.startsWith("/") ? "" : "/"}${attemptDetails.questionPaperUrl}`} className="w-full h-[500px]" />
                </div>
                {/* Submit PDF exam: upload = submit; hide when time expired */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Submit your exam</h4>
                  {pdfSubmitted ? (
                    <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-100 border border-emerald-200 text-emerald-800 font-medium">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      Answer sheet submitted
                    </div>
                  ) : attemptTimeExpired ? (
                    <p className="text-sm text-red-600 font-medium">Time expired. You can no longer submit the answer sheet.</p>
                  ) : (
                    <>
                      <p className="text-sm text-gray-600 mb-3">Upload your answer sheet (PDF) to submit the exam. This will finalize your submission.</p>
                      <input
                        ref={pdfFileInputRef}
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => e.target.files?.[0] && handleUploadPdf(e.target.files[0])}
                        className="hidden"
                        id="pdf-upload"
                      />
                      <button
                        type="button"
                        onClick={() => pdfFileInputRef.current?.click()}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#137952] to-[#0d5c3d] text-white font-semibold rounded-xl hover:from-[#0d5c3d] hover:to-[#0a4a2e] transition-all shadow-lg"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Upload answer sheet & submit exam
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {attemptIdInput && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                {isPdfExam && !pdfSubmitted && !attemptTimeExpired && (
                  <div className="flex items-center gap-3 flex-wrap">
                    <label htmlFor="pdf-upload" className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 cursor-pointer">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                      Choose PDF
                    </label>
                  </div>
                )}
                {!attemptTimeExpired && (
                  <div className="flex gap-2">
                    <button onClick={handleExtendTime} className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all shadow-sm flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Extend Time
                    </button>
                    <button onClick={handleForfeit} className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-sm flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      Forfeit Exam
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {exams.filter((e) => e.attemptStatus === "submitted" || e.attemptStatus === "evaluated").length > 0 && (
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700">Your submitted exams</h4>
              <div className="rounded-xl border border-gray-200">
                <div className="w-full overflow-x-auto">
                <table className="w-full text-sm min-w-[420px]">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="px-4 py-2.5 text-left font-medium">Exam</th>
                      <th className="px-4 py-2.5 text-left font-medium">Level</th>
                      <th className="px-4 py-2.5 text-left font-medium">Status</th>
                      <th className="px-4 py-2.5 text-right font-medium">Marks</th>
                      <th className="px-4 py-2.5 text-left font-medium">Remarks</th>
                      <th className="px-4 py-2.5 text-right font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {exams.filter((e) => e.attemptStatus === "submitted" || e.attemptStatus === "evaluated").map((exam) => (
                      <tr key={exam._id} className="hover:bg-gray-50/70">
                        <td className="px-4 py-2.5 font-medium text-gray-900">{exam.name}</td>
                        <td className="px-4 py-2.5 text-gray-600 capitalize">{exam.level}</td>
                        <td className="px-4 py-2.5">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${exam.attemptStatus === "evaluated" ? "bg-emerald-100 text-emerald-800" : "bg-[#137952]/20 text-[#0d5c3d]"}`}>
                            {exam.attemptStatus === "evaluated" ? "Evaluated" : "Submitted"}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-right font-medium text-gray-900">
                          {marksByExamId[exam._id] != null
                            ? `${marksByExamId[exam._id]} / ${exam.maxMarks ?? "—"}`
                            : "—"}
                        </td>
                        <td className="px-4 py-2.5 text-gray-600 max-w-[200px]">
                          {exam.evaluatorRemarks ? (
                            <span title={exam.evaluatorRemarks} className="line-clamp-2 text-xs">
                              {exam.evaluatorRemarks}
                            </span>
                          ) : (
                            <span className="text-gray-400 text-xs">—</span>
                          )}
                        </td>
                        <td className="px-4 py-2.5 text-right">
                          <div className="flex items-center justify-end gap-2 flex-wrap">
                            {exam.attemptStatus === "evaluated" && exam.checkedPdfUrl && (
                              <a
                                href={exam.checkedPdfUrl.startsWith("http") ? exam.checkedPdfUrl : `${BASE_URL.replace(/\/api\/v1$/, "")}${exam.checkedPdfUrl.startsWith("/") ? "" : "/"}${exam.checkedPdfUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-[#137952]/10 text-[#137952] hover:bg-[#137952]/20 font-medium text-xs"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                View PDF
                              </a>
                            )}
                            <button type="button" onClick={() => handleLeaderboard(exam._id)} className="text-[#137952] hover:text-[#0d5c3d] font-medium text-xs">Leaderboard</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentExams;

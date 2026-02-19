import React, { useEffect, useState } from "react";
import { BASE_URL_ADMINS, authedJsonFetch } from "../../api";

const UserManagement = ({ accessToken }) => {
  const [users, setUsers] = useState([]);
  const [userFilter, setUserFilter] = useState("all"); // all | students | evaluators
  const [loading, setLoading] = useState(false);
  const [showOnboardModal, setShowOnboardModal] = useState(false);
  const [evaluatorForm, setEvaluatorForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [evaluatorSaving, setEvaluatorSaving] = useState(false);
  const [evaluatorError, setEvaluatorError] = useState("");
  const [evaluatorSuccess, setEvaluatorSuccess] = useState("");

  const authedFetch = (path, options = {}) =>
    authedJsonFetch(`${BASE_URL_ADMINS}${path}`, accessToken, options);

  useEffect(() => {
    if (!accessToken) return;
    const load = async () => {
      try {
        setLoading(true);
        let query = "";
        if (userFilter === "students") query = "?role=student";
        else if (userFilter === "evaluators") query = "?role=evaluator";
        const data = await authedFetch(`/users${query}`);
        const list = data.users || data.items || data;
        setUsers(list || []);
      } catch (e) {
        console.error("User management error:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [userFilter, accessToken]);

  const totalUsers = users.length;
  const totalStudents = users.filter((u) => u.role === "student").length;
  const totalEvaluators = users.filter((u) => u.role === "evaluator").length;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            User Management
          </h2>
          <p className="text-xs text-gray-500">
            View all users, filter by role and onboard new evaluators.
          </p>
        </div>
        <div className="inline-flex rounded-full border border-gray-200 bg-white shadow-sm overflow-hidden text-xs">
          <button
            onClick={() => setUserFilter("all")}
            className={`px-3 py-1.5 ${
              userFilter === "all" ? "bg-[#137952] text-white" : "bg-white"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setUserFilter("students")}
            className={`px-3 py-1.5 border-l border-gray-200 ${
              userFilter === "students" ? "bg-[#137952] text-white" : "bg-white"
            }`}
          >
            Students
          </button>
          <button
            onClick={() => setUserFilter("evaluators")}
            className={`px-3 py-1.5 border-l border-gray-200 ${
              userFilter === "evaluators"
                ? "bg-[#137952] text-white"
                : "bg-white"
            }`}
          >
            Evaluators
          </button>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3 text-[11px]">
        <div className="rounded-2xl border border-gray-200 bg-white px-3 py-3 shadow-sm">
          <div className="text-[10px] text-gray-500 mb-1">Total Users</div>
          <div className="text-lg font-semibold text-gray-900">
            {totalUsers}
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white px-3 py-3 shadow-sm">
          <div className="text-[10px] text-gray-500 mb-1">Students</div>
          <div className="text-lg font-semibold text-[#137952]">
            {totalStudents}
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white px-3 py-3 shadow-sm">
          <div className="text-[10px] text-gray-500 mb-1">Evaluators</div>
          <div className="text-lg font-semibold text-emerald-600">
            {totalEvaluators}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-xs text-gray-500">Loading users...</div>
      ) : null}

      <div className="flex flex-col gap-4 items-stretch">
        {/* Users table */}
        <div>
          <h3 className="text-sm font-semibold mb-2 text-gray-900">
            {userFilter === "all"
              ? "All Users"
              : userFilter === "students"
              ? "Students"
              : "Evaluators"}
          </h3>
          {users.length === 0 ? (
            <p className="text-xs text-gray-500">
              No users found for the selected filter.
            </p>
          ) : (
            <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-3 py-2 border-b text-left">Name</th>
                  <th className="px-3 py-2 border-b text-left">Email</th>
                  <th className="px-3 py-2 border-b text-left">Role</th>
                  <th className="px-3 py-2 border-b w-24 text-center">
                    Actions
                  </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-gray-50/60">
                      <td className="px-3 py-2">
                        <div className="font-medium text-gray-900">
                          {u.name}
                        </div>
                      </td>
                      <td className="px-3 py-2 text-gray-700 break-all">
                        {u.email}
                      </td>
                      <td className="px-3 py-2 capitalize text-gray-700">
                        {u.role}
                      </td>
                      <td className="px-3 py-2 text-center">
                        <button
                          className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-red-50 text-[11px] font-medium text-red-600 hover:bg-red-100"
                          onClick={async () => {
                            if (
                              !window.confirm(
                                "Are you sure you want to delete this user?"
                              )
                            ) {
                              return;
                            }
                            try {
                              await authedFetch(`/users/${u._id}`, {
                                method: "DELETE",
                              });
                              setUsers((prev) =>
                                prev.filter((x) => x._id !== u._id)
                              );
                            } catch (err) {
                              console.error("Delete user failed", err);
                            }
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Onboard evaluator trigger button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              setEvaluatorError("");
              setEvaluatorSuccess("");
              setShowOnboardModal(true);
            }}
            className="inline-flex items-center px-4 py-2 rounded-xl bg-[#137952] text-white text-xs font-medium shadow-sm hover:bg-[#0d5c3d] transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Onboard Evaluator
          </button>
        </div>
      </div>

      {/* Onboard Evaluator Modal */}
      {showOnboardModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 text-xs relative">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Onboard Evaluator
                </h3>
                <p className="text-[11px] text-gray-500">
                  Create a new evaluator account that can check student copies.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowOnboardModal(false)}
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

            {evaluatorError && (
              <div className="text-[11px] text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2 mb-2">
                {evaluatorError}
              </div>
            )}
            {evaluatorSuccess && (
              <div className="text-[11px] text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2 mb-2">
                {evaluatorSuccess}
              </div>
            )}

            <form
              className="space-y-2"
              onSubmit={async (e) => {
                e.preventDefault();
                setEvaluatorError("");
                setEvaluatorSuccess("");
                const { name, email, phone, password } = evaluatorForm;
                if (!name || !email || !phone || !password) {
                  setEvaluatorError("Please fill all fields.");
                  return;
                }
                if (phone.length !== 10) {
                  setEvaluatorError("Phone must be 10 digits.");
                  return;
                }
                if (password.length < 8) {
                  setEvaluatorError(
                    "Password must be at least 8 characters."
                  );
                  return;
                }
                try {
                  setEvaluatorSaving(true);
                  const created = await authedFetch(`/evaluators`, {
                    method: "POST",
                    body: JSON.stringify(evaluatorForm),
                  });
                  if (userFilter === "all" || userFilter === "evaluators") {
                    setUsers((prev) => [...prev, created]);
                  }
                  setEvaluatorSuccess("Evaluator onboarded successfully.");
                  setEvaluatorForm({
                    name: "",
                    email: "",
                    phone: "",
                    password: "",
                  });
                } catch (err) {
                  setEvaluatorError(
                    err.message || "Failed to onboard evaluator."
                  );
                } finally {
                  setEvaluatorSaving(false);
                }
              }}
            >
              <div>
                <label className="block mb-1 text-gray-600">Name</label>
                <input
                  type="text"
                  value={evaluatorForm.name}
                  onChange={(e) =>
                    setEvaluatorForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-600">Email</label>
                <input
                  type="email"
                  value={evaluatorForm.email}
                  onChange={(e) =>
                    setEvaluatorForm((f) => ({ ...f, email: e.target.value }))
                  }
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-600">
                  Phone (10 digits)
                </label>
                <input
                  type="tel"
                  value={evaluatorForm.phone}
                  onChange={(e) =>
                    setEvaluatorForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-600">Password</label>
                <input
                  type="password"
                  value={evaluatorForm.password}
                  onChange={(e) =>
                    setEvaluatorForm((f) => ({
                      ...f,
                      password: e.target.value,
                    }))
                  }
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowOnboardModal(false)}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 text-[11px] hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={evaluatorSaving}
                  className="px-4 py-1.5 rounded-lg bg-[#137952] text-white text-[11px] font-medium disabled:opacity-60"
                >
                  {evaluatorSaving ? "Saving..." : "Create Evaluator"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;


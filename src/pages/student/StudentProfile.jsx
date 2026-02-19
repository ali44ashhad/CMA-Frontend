import React, { useEffect, useState } from "react";
import { STUDENT_ENDPOINTS, authedJsonFetch } from "../../api";

const StudentProfile = ({
  user,
  accessToken,
  updateUser,
  changePassword,
  logout,
}) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editName, setEditName] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showPwdForm, setShowPwdForm] = useState(false);
  const [pwdForm, setPwdForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [pwdError, setPwdError] = useState("");
  const [pwdSuccess, setPwdSuccess] = useState("");
  const [pwdSaving, setPwdSaving] = useState(false);

  const authedFetch = (path, options = {}) =>
    authedJsonFetch(path, accessToken, options);

  useEffect(() => {
    if (!accessToken) return;
    const load = async () => {
      try {
        setLoading(true);
        const data = await authedFetch(STUDENT_ENDPOINTS.PROFILE);
        setProfile(data);
        setEditName(data.name || "");
      } catch (e) {
        console.error("Student profile load error:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [accessToken]);

  const currentProfile = profile || user;

  const handleStartEdit = () => {
    setEditName(currentProfile?.name || "");
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!editName.trim()) return;
    try {
      setSaving(true);
      const updated = await authedFetch(STUDENT_ENDPOINTS.PROFILE, {
        method: "PUT",
        body: JSON.stringify({ name: editName.trim() }),
      });
      setProfile(updated);
      updateUser({ name: updated.name });
      setEditing(false);
    } catch (err) {
      console.error("Update profile failed", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-[#137952]/30 border-t-[#137952] rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 bg-[#137952] rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-sm text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#137952]/10 to-[#137952]/5 border border-[#137952]/30 rounded-full mb-3">
            <div className="w-1.5 h-1.5 bg-[#137952] rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-[#137952]">
              Personal Information
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">User Profile</h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage your personal information and security settings
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {!editing && !showPwdForm && (
            <button
              onClick={handleStartEdit}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#137952] to-[#0d5c3d] text-white font-medium rounded-lg hover:from-[#0d5c3d] hover:to-[#0a4a2e] transition-all shadow-sm text-sm gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit Profile
            </button>
          )}
          <button
            onClick={() => {
              setShowPwdForm((v) => !v);
              setEditing(false);
              setPwdError("");
              setPwdSuccess("");
            }}
            className={`inline-flex items-center px-4 py-2 border font-medium rounded-lg transition-all text-sm gap-2 ${
              showPwdForm
                ? 'border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            {showPwdForm ? "Cancel Password Change" : "Change Password"}
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Profile Information Card */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-[#137952]/10 to-emerald-50/50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#137952]/80 to-[#137952] rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Profile Details</h3>
                <p className="text-xs text-gray-600">Your personal information</p>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6">
            {editing ? (
              <form onSubmit={handleSaveProfile} className="space-y-5">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#137952]/20 focus:border-[#137952] transition-all"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div className="bg-[#137952]/10 rounded-xl p-4 border border-[#137952]/20">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-[#137952]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#137952]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-xs text-gray-600">
                      Only your name can be updated from the profile. Other details like email and phone cannot be changed here.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#137952] to-[#0d5c3d] text-white font-medium rounded-xl hover:from-[#0d5c3d] hover:to-[#0a4a2e] transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed text-sm flex items-center gap-2"
                  >
                    {saving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Save Changes
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-5">
                {/* Profile Info Display */}
                <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#137952]/20 to-purple-100 rounded-2xl flex items-center justify-center">
                    <span className="text-3xl font-bold text-[#137952]">
                      {currentProfile?.name?.charAt(0) || 'S'}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{currentProfile?.name}</h4>
                    <span className="inline-flex items-center px-2.5 py-1 bg-[#137952]/10 text-[#137952] text-xs font-medium rounded-full border border-[#137952]/30 mt-1 capitalize">
                      {currentProfile?.role || 'Student'}
                    </span>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Email Address</p>
                      <p className="text-sm font-medium text-gray-900">{currentProfile?.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Phone Number</p>
                      <p className="text-sm font-medium text-gray-900">{currentProfile?.phone || 'Not provided'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Account Type</p>
                      <p className="text-sm font-medium text-gray-900 capitalize">{currentProfile?.role || 'Student'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Change Password Card */}
        {showPwdForm && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50/50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Change Password</h3>
                  <p className="text-xs text-gray-600">Update your password regularly for security</p>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6">
              {pwdError && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-sm text-red-700">{pwdError}</p>
                  </div>
                </div>
              )}

              {pwdSuccess && (
                <div className="mb-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-emerald-700 font-medium">{pwdSuccess}</p>
                      <p className="text-xs text-emerald-600 mt-1">You will be logged out in a moment...</p>
                    </div>
                  </div>
                </div>
              )}

              <form
                className="space-y-5"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setPwdError("");
                  setPwdSuccess("");
                  if (!pwdForm.currentPassword || !pwdForm.newPassword) {
                    setPwdError("Please fill all fields.");
                    return;
                  }
                  if (pwdForm.newPassword.length < 8) {
                    setPwdError("New password must be at least 8 characters.");
                    return;
                  }
                  if (pwdForm.newPassword !== pwdForm.confirmPassword) {
                    setPwdError("New password and confirm password do not match.");
                    return;
                  }
                  try {
                    setPwdSaving(true);
                    await changePassword({
                      currentPassword: pwdForm.currentPassword,
                      newPassword: pwdForm.newPassword,
                    });
                    setPwdSuccess("Password changed successfully. You will be logged out.");
                    setPwdForm({
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                    setTimeout(() => {
                      logout();
                    }, 1500);
                  } catch (err) {
                    setPwdError(err.message || "Failed to change password.");
                  } finally {
                    setPwdSaving(false);
                  }
                }}
              >
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={pwdForm.currentPassword}
                    onChange={(e) =>
                      setPwdForm((f) => ({
                        ...f,
                        currentPassword: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                    placeholder="Enter current password"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={pwdForm.newPassword}
                    onChange={(e) =>
                      setPwdForm((f) => ({
                        ...f,
                        newPassword: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                    placeholder="Enter new password"
                  />
                  <p className="text-xs text-gray-500 mt-1.5">
                    Password must be at least 8 characters long
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={pwdForm.confirmPassword}
                    onChange={(e) =>
                      setPwdForm((f) => ({
                        ...f,
                        confirmPassword: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                    placeholder="Confirm new password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={pwdSaving}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
                >
                  {pwdSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Changing Password...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Update Password
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Security Tips */}
      {!showPwdForm && !editing && (
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-[#137952]/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-[#137952]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1">Security Tip</h4>
              <p className="text-sm text-gray-600">
                For better security, change your password regularly and never share it with anyone. 
                Use a combination of letters, numbers, and special characters for a strong password.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
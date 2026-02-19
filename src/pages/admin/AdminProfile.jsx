import React from "react";

const AdminProfile = ({ user }) => {
  const initial = user?.name?.charAt(0)?.toUpperCase() || "A";

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Admin Profile
          </h2>
          <p className="text-sm text-gray-600">
            View your admin account details and role information.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Summary Card */}
        <div className="md:col-span-1">
          <div className="bg-gradient-to-br from-[#137952] to-[#0d5c3d] rounded-2xl p-5 text-white shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-2xl font-semibold">
                {initial}
              </div>
              <div>
                <div className="text-sm text-white/90">Logged in as</div>
                <div className="font-semibold text-white">
                  {user?.name || "Admin User"}
                </div>
                <div className="text-xs text-white/90/90 mt-1">
                  {user?.email || "admin@example.com"}
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-white/90">
              <span className="inline-flex items-center px-2 py-1 rounded-full bg-white/10 border border-white/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 mr-1.5" />
                Super Admin Access
              </span>
            </div>
          </div>
        </div>

        {/* Details Card */}
        <div className="md:col-span-2">
          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 md:p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Account Details
            </h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-gray-500">Full Name</dt>
                <dd className="font-medium text-gray-900">
                  {user?.name || "-"}
                </dd>
              </div>
              <div>
                <dt className="text-gray-500">Email Address</dt>
                <dd className="font-medium text-gray-900 break-all">
                  {user?.email || "-"}
                </dd>
              </div>
              <div>
                <dt className="text-gray-500">Phone</dt>
                <dd className="font-medium text-gray-900">
                  {user?.phone || "-"}
                </dd>
              </div>
              <div>
                <dt className="text-gray-500">Role</dt>
                <dd className="font-medium text-gray-900 capitalize">
                  {user?.role || "admin"}
                </dd>
              </div>
            </dl>

            <div className="mt-6 p-4 bg-white rounded-xl border border-dashed border-[#137952]/30 text-xs text-gray-600">
              <p>
                Need to change admin details? For security reasons, profile
                updates are restricted. Please contact the technical team to
                modify admin information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;


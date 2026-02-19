import React, { useState } from "react";
import { BASE_URL_ADMINS, authedJsonFetch } from "../../api";

const PackageManagement = ({ accessToken }) => {
  const [packages, setPackages] = useState([]);
  const [packagesLoading, setPackagesLoading] = useState(false);
  const [packageMessage, setPackageMessage] = useState("");
  const [packageError, setPackageError] = useState("");
  const [savingId, setSavingId] = useState(null); // package id or "new" while saving

  // Inline edit state
  const [editingId, setEditingId] = useState(null);
  const [editingForm, setEditingForm] = useState({
    name: "",
    level: "",
    year: "",
    price: "",
    description: "",
    status: "",
  });

  // Inline create state (optional new row)
  const [isCreating, setIsCreating] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: "",
    level: "foundation",
    year: "",
    price: "",
    description: "",
    status: "active",
  });

  const authedFetch = (path, options = {}) =>
    authedJsonFetch(`${BASE_URL_ADMINS}${path}`, accessToken, options);

  const loadPackages = async () => {
    if (!accessToken) return;
    try {
      setPackagesLoading(true);
      const data = await authedFetch(`/packages`);
      const list = data.packages || data.items || data;
      setPackages(Array.isArray(list) ? list : []);
    } catch (e) {
      console.error("Load packages failed", e);
    } finally {
      setPackagesLoading(false);
    }
  };

  React.useEffect(() => {
    loadPackages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const startEdit = (pkg) => {
    setEditingId(pkg._id);
    setEditingForm({
      name: pkg.name || "",
      level: pkg.level || "foundation",
      year: pkg.year ? String(pkg.year) : "",
      price: pkg.price != null ? String(pkg.price) : "",
      description: pkg.description || "",
      status: pkg.status || "active",
    });
    setPackageError("");
    setPackageMessage("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingForm({
      name: "",
      level: "",
      year: "",
      price: "",
      description: "",
      status: "",
    });
  };

  const saveEdit = async (pkgId) => {
    if (!pkgId) return;
    setPackageError("");
    setPackageMessage("");

    const payload = {};
    if (editingForm.name) payload.name = editingForm.name;
    if (editingForm.level) payload.level = editingForm.level;
    if (editingForm.year) payload.year = Number(editingForm.year);
    if (editingForm.price) payload.price = Number(editingForm.price);
    if (editingForm.description) payload.description = editingForm.description;
    if (editingForm.status) payload.status = editingForm.status;

    if (Object.keys(payload).length === 0) {
      setPackageError("Provide at least one field to update.");
      return;
    }

    try {
      setSavingId(pkgId);
      await authedFetch(`/packages/${pkgId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      setPackageMessage("Package updated successfully.");
      await loadPackages();
      cancelEdit();
    } catch (err) {
      setPackageError(err.message || "Failed to update package.");
    } finally {
      setSavingId(null);
    }
  };

  const archivePackage = async (pkgId) => {
    if (!pkgId) return;
    setPackageError("");
    setPackageMessage("");

    const confirmed = window.confirm(
      "Are you sure you want to archive this package?"
    );
    if (!confirmed) return;

    try {
      setSavingId(pkgId);
      await authedFetch(`/packages/${pkgId}/archive`, {
        method: "PUT",
      });
      setPackageMessage("Package archived successfully.");
      await loadPackages();
    } catch (err) {
      setPackageError(err.message || "Failed to archive package.");
    } finally {
      setSavingId(null);
    }
  };

  const createPackage = async () => {
    setPackageError("");
    setPackageMessage("");

    if (!createForm.name || !createForm.level) {
      setPackageError("Name and level are required.");
      return;
    }

    try {
      setSavingId("new");
      const body = {
        ...createForm,
        year: createForm.year ? Number(createForm.year) : undefined,
        price: createForm.price ? Number(createForm.price) : undefined,
      };
      await authedFetch(`/packages`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      setPackageMessage("Package created successfully.");
      setCreateForm({
        name: "",
        level: "foundation",
        year: "",
        price: "",
        description: "",
        status: "active",
      });
      setIsCreating(false);
      await loadPackages();
    } catch (err) {
      setPackageError(err.message || "Failed to create package.");
    } finally {
      setSavingId(null);
    }
  };

  const isSaving = (id) => savingId != null && savingId === id;

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Package Management
          </h2>
          <p className="text-xs text-gray-500">
            All packages in a single view. Edit or archive directly from each
            row.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsCreating((v) => !v)}
          className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-[#137952] text-white hover:bg-[#0d5c3d]"
        >
          {isCreating ? "Cancel new package" : "Add new package"}
        </button>
      </div>
      {packageError && (
        <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {packageError}
        </div>
      )}
      {packageMessage && (
        <div className="text-xs text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2">
          {packageMessage}
        </div>
      )}

      {/* Packages list + inline create/edit */}
      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">
            Existing Packages
          </h3>
          <span className="text-[11px] text-gray-500">
            Total: {packages.length}
          </span>
        </div>
        {packagesLoading ? (
          <p className="text-[11px] text-gray-500">Loading packages...</p>
        ) : packages.length === 0 && !isCreating ? (
          <p className="text-[11px] text-gray-500">
            No packages found. Click &quot;Add new package&quot; to create one.
          </p>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-auto">
            <table className="w-full text-[11px] min-w-[720px]">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-3 py-2 border-b text-left w-40">Name</th>
                  <th className="px-3 py-2 border-b text-left w-28">Level</th>
                  <th className="px-3 py-2 border-b text-left w-20">Year</th>
                  <th className="px-3 py-2 border-b text-left w-24">Price</th>
                  <th className="px-3 py-2 border-b text-left w-32">
                    Description
                  </th>
                  <th className="px-3 py-2 border-b text-left w-20">Status</th>
                  <th className="px-3 py-2 border-b text-center w-40">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {/* Inline create row */}
                {isCreating && (
                  <tr className="bg-gray-50/60">
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={createForm.name}
                        onChange={(e) =>
                          setCreateForm((f) => ({
                            ...f,
                            name: e.target.value,
                          }))
                        }
                        className="w-full border rounded px-2 py-1 text-[11px]"
                        placeholder="Package name"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <select
                        value={createForm.level}
                        onChange={(e) =>
                          setCreateForm((f) => ({
                            ...f,
                            level: e.target.value,
                          }))
                        }
                        className="w-full border rounded px-2 py-1 text-[11px]"
                      >
                        <option value="foundation">foundation</option>
                        <option value="intermediate">intermediate</option>
                        <option value="final">final</option>
                      </select>
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        value={createForm.year}
                        onChange={(e) =>
                          setCreateForm((f) => ({
                            ...f,
                            year: e.target.value,
                          }))
                        }
                        className="w-full border rounded px-2 py-1 text-[11px]"
                        placeholder="e.g. 2025"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        value={createForm.price}
                        onChange={(e) =>
                          setCreateForm((f) => ({
                            ...f,
                            price: e.target.value,
                          }))
                        }
                        className="w-full border rounded px-2 py-1 text-[11px]"
                        placeholder="₹"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={createForm.description}
                        onChange={(e) =>
                          setCreateForm((f) => ({
                            ...f,
                            description: e.target.value,
                          }))
                        }
                        className="w-full border rounded px-2 py-1 text-[11px]"
                        placeholder="Short description"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <select
                        value={createForm.status}
                        onChange={(e) =>
                          setCreateForm((f) => ({
                            ...f,
                            status: e.target.value,
                          }))
                        }
                        className="w-full border rounded px-2 py-1 text-[11px] capitalize"
                      >
                        <option value="active">active</option>
                        <option value="archived">archived</option>
                      </select>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <div className="inline-flex items-center gap-1 justify-center">
                        <button
                          type="button"
                          onClick={createPackage}
                          disabled={isSaving("new")}
                          className="px-2 py-1 rounded-full bg-[#137952] text-white font-medium hover:bg-[#0d5c3d] disabled:opacity-60"
                        >
                          {isSaving("new") ? "Creating..." : "Create"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsCreating(false);
                            setCreateForm({
                              name: "",
                              level: "foundation",
                              year: "",
                              price: "",
                              description: "",
                              status: "active",
                            });
                          }}
                          className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                )}

                {/* Existing packages rows */}
                {packages.map((p) => {
                  const isEditing = editingId === p._id;
                  return (
                    <tr key={p._id} className="hover:bg-gray-50/70">
                      <td className="px-3 py-2">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editingForm.name}
                            onChange={(e) =>
                              setEditingForm((f) => ({
                                ...f,
                                name: e.target.value,
                              }))
                            }
                            className="w-full border rounded px-2 py-1 text-[11px]"
                          />
                        ) : (
                          <span className="font-medium text-gray-900">
                            {p.name}
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2">
                        {isEditing ? (
                          <select
                            value={editingForm.level}
                            onChange={(e) =>
                              setEditingForm((f) => ({
                                ...f,
                                level: e.target.value,
                              }))
                            }
                            className="w-full border rounded px-2 py-1 text-[11px]"
                          >
                            <option value="foundation">foundation</option>
                            <option value="intermediate">intermediate</option>
                            <option value="final">final</option>
                          </select>
                        ) : (
                          <span className="capitalize text-gray-700">
                            {p.level}
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2">
                        {isEditing ? (
                          <input
                            type="number"
                            value={editingForm.year}
                            onChange={(e) =>
                              setEditingForm((f) => ({
                                ...f,
                                year: e.target.value,
                              }))
                            }
                            className="w-full border rounded px-2 py-1 text-[11px]"
                          />
                        ) : (
                          <span className="text-gray-700">
                            {p.year || "-"}
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2">
                        {isEditing ? (
                          <input
                            type="number"
                            value={editingForm.price}
                            onChange={(e) =>
                              setEditingForm((f) => ({
                                ...f,
                                price: e.target.value,
                              }))
                            }
                            className="w-full border rounded px-2 py-1 text-[11px]"
                          />
                        ) : (
                          <span className="text-gray-700">
                            {p.price != null ? `₹${p.price}` : "-"}
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editingForm.description}
                            onChange={(e) =>
                              setEditingForm((f) => ({
                                ...f,
                                description: e.target.value,
                              }))
                            }
                            className="w-full border rounded px-2 py-1 text-[11px]"
                          />
                        ) : (
                          <span className="text-gray-700 line-clamp-2">
                            {p.description || "-"}
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2">
                        {isEditing ? (
                          <select
                            value={editingForm.status}
                            onChange={(e) =>
                              setEditingForm((f) => ({
                                ...f,
                                status: e.target.value,
                              }))
                            }
                            className="w-full border rounded px-2 py-1 text-[11px] capitalize"
                          >
                            <option value="active">active</option>
                            <option value="archived">archived</option>
                          </select>
                        ) : (
                          <span className="capitalize text-gray-700">
                            {p.status || "-"}
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-center">
                        <div className="inline-flex items-center gap-1 justify-center">
                          {isEditing ? (
                            <>
                              <button
                                type="button"
                                onClick={() => saveEdit(p._id)}
                                disabled={isSaving(p._id)}
                                className="px-2 py-1 rounded-full bg-[#137952] text-white font-medium hover:bg-[#0d5c3d] disabled:opacity-60"
                              >
                                {isSaving(p._id) ? "Saving..." : "Save"}
                              </button>
                              <button
                                type="button"
                                onClick={cancelEdit}
                                className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                className="px-2 py-1 rounded-full bg-[#137952]/10 text-[#137952] font-medium hover:bg-[#137952]/20"
                                onClick={() => startEdit(p)}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="px-2 py-1 rounded-full bg-yellow-50 text-yellow-700 font-medium hover:bg-yellow-100"
                                onClick={() => archivePackage(p._id)}
                                disabled={isSaving(p._id)}
                              >
                                {isSaving(p._id) ? "Archiving..." : "Archive"}
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageManagement;

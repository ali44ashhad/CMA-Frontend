import React, { useEffect, useState } from "react";
import { BASE_URL_ADMINS, authedJsonFetch } from "../../api";

const defaultCreateForm = () => ({
  name: "",
  description: "",
  level: "foundation",
  selectedPackageIds: [],
  status: "active",
  order: "",
});

const defaultEditForm = () => ({
  name: "",
  description: "",
  level: "",
  selectedPackageIds: [],
  status: "",
  order: "",
});

// topic.packageIds from API may be populated objects or raw IDs
const packageIdsToArray = (packageIds) => {
  if (!packageIds || !Array.isArray(packageIds)) return [];
  return packageIds
    .map((p) => (typeof p === "object" && p?._id ? p._id : p))
    .filter(Boolean);
};

// Show package names for display (uses packages list for lookup, or populated name)
const packageNamesForDisplay = (packageIds, packagesList) => {
  if (!packageIds || !Array.isArray(packageIds)) return "-";
  const names = packageIds.map((p) => {
    const id = typeof p === "object" && p?._id ? p._id : p;
    const name = typeof p === "object" && p?.name ? p.name : null;
    if (name) return `${name}`;
    const found = packagesList.find((pk) => pk._id === id);
    return found ? `${found.name} (${found.level})` : id;
  });
  return names.length ? names.join(", ") : "-";
};

const TopicManagement = ({ accessToken }) => {
  const [topics, setTopics] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [topicMessage, setTopicMessage] = useState("");
  const [topicError, setTopicError] = useState("");
  const [savingId, setSavingId] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editingForm, setEditingForm] = useState(defaultEditForm());

  const [isCreating, setIsCreating] = useState(false);
  const [createForm, setCreateForm] = useState(defaultCreateForm());

  const authedFetch = (path, options = {}) =>
    authedJsonFetch(`${BASE_URL_ADMINS}${path}`, accessToken, options);

  const loadTopics = async () => {
    if (!accessToken) return;
    try {
      setLoading(true);
      const data = await authedFetch(`/topics`);
      const list = Array.isArray(data) ? data : data?.items || data?.topics || [];
      setTopics(list);
    } catch (e) {
      console.error("Topic management error:", e);
    } finally {
      setLoading(false);
    }
  };

  const loadPackages = async () => {
    if (!accessToken) return;
    try {
      const data = await authedFetch(`/packages`);
      const list = data?.packages ?? data?.items ?? (Array.isArray(data) ? data : []);
      setPackages(Array.isArray(list) ? list : []);
    } catch (e) {
      console.error("Load packages error:", e);
    }
  };

  useEffect(() => {
    loadTopics();
    loadPackages();
  }, [accessToken]);

  const startEdit = (t) => {
    setEditingId(t._id);
    setEditingForm({
      name: t.name || "",
      description: t.description || "",
      level: t.level || "foundation",
      selectedPackageIds: packageIdsToArray(t.packageIds),
      status: t.status || "active",
      order: t.order != null ? String(t.order) : "",
    });
    setTopicError("");
    setTopicMessage("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingForm(defaultEditForm());
  };

  const saveEdit = async (topicId) => {
    if (!topicId) return;
    setTopicError("");
    setTopicMessage("");

    const payload = {};
    if (editingForm.name) payload.name = editingForm.name;
    if (editingForm.description !== undefined) payload.description = editingForm.description;
    if (editingForm.level) payload.level = editingForm.level;
    if (editingForm.status) payload.status = editingForm.status;
    if (editingForm.order !== "") payload.order = Number(editingForm.order);
    if (editingForm.selectedPackageIds?.length !== undefined) {
      payload.packageIds = editingForm.selectedPackageIds.filter(Boolean);
    }

    if (Object.keys(payload).length === 0) {
      setTopicError("Provide at least one field to update.");
      return;
    }

    try {
      setSavingId(topicId);
      await authedFetch(`/topics/${topicId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      setTopicMessage("Topic updated successfully.");
      await loadTopics();
      cancelEdit();
    } catch (err) {
      setTopicError(err.message || "Failed to update topic.");
    } finally {
      setSavingId(null);
    }
  };

  const archiveTopic = async (topicId) => {
    if (!topicId) return;
    setTopicError("");
    setTopicMessage("");
    const confirmed = window.confirm(
      "Are you sure you want to archive this topic? (Status will be set to archived.)"
    );
    if (!confirmed) return;
    try {
      setSavingId(topicId);
      await authedFetch(`/topics/${topicId}`, {
        method: "PUT",
        body: JSON.stringify({ status: "archived" }),
      });
      setTopicMessage("Topic archived successfully.");
      await loadTopics();
    } catch (err) {
      setTopicError(err.message || "Failed to archive topic.");
    } finally {
      setSavingId(null);
    }
  };

  const createTopic = async () => {
    setTopicError("");
    setTopicMessage("");
    if (!createForm.name || !createForm.level) {
      setTopicError("Name and level are required.");
      return;
    }
    try {
      setSavingId("new");
      const body = {
        name: createForm.name,
        description: createForm.description || undefined,
        level: createForm.level,
        status: createForm.status,
        order: createForm.order ? Number(createForm.order) : undefined,
        packageIds: createForm.selectedPackageIds?.length ? createForm.selectedPackageIds : [],
      };
      await authedFetch(`/topics`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      setTopicMessage("Topic created successfully.");
      setCreateForm(defaultCreateForm());
      setIsCreating(false);
      await loadTopics();
    } catch (err) {
      setTopicError(err.message || "Failed to create topic.");
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
            Topic Management
          </h2>
          <p className="text-xs text-gray-500">
            All topics in one view. Edit or archive directly from each row.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsCreating((v) => !v)}
          className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-[#137952] text-white hover:bg-[#0d5c3d]"
        >
          {isCreating ? "Cancel new topic" : "Add new topic"}
        </button>
      </div>
      {topicError && (
        <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {topicError}
        </div>
      )}
      {topicMessage && (
        <div className="text-xs text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2">
          {topicMessage}
        </div>
      )}

      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">
            Existing Topics
          </h3>
          <span className="text-[11px] text-gray-500">Total: {topics.length}</span>
        </div>
        {loading ? (
          <p className="text-[11px] text-gray-500">Loading topics...</p>
        ) : topics.length === 0 && !isCreating ? (
          <p className="text-[11px] text-gray-500">
            No topics found. Click &quot;Add new topic&quot; to create one.
          </p>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-auto">
            <table className="w-full text-[11px] min-w-[720px]">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-3 py-2 border-b text-left w-36">Name</th>
                  <th className="px-3 py-2 border-b text-left w-40">Description</th>
                  <th className="px-3 py-2 border-b text-left w-28">Level</th>
                  <th className="px-3 py-2 border-b text-left w-40">Packages</th>
                  <th className="px-3 py-2 border-b text-left w-20">Status</th>
                  <th className="px-3 py-2 border-b text-left w-16">Order</th>
                  <th className="px-3 py-2 border-b text-center w-40">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isCreating && (
                  <tr className="bg-gray-50/60">
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={createForm.name}
                        onChange={(e) =>
                          setCreateForm((f) => ({ ...f, name: e.target.value }))
                        }
                        className="w-full border rounded px-2 py-1 text-[11px]"
                        placeholder="Topic name"
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
                        placeholder="Description"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <select
                        value={createForm.level}
                        onChange={(e) =>
                          setCreateForm((f) => ({ ...f, level: e.target.value }))
                        }
                        className="w-full border rounded px-2 py-1 text-[11px]"
                      >
                        <option value="foundation">foundation</option>
                        <option value="intermediate">intermediate</option>
                        <option value="final">final</option>
                      </select>
                    </td>
                    <td className="px-3 py-2">
                      <select
                        multiple
                        size={3}
                        value={createForm.selectedPackageIds}
                        onChange={(e) =>
                          setCreateForm((f) => ({
                            ...f,
                            selectedPackageIds: Array.from(
                              e.target.selectedOptions,
                              (o) => o.value
                            ),
                          }))
                        }
                        className="w-full border rounded px-2 py-1 text-[11px]"
                        title="Hold Ctrl/Cmd to select multiple"
                      >
                        {packages
                          .filter(
                            (pkg) =>
                              !createForm.level || pkg.level === createForm.level
                          )
                          .map((pkg) => (
                            <option key={pkg._id} value={pkg._id}>
                              {pkg.name} ({pkg.level})
                            </option>
                          ))}
                        {packages.filter(
                          (p) => !createForm.level || p.level === createForm.level
                        ).length === 0 && (
                          <option disabled>No packages for this level</option>
                        )}
                      </select>
                      <span className="text-[10px] text-gray-500 block mt-0.5">
                        Ctrl+click to select multiple
                      </span>
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
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        value={createForm.order}
                        onChange={(e) =>
                          setCreateForm((f) => ({ ...f, order: e.target.value }))
                        }
                        className="w-full border rounded px-2 py-1 text-[11px]"
                        placeholder="0"
                      />
                    </td>
                    <td className="px-3 py-2 text-center">
                      <div className="inline-flex items-center gap-1 justify-center">
                        <button
                          type="button"
                          onClick={createTopic}
                          disabled={isSaving("new")}
                          className="px-2 py-1 rounded-full bg-[#137952] text-white font-medium hover:bg-[#0d5c3d] disabled:opacity-60"
                        >
                          {isSaving("new") ? "Creating..." : "Create"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsCreating(false);
                            setCreateForm(defaultCreateForm());
                          }}
                          className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                )}

                {topics.map((t) => {
                  const isEditing = editingId === t._id;
                  return (
                    <tr key={t._id} className="hover:bg-gray-50/70">
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
                            {t.name}
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
                            {t.description || "-"}
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
                            {t.level}
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2">
                        {isEditing ? (
                          <select
                            multiple
                            size={3}
                            value={editingForm.selectedPackageIds}
                            onChange={(e) =>
                              setEditingForm((f) => ({
                                ...f,
                                selectedPackageIds: Array.from(
                                  e.target.selectedOptions,
                                  (o) => o.value
                                ),
                              }))
                            }
                            className="w-full border rounded px-2 py-1 text-[11px]"
                            title="Hold Ctrl/Cmd to select multiple"
                          >
                            {packages
                              .filter(
                                (pkg) =>
                                  !editingForm.level ||
                                  pkg.level === editingForm.level
                              )
                              .map((pkg) => (
                                <option key={pkg._id} value={pkg._id}>
                                  {pkg.name} ({pkg.level})
                                </option>
                              ))}
                            {packages.filter(
                              (p) =>
                                !editingForm.level ||
                                p.level === editingForm.level
                            ).length === 0 && (
                              <option disabled>No packages for this level</option>
                            )}
                          </select>
                        ) : (
                          <span className="text-gray-700 line-clamp-2">
                            {packageNamesForDisplay(t.packageIds, packages)}
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
                            {t.status || "-"}
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2">
                        {isEditing ? (
                          <input
                            type="number"
                            value={editingForm.order}
                            onChange={(e) =>
                              setEditingForm((f) => ({
                                ...f,
                                order: e.target.value,
                              }))
                            }
                            className="w-full border rounded px-2 py-1 text-[11px] w-14"
                          />
                        ) : (
                          <span className="text-gray-700">
                            {t.order != null ? t.order : "-"}
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-center">
                        <div className="inline-flex items-center gap-1 justify-center">
                          {isEditing ? (
                            <>
                              <button
                                type="button"
                                onClick={() => saveEdit(t._id)}
                                disabled={isSaving(t._id)}
                                className="px-2 py-1 rounded-full bg-[#137952] text-white font-medium hover:bg-[#0d5c3d] disabled:opacity-60"
                              >
                                {isSaving(t._id) ? "Saving..." : "Save"}
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
                                onClick={() => startEdit(t)}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                className="px-2 py-1 rounded-full bg-yellow-50 text-yellow-700 font-medium hover:bg-yellow-100"
                                onClick={() => archiveTopic(t._id)}
                                disabled={isSaving(t._id)}
                              >
                                {isSaving(t._id) ? "Archiving..." : "Archive"}
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

export default TopicManagement;

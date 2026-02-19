import React, { useEffect, useState, useCallback } from "react";
import { STUDENT_ENDPOINTS, PAYMENT_ENDPOINTS, authedJsonFetch } from "../../api";
import { useAuth } from "../../context/AuthContext";

const loadRazorpayScript = () => {
  if (window.Razorpay) return Promise.resolve();
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = resolve;
    document.body.appendChild(script);
  });
};

const StudentPurchases = ({ accessToken }) => {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [retryingId, setRetryingId] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState("");

  const authedFetch = (path, options = {}) =>
    authedJsonFetch(path, accessToken, options);

  const loadPurchases = useCallback(async () => {
    if (!accessToken) return;
    try {
      setLoading(true);
      setError("");
      const data = await authedJsonFetch(STUDENT_ENDPOINTS.PURCHASES, accessToken);
      const list = data.purchases || data.items || data;
      setPurchases(Array.isArray(list) ? list : []);
    } catch (e) {
      console.error("Student purchases error:", e);
      setError(e.message || "Failed to load purchases");
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    loadPurchases();
  }, [loadPurchases]);

  const handleRetryPayment = async (purchase) => {
    if (!accessToken) return;
    const packageId = purchase.packageId?._id || purchase.packageId;
    if (!packageId) {
      setError("Invalid purchase: package not found.");
      return;
    }
    setError("");
    setPaymentSuccess("");
    setRetryingId(purchase._id);
    try {
      const result = await authedJsonFetch(PAYMENT_ENDPOINTS.RETRY_PAYMENT, accessToken, {
        method: "POST",
        body: JSON.stringify({ packageId }),
      });

      if (result?.free) {
        setPaymentSuccess("Package activated successfully!");
        setRetryingId(null);
        loadPurchases();
        return;
      }

      await loadRazorpayScript();
      const options = {
        key: result.key,
        order_id: result.orderId,
        name: "CMA Test Series",
        description: result.packageName || getPackageName(purchase),
        prefill: { email: user?.email || "", name: user?.name || "" },
        theme: { color: "#137952" },
        handler: async function (response) {
          try {
            await authedJsonFetch(PAYMENT_ENDPOINTS.VERIFY, accessToken, {
              method: "POST",
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            setPaymentSuccess("Payment successful! Your package is now active.");
            loadPurchases();
          } catch (err) {
            setError(err.message || "Payment verification failed. Please contact support.");
          } finally {
            setRetryingId(null);
          }
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function () {
        setError("Payment failed. You can try again from this page.");
        setRetryingId(null);
      });
      rzp.open();
    } catch (e) {
      setError(e.message || "Failed to start payment.");
      setRetryingId(null);
    }
  };

  const getPackageName = (purchase) =>
    purchase.packageId?.name || purchase.packageName || purchase.name || "Test Package";

  const mapPaymentToUiStatus = (paymentStatus) => {
    // Backend uses `paymentStatus`: 'pending' | 'success' | 'failed'
    if (!paymentStatus) return "pending";
    if (paymentStatus === "success") return "active";
    if (paymentStatus === "failed") return "failed";
    return "pending";
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "from-emerald-500 to-emerald-600";
      case "pending":
        return "from-yellow-500 to-orange-500";
      case "failed":
        return "from-red-500 to-red-600";
      default:
        return "from-[#137952]/80 to-[#137952]";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Hide pending/failed cards when the same package already has a successful purchase
  const getPackageId = (p) => String(p.packageId?._id || p.packageId);
  const successPackageIds = new Set(
    purchases.filter((p) => p.paymentStatus === "success").map(getPackageId)
  );
  const displayPurchases = purchases.filter(
    (p) =>
      p.paymentStatus === "success" ||
      !successPackageIds.has(getPackageId(p))
  );

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
          <p className="text-sm text-gray-600 font-medium">Loading your purchases...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#137952]/10 to-[#137952]/5 border border-[#137952]/30 rounded-full mb-3">
          <div className="w-1.5 h-1.5 bg-[#137952] rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-[#137952]">
            Purchase History
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Purchases</h2>
            <p className="text-sm text-gray-600 mt-1">
              View all your purchased packages and exam series
            </p>
          </div>
          
          {/* Summary Stats */}
          {displayPurchases.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 px-5 py-3 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#137952]/20 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#137952]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Total</span>
                    <p className="text-sm font-semibold text-gray-900">{displayPurchases.length}</p>
                  </div>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Active</span>
                    <p className="text-sm font-semibold text-gray-900">
                      {displayPurchases.filter((p) => mapPaymentToUiStatus(p.paymentStatus) === "active").length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Success Message */}
      {paymentSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm text-green-700">{paymentSuccess}</p>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm text-red-700">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="text-xs text-red-600 hover:text-red-700 font-medium mt-2 underline underline-offset-2"
              >
                Try refreshing the page
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && displayPurchases.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-lg">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Purchases Yet</h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            You haven't purchased any test packages yet. Browse our available packages and start your CMA preparation journey today!
          </p>
          <button 
            onClick={() => {
              // Navigate to packages tab
              const packagesTab = document.querySelector('button[data-tab="packages"]');
              if (packagesTab) packagesTab.click();
            }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#137952] to-[#0d5c3d] text-white font-medium rounded-xl hover:from-[#0d5c3d] hover:to-[#0a4a2e] transition-all shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Browse Packages
          </button>
        </div>
      )}

      {/* Purchases Grid */}
      {displayPurchases.length > 0 && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {displayPurchases.map((purchase) => (
            <div
              key={purchase._id}
              className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Purchase Header with Status */}
              {(() => {
                const uiStatus = mapPaymentToUiStatus(purchase.paymentStatus);
                return (
                  <div className={`bg-gradient-to-r ${getStatusColor(uiStatus)} px-5 py-4 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -translate-x-12 translate-y-12"></div>
                
                <div className="relative flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <div>
                      <span className="inline-flex items-center px-2.5 py-0.5 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/30">
                        {uiStatus}
                      </span>
                    </div>
                  </div>
                  
                  {/* Purchase Price Badge */}
                  {purchase.amount && (
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5">
                      <span className="text-white font-bold">₹{purchase.amount}</span>
                    </div>
                  )}
                </div>
              </div>
                );
              })()}

              {/* Purchase Content */}
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-[#137952] transition-colors">
                  {getPackageName(purchase)}
                </h3>

                {/* Level & Amount row */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  {purchase.packageId?.level && (
                    <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg capitalize">
                      {purchase.packageId.level}
                    </span>
                  )}
                  {purchase.amount != null && (
                    <span className="text-sm font-semibold text-gray-900">₹{purchase.amount}</span>
                  )}
                </div>

                {/* Purchase Details Grid */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Purchased On</p>
                      <p className="text-xs font-medium text-gray-900">
                        {formatDate(purchase.purchasedAt || purchase.createdAt)}
                      </p>
                    </div>
                  </div>
                  {purchase.validUntil && (
                    <div className="flex items-start gap-2">
                      <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Valid Until</p>
                        <p className="text-xs font-medium text-gray-900">{formatDate(purchase.validUntil)}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Expandable full details */}
                {expandedId === purchase._id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Complete details</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {purchase.razorpayOrderId && (
                        <div className="bg-gray-50 rounded-lg px-3 py-2">
                          <p className="text-xs text-gray-500 mb-0.5">Order ID</p>
                          <p className="text-xs font-mono text-gray-700 break-all">{purchase.razorpayOrderId}</p>
                        </div>
                      )}
                      {purchase.razorpayPaymentId && (
                        <div className="bg-gray-50 rounded-lg px-3 py-2">
                          <p className="text-xs text-gray-500 mb-0.5">Payment ID</p>
                          <p className="text-xs font-mono text-gray-700 break-all">{purchase.razorpayPaymentId}</p>
                        </div>
                      )}
                      {purchase.invoiceNumber && (
                        <div className="bg-gray-50 rounded-lg px-3 py-2">
                          <p className="text-xs text-gray-500 mb-0.5">Invoice No.</p>
                          <p className="text-xs font-medium text-gray-700">{purchase.invoiceNumber}</p>
                        </div>
                      )}
                      <div className="bg-gray-50 rounded-lg px-3 py-2">
                        <p className="text-xs text-gray-500 mb-0.5">Payment method</p>
                        <p className="text-xs font-medium text-gray-700">Razorpay</p>
                      </div>
                    </div>
                    {purchase.invoiceUrl && (
                      <a
                        href={purchase.invoiceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#137952] hover:text-[#0d5c3d] font-medium mt-2"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download invoice / receipt
                      </a>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-3 mt-5 flex-wrap">
                  {mapPaymentToUiStatus(purchase.paymentStatus) === "pending" && (
                    <button
                      type="button"
                      onClick={() => handleRetryPayment(purchase)}
                      disabled={retryingId === purchase._id}
                      className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {retryingId === purchase._id ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Opening…
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                          Pay again
                        </>
                      )}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setExpandedId(expandedId === purchase._id ? null : purchase._id)}
                    className="flex-1 min-w-[120px] px-4 py-2.5 bg-gradient-to-r from-[#137952] to-[#0d5c3d] text-white text-sm font-medium rounded-xl hover:from-[#0d5c3d] hover:to-[#0a4a2e] transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    {expandedId === purchase._id ? "Show less" : "View details"}
                  </button>
                  {mapPaymentToUiStatus(purchase.paymentStatus) === "active" && (
                    <button
                      type="button"
                      onClick={() => {
                        const examsTab = document.querySelector('button[data-tab="exams"]');
                        if (examsTab) examsTab.click();
                      }}
                      className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center"
                      title="Go to Available Exams"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Receipt link when not expanded */}
                {!(expandedId === purchase._id) && purchase.invoiceUrl && (
                  <a
                    href={purchase.invoiceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#137952] hover:text-[#0d5c3d] font-medium mt-4"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download invoice
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Purchase Timeline - Optional */}
      {displayPurchases.length > 3 && (
        <div className="mt-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-[#137952]/20 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-[#137952]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900">Purchase Activity</h4>
          </div>
          <div className="space-y-3">
            {displayPurchases.slice(0, 3).map((purchase, index) => (
              <div key={purchase._id} className="flex items-center gap-3 text-sm">
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{getPackageName(purchase)}</p>
                </div>
                <div className="text-xs text-gray-500">
                  {formatDate(purchase.createdAt)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPurchases;
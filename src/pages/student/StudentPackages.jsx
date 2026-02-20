import React, { useEffect, useState } from "react";
import { BASE_URL, STUDENT_ENDPOINTS, PAYMENT_ENDPOINTS, authedJsonFetch } from "../../api";
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

const StudentPackages = () => {
  const { user, accessToken } = useAuth();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState("");
  const [purchasingId, setPurchasingId] = useState(null);
  const [purchasedPackageIds, setPurchasedPackageIds] = useState(new Set());

  const fetchPurchasedIds = async () => {
    if (!accessToken) return;
    try {
      const data = await authedJsonFetch(
        `${STUDENT_ENDPOINTS.PURCHASES}?limit=500`,
        accessToken
      );
      const list = data?.purchases || data?.items || [];
      const ids = new Set(
        (Array.isArray(list) ? list : [])
          .filter((p) => p.paymentStatus === "success")
          .map((p) => String(p.packageId?._id || p.packageId))
      );
      setPurchasedPackageIds(ids);
    } catch (e) {
      console.error("Purchases load for packages:", e);
    }
  };

  const fetchPackages = async () => {
    try {
      setLoading(true);
      setError("");
      const params = new URLSearchParams();
      if (level) params.set("level", level);
      if (year) params.set("year", year);
      const qs = params.toString();
      const res = await fetch(
        `${BASE_URL}${STUDENT_ENDPOINTS.PACKAGES}${qs ? `?${qs}` : ""}`
      );
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || "Failed to load packages");
      }
      const list = data.data?.packages || data.data || data.items || data;
      setPackages(Array.isArray(list) ? list : []);
    } catch (e) {
      console.error("Packages load error", e);
      setError(e.message || "Failed to load packages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchPurchasedIds();
  }, [accessToken]);

  const getLevelColor = (level) => {
    switch(level?.toLowerCase()) {
      case 'foundation': return 'from-emerald-500 to-emerald-600';
      case 'intermediate': return 'from-[#137952]/80 to-[#137952]';
      case 'final': return 'from-purple-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const handleBuyNow = async (pkg) => {
    if (!accessToken) {
      setError("Please log in to purchase a package.");
      return;
    }
    setError("");
    setPaymentSuccess("");
    setPurchasingId(pkg._id);
    try {
      const result = await authedJsonFetch(PAYMENT_ENDPOINTS.CREATE_ORDER, accessToken, {
        method: "POST",
        body: JSON.stringify({ packageId: pkg._id }),
      });

      // Free packages are activated without Razorpay
      if (result?.free) {
            setPaymentSuccess("Package activated successfully! Check My Purchases.");
        setPurchasingId(null);
        fetchPackages();
        fetchPurchasedIds();
        return;
      }

      await loadRazorpayScript();
      const options = {
        key: result.key,
        order_id: result.orderId,
        name: "CMA Test Series",
        description: result.packageName || pkg.name || "Package",
        prefill: { email: user?.email || "", name: user?.name || "" },
        theme: { color: "#137952" },
        handler: async function (response) {
          try {
            // IMPORTANT: Webhook often won't reach localhost.
            // Verify payment from frontend to mark purchase as `success` immediately.
            await authedJsonFetch(PAYMENT_ENDPOINTS.VERIFY, accessToken, {
              method: "POST",
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            setPaymentSuccess("Payment successful! Your package is now active. Check My Purchases.");
            fetchPackages();
            fetchPurchasedIds();
          } catch (err) {
            setError(err.message || "Payment done, but verification failed. Please contact support.");
          } finally {
            setPurchasingId(null);
          }
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        setError(response.error?.description || "Payment failed. Please try again.");
        setPurchasingId(null);
      });
      rzp.open();
    } catch (e) {
      setError(e.message || "Failed to start payment.");
      setPurchasingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#137952]/10 to-[#137952]/5 border border-[#137952]/30 rounded-full mb-3">
            <div className="w-1.5 h-1.5 bg-[#137952] rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-[#137952]">
              Exam Preparation Packages
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Test Packages</h2>
          <p className="text-sm text-gray-600">
            Choose the right package for your CMA journey
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex flex-wrap items-end gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Level
                </span>
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#137952]/20 focus:border-[#137952] bg-white min-w-[140px]"
              >
                <option value="">All Levels</option>
                <option value="foundation">Foundation</option>
                <option value="intermediate">Intermediate</option>
                <option value="final">Final</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Year
                </span>
              </label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="YYYY"
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-24 focus:outline-none focus:ring-2 focus:ring-[#137952]/20 focus:border-[#137952]"
              />
            </div>
            <button
              onClick={fetchPackages}
              className="px-4 py-2 bg-gradient-to-r from-[#137952] to-[#0d5c3d] text-white font-medium rounded-lg hover:from-[#0d5c3d] hover:to-[#0a4a2e] transition-all shadow-sm text-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Apply Filters
            </button>
          </div>
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

      {/* Error Message */}
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
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-[#137952]/30 border-t-[#137952] rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-[#137952] rounded-full animate-pulse"></div>
              </div>
            </div>
            <p className="text-sm text-gray-600 font-medium">Loading packages...</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {packages.length === 0 && !loading && !error && (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-lg">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Packages Found</h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            We couldn't find any test packages matching your criteria. Try adjusting your filters.
          </p>
          <button
            onClick={() => {
              setLevel("");
              setYear("");
              fetchPackages();
            }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#137952] to-[#0d5c3d] text-white font-medium rounded-xl hover:from-[#0d5c3d] hover:to-[#0a4a2e] transition-all shadow-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Clear Filters
          </button>
        </div>
      )}

      {/* Packages Grid */}
      {packages.length > 0 && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Package Header with Gradient */}
              <div className={`bg-gradient-to-r ${getLevelColor(pkg.level)} p-6 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -translate-x-12 translate-y-12"></div>
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/30">
                      {pkg.level || 'CMA'}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:scale-105 transition-transform">
                    {pkg.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-white/90 text-sm">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {pkg.year || '2024'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Package Content */}
              <div className="p-6">
                {/* Features/Pricing */}
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-gray-600">Price</span>
                    <div className="text-right">
                      <span className="text-3xl font-bold text-gray-900">₹{pkg.price}</span>
                      {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                        <span className="ml-2 text-sm text-gray-400 line-through">
                          ₹{pkg.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  {pkg.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {pkg.description}
                    </p>
                  )}

                  {/* Package Features (if available) */}
                  {pkg.features && pkg.features.length > 0 && (
                    <div className="space-y-2 pt-2">
                      {pkg.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <svg className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    {purchasedPackageIds.has(String(pkg._id)) ? (
                      <div className="flex-1 px-4 py-2.5 bg-gray-100 border border-gray-200 text-gray-600 font-medium rounded-xl flex items-center justify-center gap-2 cursor-default">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Purchased
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleBuyNow(pkg)}
                        disabled={purchasingId === pkg._id}
                        className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#137952] to-[#0d5c3d] text-white font-medium rounded-xl hover:from-[#0d5c3d] hover:to-[#0a4a2e] transition-all shadow-lg hover:shadow-[#137952]/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {purchasingId === pkg._id ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Opening…
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Buy Now
                          </>
                        )}
                      </button>
                    )}
                   
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Results Summary */}
      {packages.length > 0 && !loading && (
        <div className="flex items-center justify-between text-sm text-gray-600 border-t border-gray-200 pt-6 mt-2">
          <span>Showing {packages.length} package{packages.length !== 1 ? 's' : ''}</span>
          <button
            onClick={fetchPackages}
            className="inline-flex items-center gap-1 text-[#137952] hover:text-[#0d5c3d] font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentPackages;
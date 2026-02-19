import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.png";
 

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); 
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const userRole = user?.role || "guest";

  // Header navigation should stay same for everyone,
  // only auth section (Login / Logout / Welcome) is dynamic.
  const navItems = useMemo(
    () => [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
      { name: "Contact", path: "/contact" },
      { name: "Pricing", path: "/pricing" },
    ],
    []
  );

  const goToDashboard = (closeMenu = false) => {
    if (!userRole || userRole === "guest") return;

    if (userRole === "student") {
      navigate("/student/dashboard");
    } else if (userRole === "evaluator") {
      navigate("/evaluator/dashboard");
    } else if (userRole === "admin") {
      navigate("/admin/dashboard");
    }

    if (closeMenu) {
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
    navigate("/");
  };

 

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
    
      {/* Main Navigation */}
      <nav className="px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-3">
              <img src={logo} alt="CMA Test Series" className="w-13 h-13" />
            </Link>

            {/* Desktop Navigation */}
           
          </div>
          <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#137952] hover:bg-[#137952]/10 rounded-lg transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              
            </div>
          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            

            {/* Auth section (desktop) */}
            {!isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium text-sm rounded-lg hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-5 py-2.5 bg-[#137952] hover:bg-[#0d5c3d] text-white font-medium text-sm rounded-lg shadow-sm hover:shadow transition-all"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Register
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => goToDashboard(false)}
                  className="flex items-center space-x-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-[#137952] text-white flex items-center justify-center text-xs font-semibold">
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">
                      Welcome, {user?.name || "User"}
                    </div>
                    <div className="text-xs text-gray-500 capitalize">
                      {userRole}
                    </div>
                  </div>
                </button>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 font-medium text-sm rounded-lg hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-gray-200">
            {/* Mobile Search */}
            <div className="px-4 mb-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search tests, questions..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#137952]"
                />
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
 

              {/* Mobile Actions */}
              <div className="px-4 py-4 border-t border-gray-100 space-y-3">
                {isAuthenticated ? (
                  <>
                    <button
                      type="button"
                      onClick={() => goToDashboard(true)}
                      className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-lg text-left hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-8 h-8 bg-[#137952] rounded-full flex items-center justify-center text-white text-sm">
                        {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {user?.name || "User"}
                        </div>
                        <div className="text-xs text-gray-500 capitalize">
                          {userRole} account
                        </div>
                      </div>
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="w-full py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-3">
                      <Link
                        to="/login"
                        className="w-[48%] text-center py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="w-[48%] text-center py-2 bg-[#137952] text-white text-sm font-medium rounded-lg"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Register
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
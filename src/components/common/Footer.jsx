const Footer = () => {
    return (
      <footer className="bg-gray-900 text-gray-300">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4"> 
                <div>
                  <h3 className="text-xl font-bold text-white">CMA Test Series</h3>
                  <p className="text-sm text-gray-400 mt-1">Professional Exam Preparation Platform</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm max-w-md">
              A comprehensive test series platform for CMA students. Practice with expert-curated tests and track your performance with structured evaluation and analytics
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4 mt-6">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/91XXXXXXXXXX"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 bg-gray-800 hover:bg-[#25D366] rounded-lg flex items-center justify-center transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.52 3.48A11.78 11.78 0 0 0 12.04 0C5.64 0 .44 5.19.44 11.58c0 2.04.54 4.03 1.58 5.78L0 24l6.8-1.98a11.65 11.65 0 0 0 5.24 1.28h.01c6.4 0 11.6-5.19 11.6-11.58 0-3.09-1.2-6-3.43-8.24zM12.05 21.2h-.01c-1.61 0-3.19-.43-4.57-1.24l-.33-.2-4.03 1.17 1.15-3.93-.22-.32a9.53 9.53 0 0 1-1.47-5.1C2.57 6.3 6.76 2.12 12.05 2.12c2.5 0 4.84.97 6.6 2.72a9.5 9.5 0 0 1 2.73 6.57c0 5.28-4.3 9.49-9.33 9.49zm5.13-7.1c-.28-.14-1.66-.82-1.92-.91-.26-.1-.45-.14-.64.14-.19.29-.74.9-.9 1.09-.17.2-.33.22-.61.08-.28-.14-1.18-.43-2.25-1.38-.83-.74-1.39-1.66-1.55-1.94-.16-.29-.02-.44.12-.58.13-.13.28-.34.41-.51.14-.17.19-.29.29-.48.1-.2.05-.37-.02-.51-.07-.14-.64-1.54-.88-2.11-.23-.55-.47-.48-.64-.49h-.55c-.2 0-.51.07-.78.37-.27.29-1.02.99-1.02 2.4 0 1.41 1.04 2.77 1.19 2.96.15.2 2.05 3.28 4.97 4.6.69.3 1.23.48 1.65.62.69.22 1.31.19 1.8.12.55-.08 1.66-.68 1.9-1.33.24-.65.24-1.21.17-1.33-.07-.11-.25-.18-.53-.32z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-800 hover:bg-[#E1306C] rounded-lg flex items-center justify-center transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
  
            {/* Test Series Column */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Test Series</h4>
              <ul className="space-y-3">
                <li>
                  <a href="/pricing" className="text-gray-400 hover:text-white text-sm transition-colors ">
                     
                    Foundation (Free)
                  </a>
                </li>
                <li>
                <a href="/pricing" className="text-gray-400 hover:text-white text-sm transition-colors ">
                    
                    Intermediate (coming soon)
                  </a>
                </li>
                <li>
                  <a href="/pricing" className="text-gray-400 hover:text-white text-sm transition-colors ">
                     
                    Final
                  </a>
                </li>
              </ul>
            </div>
          </div> 
        </div>
  
        {/* Bottom Bar */}
        <div className="bg-gray-950 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-500 text-sm">
                © 2026 Cmatest. All rights reserved.
              </div>
              
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                 
                <div className="mt-4 text-center text-gray-600 text-xs">
                Test series strictly based on the Institute syllabus. We are an independent preparation platform and are not affiliated with the Institute.
            </div>
               
              </div>
            </div>
            
            
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
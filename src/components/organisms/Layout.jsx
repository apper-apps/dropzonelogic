import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-500 rounded-xl flex items-center justify-center">
                <ApperIcon name="CloudUpload" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">DropZone</h1>
                <p className="text-xs text-gray-500">File Uploader</p>
              </div>
            </motion.div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                Features
              </a>
              <a href="#help" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                Help
              </a>
              <a href="#about" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                About
              </a>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-gray-600 hover:text-primary-600 transition-colors">
                <ApperIcon name="Menu" size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="CloudUpload" size={16} className="text-white" />
              </div>
              <span className="text-sm text-gray-600">
                © 2024 DropZone. Built with React + Vite.
              </span>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="#privacy" className="text-xs text-gray-500 hover:text-primary-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-xs text-gray-500 hover:text-primary-600 transition-colors">
                Terms of Service
              </a>
              <a href="#support" className="text-xs text-gray-500 hover:text-primary-600 transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
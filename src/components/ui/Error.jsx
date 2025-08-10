import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[400px] space-y-6 text-center"
    >
      {/* Error Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center"
      >
        <ApperIcon name="AlertTriangle" size={32} className="text-red-600" />
      </motion.div>

      {/* Error Content */}
      <div className="space-y-2 max-w-md">
        <h3 className="text-xl font-semibold text-gray-900">
          Oops! Something went wrong
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {message}
        </p>
        <div className="text-sm text-gray-500 bg-gray-50 rounded-lg px-4 py-3 mt-4">
          <p className="flex items-center gap-2">
            <ApperIcon name="Info" size={16} />
            This might be a temporary issue. Please try again.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {onRetry && (
          <Button variant="primary" onClick={onRetry}>
            <ApperIcon name="RefreshCw" size={16} className="mr-2" />
            Try Again
          </Button>
        )}
        <Button 
          variant="ghost" 
          onClick={() => window.location.reload()}
        >
          <ApperIcon name="RotateCcw" size={16} className="mr-2" />
          Refresh Page
        </Button>
      </div>

      {/* Help Section */}
      <div className="pt-8 border-t border-gray-200 w-full max-w-md">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Need help?</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <a
            href="#support"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 transition-colors p-2 rounded-lg hover:bg-gray-50"
          >
            <ApperIcon name="MessageCircle" size={16} />
            Contact Support
          </a>
          <a
            href="#docs"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 transition-colors p-2 rounded-lg hover:bg-gray-50"
          >
            <ApperIcon name="BookOpen" size={16} />
            View Docs
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default Error
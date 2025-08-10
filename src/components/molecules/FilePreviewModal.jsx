import { motion, AnimatePresence } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import { formatFileSize } from "@/utils/fileHelpers"

const FilePreviewModal = ({ file, isOpen, onClose }) => {
  if (!isOpen || !file) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
        
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center">
                <ApperIcon name="Image" size={20} className="text-primary-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 truncate" title={file.name}>
                  {file.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {formatFileSize(file.size)} • {file.type}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <ApperIcon name="X" size={20} />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6">
            {file.preview ? (
              <div className="flex items-center justify-center bg-gray-50 rounded-xl min-h-[400px]">
                <img
                  src={file.preview}
                  alt={file.name}
                  className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl min-h-[400px] text-gray-500">
                <ApperIcon name="FileText" size={64} className="mb-4" />
                <p className="text-lg font-medium">Preview not available</p>
                <p className="text-sm">This file type doesn't support preview</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
            {file.status === "completed" && (
              <Button variant="primary">
                <ApperIcon name="Download" size={16} className="mr-2" />
                Download
              </Button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default FilePreviewModal
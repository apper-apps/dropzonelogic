import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import ProgressBar from "@/components/atoms/ProgressBar"
import { formatFileSize, formatUploadSpeed, formatTimeRemaining, getFileIcon } from "@/utils/fileHelpers"

const FileCard = ({ file, onRemove, onCancel, onPause, onResume, onPreview }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "completed": return "CheckCircle"
      case "error": return "XCircle"
      case "uploading": return "Upload"
      case "paused": return "Pause"
      case "cancelled": return "X"
      default: return "Clock"
    }
  }
  
  const getStatusVariant = (status) => {
    switch (status) {
      case "completed": return "success"
      case "error": return "error"
      case "uploading": return "primary"
      case "paused": return "warning"
      case "cancelled": return "error"
      default: return "default"
    }
  }
  
  const getProgressVariant = (status) => {
    switch (status) {
      case "completed": return "success"
      case "error": return "error"
      default: return "primary"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-4 border border-gray-100"
    >
      <div className="flex items-start gap-4">
        {/* File Icon/Preview */}
        <div className="flex-shrink-0">
          {file.preview ? (
            <div
              className="w-12 h-12 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => onPreview && onPreview(file)}
            >
              <img
                src={file.preview}
                alt={file.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center">
              <ApperIcon
                name={getFileIcon(file.type)}
                size={24}
                className="text-primary-600"
              />
            </div>
          )}
        </div>

        {/* File Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="min-w-0">
              <h3 className="font-medium text-gray-900 truncate" title={file.name}>
                {file.name}
              </h3>
              <p className="text-sm text-gray-500">
                {formatFileSize(file.size)}
              </p>
            </div>
            <Badge
              variant={getStatusVariant(file.status)}
              icon={getStatusIcon(file.status)}
              size="sm"
            >
              {file.status}
            </Badge>
          </div>

          {/* Progress Bar */}
          {(file.status === "uploading" || file.status === "completed") && (
            <div className="mb-3">
              <ProgressBar
                value={file.progress || 0}
                variant={getProgressVariant(file.status)}
                size="md"
                showValue
              />
            </div>
          )}

          {/* Upload Stats */}
          {file.status === "uploading" && (
            <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
              {file.uploadSpeed && (
                <span className="flex items-center gap-1">
                  <ApperIcon name="Zap" size={12} />
                  {formatUploadSpeed(file.uploadSpeed)}
                </span>
              )}
              {file.timeRemaining && (
                <span className="flex items-center gap-1">
                  <ApperIcon name="Clock" size={12} />
                  {formatTimeRemaining(file.timeRemaining)}
                </span>
              )}
            </div>
          )}

          {/* Error Message */}
          {file.status === "error" && file.error && (
            <div className="mb-3">
              <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
                <ApperIcon name="AlertCircle" size={16} className="inline mr-2" />
                {file.error}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {file.status === "pending" && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onRemove && onRemove(file.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <ApperIcon name="Trash2" size={14} />
                Remove
              </Button>
            )}
            
            {file.status === "uploading" && (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onPause && onPause(file.id)}
                  className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                >
                  <ApperIcon name="Pause" size={14} />
                  Pause
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onCancel && onCancel(file.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <ApperIcon name="X" size={14} />
                  Cancel
                </Button>
              </>
            )}
            
            {file.status === "paused" && (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onResume && onResume(file.id)}
                  className="text-primary-600 hover:text-primary-700 hover:bg-primary-50"
                >
                  <ApperIcon name="Play" size={14} />
                  Resume
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onCancel && onCancel(file.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <ApperIcon name="X" size={14} />
                  Cancel
                </Button>
              </>
            )}
            
            {(file.status === "error" || file.status === "cancelled") && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onRemove && onRemove(file.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <ApperIcon name="Trash2" size={14} />
                Remove
              </Button>
            )}
            
            {file.status === "completed" && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onRemove && onRemove(file.id)}
                className="text-gray-600 hover:text-gray-700 hover:bg-gray-50"
              >
                <ApperIcon name="Trash2" size={14} />
                Remove
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default FileCard
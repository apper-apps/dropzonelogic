import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import { formatFileSize } from "@/utils/fileHelpers"

const UploadSummary = ({ files, onClearAll, onUploadAll }) => {
  const totalFiles = files.length
  const completedFiles = files.filter(f => f.status === "completed").length
  const failedFiles = files.filter(f => f.status === "error" || f.status === "cancelled").length
  const uploadingFiles = files.filter(f => f.status === "uploading").length
  const pendingFiles = files.filter(f => f.status === "pending").length
  
  const totalSize = files.reduce((acc, file) => acc + file.size, 0)
  
  if (totalFiles === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Upload Summary</h2>
        <div className="flex items-center gap-2">
          {pendingFiles > 0 && (
            <Button
              variant="primary"
              size="sm"
              onClick={onUploadAll}
            >
              <ApperIcon name="Upload" size={16} className="mr-2" />
              Upload All ({pendingFiles})
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <ApperIcon name="Trash2" size={16} className="mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold gradient-text">{totalFiles}</div>
          <div className="text-sm text-gray-500">Total Files</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-success-600">{completedFiles}</div>
          <div className="text-sm text-gray-500">Completed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary-600">{uploadingFiles}</div>
          <div className="text-sm text-gray-500">Uploading</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{failedFiles}</div>
          <div className="text-sm text-gray-500">Failed</div>
        </div>
      </div>

      {/* Status Badges */}
      <div className="flex flex-wrap gap-3 mb-4">
        <Badge variant="default" icon="Files">
          {formatFileSize(totalSize)} total
        </Badge>
        {completedFiles > 0 && (
          <Badge variant="success" icon="CheckCircle">
            {completedFiles} completed
          </Badge>
        )}
        {uploadingFiles > 0 && (
          <Badge variant="primary" icon="Upload">
            {uploadingFiles} uploading
          </Badge>
        )}
        {pendingFiles > 0 && (
          <Badge variant="warning" icon="Clock">
            {pendingFiles} pending
          </Badge>
        )}
        {failedFiles > 0 && (
          <Badge variant="error" icon="XCircle">
            {failedFiles} failed
          </Badge>
        )}
      </div>

      {/* Progress Overview */}
      {totalFiles > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Overall Progress</span>
            <span>{Math.round((completedFiles / totalFiles) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-500 to-success-500 rounded-full transition-all duration-300"
              initial={{ width: 0 }}
              animate={{ width: `${(completedFiles / totalFiles) * 100}%` }}
            />
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default UploadSummary
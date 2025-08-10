import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Empty = ({ 
  title = "No files uploaded yet", 
  description = "Start by uploading your first file using the drop zone above",
  actionText = "Upload Files",
  onAction,
  icon = "Upload"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[300px] space-y-6 text-center p-8"
    >
      {/* Empty State Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center"
      >
        <ApperIcon name={icon} size={40} className="text-gray-400" />
      </motion.div>

      {/* Empty Content */}
      <div className="space-y-2 max-w-sm">
        <h3 className="text-xl font-semibold text-gray-900">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Call to Action */}
      {onAction && (
        <Button variant="primary" size="lg" onClick={onAction}>
          <ApperIcon name="Plus" size={20} className="mr-2" />
          {actionText}
        </Button>
      )}

      {/* Features Highlight */}
      <div className="pt-8 border-t border-gray-100 w-full max-w-sm">
        <h4 className="text-sm font-medium text-gray-700 mb-4">What you can do:</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
              <ApperIcon name="MousePointer" size={12} className="text-primary-600" />
            </div>
            <span>Drag & drop multiple files at once</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="w-6 h-6 bg-success-100 rounded-full flex items-center justify-center flex-shrink-0">
              <ApperIcon name="Eye" size={12} className="text-success-600" />
            </div>
            <span>Preview images before uploading</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <div className="w-6 h-6 bg-secondary-100 rounded-full flex items-center justify-center flex-shrink-0">
              <ApperIcon name="BarChart3" size={12} className="text-secondary-600" />
            </div>
            <span>Track upload progress in real-time</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Empty
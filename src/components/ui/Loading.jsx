import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
      {/* Animated Upload Icon */}
      <motion.div
        animate={{
          y: [-4, 4, -4],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-lg"
      >
        <ApperIcon name="CloudUpload" size={32} className="text-white" />
      </motion.div>

      {/* Loading Text */}
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">
          Setting up your upload zone...
        </h3>
        <p className="text-gray-600">
          Please wait while we prepare everything for you
        </p>
      </div>

      {/* Progress Animation */}
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Loading Skeleton */}
      <div className="w-full max-w-2xl space-y-4 pt-8">
        <div className="animate-pulse space-y-4">
          {/* Drop zone skeleton */}
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 space-y-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-48 mx-auto" />
              <div className="h-3 bg-gray-200 rounded w-32 mx-auto" />
            </div>
            <div className="h-10 bg-gray-200 rounded-lg w-32 mx-auto" />
          </div>
          
          {/* File cards skeleton */}
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/4" />
                    <div className="h-2 bg-gray-200 rounded w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading
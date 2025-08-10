import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import { formatFileSize } from "@/utils/fileHelpers"

const CompressionPanel = ({ 
  isOpen, 
  onToggle, 
  quality, 
  onQualityChange, 
  files,
  originalTotalSize,
  compressedTotalSize 
}) => {
  const [isAdvancedMode, setIsAdvancedMode] = useState(false)

  const getQualityLabel = (value) => {
    if (value >= 90) return "Maximum"
    if (value >= 70) return "High"
    if (value >= 50) return "Medium"
    if (value >= 30) return "Low"
    return "Minimum"
  }

  const getCompressionRatio = () => {
    if (!originalTotalSize || originalTotalSize === 0) return 0
    return Math.round(((originalTotalSize - compressedTotalSize) / originalTotalSize) * 100)
  }

  const getSavings = () => {
    return originalTotalSize - compressedTotalSize
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
            <ApperIcon name="Settings" size={20} className="text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Compression Settings</h3>
            <p className="text-sm text-gray-500">Optimize file sizes before upload</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="text-gray-500 hover:text-gray-700"
        >
          <ApperIcon name={isOpen ? "ChevronUp" : "ChevronDown"} size={16} />
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 space-y-6">
              {/* Quality Slider */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium text-gray-700">
                    Compression Quality
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{quality}%</span>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {getQualityLabel(quality)}
                    </span>
                  </div>
                </div>
                
                <div className="relative">
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={quality}
                    onChange={(e) => onQualityChange(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, 
                        #ef4444 0%, #f97316 20%, #eab308 40%, 
                        #22c55e 60%, #3b82f6 80%, #6366f1 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>Smaller files</span>
                    <span>Better quality</span>
                  </div>
                </div>
              </div>

              {/* Compression Preview */}
              {files.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <ApperIcon name="BarChart3" size={16} />
                    Compression Preview
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">
                        {formatFileSize(originalTotalSize)}
                      </div>
                      <div className="text-xs text-gray-500">Original Size</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-lg font-semibold text-green-600">
                        {formatFileSize(compressedTotalSize)}
                      </div>
                      <div className="text-xs text-gray-500">Compressed Size</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-lg font-semibold text-blue-600">
                        {getCompressionRatio()}%
                      </div>
                      <div className="text-xs text-gray-500">Size Reduction</div>
                    </div>
                  </div>

                  {getSavings() > 0 && (
                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 text-sm text-green-700">
                        <ApperIcon name="TrendingDown" size={16} />
                        <span>You'll save {formatFileSize(getSavings())} of bandwidth</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Advanced Settings Toggle */}
              <div className="border-t border-gray-100 pt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAdvancedMode(!isAdvancedMode)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <ApperIcon name="Settings2" size={14} className="mr-2" />
                  Advanced Settings
                  <ApperIcon 
                    name={isAdvancedMode ? "ChevronUp" : "ChevronDown"} 
                    size={14} 
                    className="ml-2" 
                  />
                </Button>

                <AnimatePresence>
                  {isAdvancedMode && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 space-y-4 overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-medium text-gray-600 mb-2 block">
                            Image Format
                          </label>
                          <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="webp">WebP (Recommended)</option>
                            <option value="jpeg">JPEG</option>
                            <option value="png">PNG (Lossless)</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="text-xs font-medium text-gray-600 mb-2 block">
                            Max Dimension
                          </label>
                          <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="original">Keep Original</option>
                            <option value="1920">1920px</option>
                            <option value="1280">1280px</option>
                            <option value="800">800px</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <ApperIcon name="Info" size={16} className="text-blue-600 flex-shrink-0" />
                        <p className="text-xs text-blue-700">
                          Advanced settings apply to image files only. Videos and other file types use smart compression algorithms.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CompressionPanel
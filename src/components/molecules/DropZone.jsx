import { useState, useRef } from "react"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import { cn } from "@/utils/cn"

const DropZone = ({ onFilesAdded, acceptedTypes, maxFileSize, className }) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [isDragActive, setIsDragActive] = useState(false)
  const fileInputRef = useRef(null)

  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.currentTarget === e.target) {
      setIsDragOver(false)
      setIsDragActive(false)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(true)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
    setIsDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0 && onFilesAdded) {
      onFilesAdded(files)
    }
  }

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0 && onFilesAdded) {
      onFilesAdded(files)
    }
    // Reset input value to allow re-uploading the same file
    e.target.value = ""
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  const formatAcceptedTypes = () => {
    if (!acceptedTypes || acceptedTypes.length === 0) return "any file type"
    return acceptedTypes.join(", ")
  }

  return (
    <div
      className={cn(
        "relative border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer",
        "hover:border-primary-400 hover:bg-primary-25",
        isDragOver && "drop-zone-active",
        className
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={openFileDialog}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileInput}
        className="hidden"
        accept={acceptedTypes?.map(type => `${type}/*`).join(",")}
      />
      
      <motion.div
        animate={{
          scale: isDragActive ? 1.02 : 1,
          opacity: isDragActive ? 0.8 : 1
        }}
        transition={{ duration: 0.2 }}
        className="flex flex-col items-center justify-center gap-6"
      >
        {/* Icon */}
        <motion.div
          animate={{
            y: isDragActive ? -4 : 0,
            rotate: isDragActive ? 5 : 0
          }}
          className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300",
            isDragOver 
              ? "bg-gradient-to-br from-primary-500 to-secondary-500" 
              : "bg-gradient-to-br from-primary-100 to-secondary-100"
          )}
        >
          <ApperIcon
            name={isDragActive ? "Upload" : "CloudUpload"}
            size={32}
            className={cn(
              "transition-colors duration-300",
              isDragOver ? "text-white" : "text-primary-600"
            )}
          />
        </motion.div>

        {/* Main Text */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900">
            {isDragActive ? "Drop files here" : "Drag & drop files here"}
          </h3>
          <p className="text-gray-600">
            or <span className="text-primary-600 font-medium">browse</span> to choose files
          </p>
        </div>

        {/* File Info */}
        <div className="space-y-1 text-sm text-gray-500">
          <p>Supports: {formatAcceptedTypes()}</p>
          {maxFileSize && (
            <p>Max file size: {(maxFileSize / (1024 * 1024)).toFixed(0)}MB</p>
          )}
        </div>

        {/* Button */}
        <Button 
          variant="primary"
          size="lg"
          className="mt-2"
          onClick={(e) => {
            e.stopPropagation()
            openFileDialog()
          }}
        >
          <ApperIcon name="Plus" size={20} className="mr-2" />
          Select Files
        </Button>
      </motion.div>

      {/* Drag overlay */}
      {isDragOver && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-primary-500 bg-opacity-5 rounded-2xl flex items-center justify-center"
        >
          <div className="text-primary-600 font-medium text-lg">
            Release to upload files
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default DropZone
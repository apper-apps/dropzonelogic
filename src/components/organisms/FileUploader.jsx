import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-toastify"
import DropZone from "@/components/molecules/DropZone"
import FileCard from "@/components/molecules/FileCard"
import UploadSummary from "@/components/molecules/UploadSummary"
import FilePreviewModal from "@/components/molecules/FilePreviewModal"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import fileService from "@/services/api/fileService"
import { validateFile, createFilePreview } from "@/utils/fileHelpers"

const FileUploader = () => {
  const [files, setFiles] = useState([])
  const [uploadConfig, setUploadConfig] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [previewFile, setPreviewFile] = useState(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  // Load upload configuration
  useEffect(() => {
    const loadConfig = async () => {
      try {
        setError("")
        setLoading(true)
        const config = await fileService.getUploadConfig()
        setUploadConfig(config)
      } catch (err) {
        setError(err.message || "Failed to load upload configuration")
      } finally {
        setLoading(false)
      }
    }

    loadConfig()
  }, [])

  const generateFileId = () => {
    return `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  const addFiles = async (newFiles) => {
    if (!uploadConfig) return

    const processedFiles = []
    
    for (const file of newFiles) {
      const fileId = generateFileId()
      const validationErrors = validateFile(file, uploadConfig)
      
      if (validationErrors.length > 0) {
        toast.error(`${file.name}: ${validationErrors.join(", ")}`)
        continue
      }

      const preview = await createFilePreview(file)
      
      const processedFile = {
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        status: "pending",
        progress: 0,
        uploadSpeed: 0,
        timeRemaining: 0,
        error: "",
        preview: preview,
        originalFile: file
      }
      
      processedFiles.push(processedFile)
    }

    if (processedFiles.length > 0) {
      setFiles(prev => [...prev, ...processedFiles])
      toast.success(`Added ${processedFiles.length} file(s) to queue`)
    }
  }

  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(file => file.id !== fileId))
  }

  const updateFileStatus = (fileId, updates) => {
    setFiles(prev => prev.map(file => 
      file.id === fileId ? { ...file, ...updates } : file
    ))
  }

  const uploadFile = async (file) => {
    updateFileStatus(file.id, { 
      status: "uploading", 
      progress: 0, 
      error: "" 
    })

    try {
      await fileService.simulateFileUpload(
        file.id,
        ({ progress, uploadSpeed, timeRemaining }) => {
          updateFileStatus(file.id, {
            progress,
            uploadSpeed,
            timeRemaining
          })
        }
      )

      updateFileStatus(file.id, { 
        status: "completed", 
        progress: 100,
        uploadSpeed: 0,
        timeRemaining: 0
      })
      
      toast.success(`${file.name} uploaded successfully`)
    } catch (err) {
      updateFileStatus(file.id, { 
        status: "error", 
        error: err.message,
        uploadSpeed: 0,
        timeRemaining: 0
      })
      
      toast.error(`Failed to upload ${file.name}: ${err.message}`)
    }
  }

  const uploadAll = async () => {
    const pendingFiles = files.filter(file => file.status === "pending")
    
    if (pendingFiles.length === 0) {
      toast.info("No files to upload")
      return
    }

    // Upload files with concurrency limit
    const concurrent = uploadConfig?.concurrent || 3
    
    for (let i = 0; i < pendingFiles.length; i += concurrent) {
      const batch = pendingFiles.slice(i, i + concurrent)
      await Promise.allSettled(batch.map(file => uploadFile(file)))
    }
  }

  const cancelUpload = async (fileId) => {
    try {
      await fileService.cancelUpload(fileId)
      updateFileStatus(fileId, { 
        status: "cancelled", 
        error: "Upload cancelled by user",
        uploadSpeed: 0,
        timeRemaining: 0
      })
      toast.info("Upload cancelled")
    } catch (err) {
      toast.error("Failed to cancel upload")
    }
  }

  const pauseUpload = async (fileId) => {
    try {
      await fileService.pauseUpload(fileId)
      updateFileStatus(fileId, { 
        status: "paused",
        uploadSpeed: 0,
        timeRemaining: 0
      })
      toast.info("Upload paused")
    } catch (err) {
      toast.error("Failed to pause upload")
    }
  }

  const resumeUpload = async (fileId) => {
    const file = files.find(f => f.id === fileId)
    if (!file) return

    updateFileStatus(fileId, { 
      status: "uploading", 
      error: "" 
    })

    try {
      await fileService.resumeUpload(
        fileId,
        file.progress,
        ({ progress, uploadSpeed, timeRemaining }) => {
          updateFileStatus(fileId, {
            progress,
            uploadSpeed,
            timeRemaining
          })
        }
      )

      updateFileStatus(fileId, { 
        status: "completed", 
        progress: 100,
        uploadSpeed: 0,
        timeRemaining: 0
      })
      
      toast.success(`${file.name} uploaded successfully`)
    } catch (err) {
      updateFileStatus(fileId, { 
        status: "error", 
        error: err.message,
        uploadSpeed: 0,
        timeRemaining: 0
      })
      
      toast.error(`Failed to resume ${file.name}: ${err.message}`)
    }
  }

  const clearAll = () => {
    setFiles([])
    toast.info("All files removed")
  }

  const openPreview = (file) => {
    setPreviewFile(file)
    setIsPreviewOpen(true)
  }

  const closePreview = () => {
    setIsPreviewOpen(false)
    setPreviewFile(null)
  }

  const retry = () => {
    const loadConfig = async () => {
      try {
        setError("")
        setLoading(true)
        const config = await fileService.getUploadConfig()
        setUploadConfig(config)
      } catch (err) {
        setError(err.message || "Failed to load upload configuration")
      } finally {
        setLoading(false)
      }
    }

    loadConfig()
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} onRetry={retry} />
  }

  if (!uploadConfig) {
    return <Empty 
      title="Configuration Missing"
      description="Upload configuration could not be loaded"
      actionText="Retry"
      onAction={retry}
    />
  }

  return (
    <div className="space-y-8">
      {/* Drop Zone */}
      <DropZone
        onFilesAdded={addFiles}
        acceptedTypes={uploadConfig.allowedTypes}
        maxFileSize={uploadConfig.maxFileSize}
      />

      {/* Upload Summary */}
      {files.length > 0 && (
        <UploadSummary
          files={files}
          onClearAll={clearAll}
          onUploadAll={uploadAll}
        />
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Files ({files.length})
          </h2>
          <AnimatePresence>
            {files.map(file => (
              <FileCard
                key={file.id}
                file={file}
                onRemove={removeFile}
                onCancel={cancelUpload}
                onPause={pauseUpload}
                onResume={resumeUpload}
                onPreview={openPreview}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* File Preview Modal */}
      <FilePreviewModal
        file={previewFile}
        isOpen={isPreviewOpen}
        onClose={closePreview}
      />
    </div>
  )
}

export default FileUploader
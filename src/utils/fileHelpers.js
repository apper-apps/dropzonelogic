export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes"
  
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export const formatUploadSpeed = (bytesPerSecond) => {
  if (!bytesPerSecond || bytesPerSecond === 0) return "0 KB/s"
  
  const k = 1024
  const sizes = ["B/s", "KB/s", "MB/s", "GB/s"]
  const i = Math.floor(Math.log(bytesPerSecond) / Math.log(k))
  
  return parseFloat((bytesPerSecond / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
}

export const formatTimeRemaining = (seconds) => {
  if (!seconds || seconds === Infinity) return "Calculating..."
  
  if (seconds < 60) return `${Math.round(seconds)}s`
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`
  
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.round((seconds % 3600) / 60)
  return `${hours}h ${minutes}m`
}

export const getFileIcon = (fileType) => {
  const type = fileType.toLowerCase()
  
  if (type.includes("image")) return "Image"
  if (type.includes("video")) return "Video"
  if (type.includes("audio")) return "Music"
  if (type.includes("pdf")) return "FileText"
  if (type.includes("word") || type.includes("document")) return "FileText"
  if (type.includes("excel") || type.includes("spreadsheet")) return "FileSpreadsheet"
  if (type.includes("powerpoint") || type.includes("presentation")) return "FileImage"
  if (type.includes("zip") || type.includes("rar") || type.includes("archive")) return "Archive"
  if (type.includes("text")) return "FileText"
  if (type.includes("json") || type.includes("xml")) return "Code"
  
  return "File"
}

export const isImageFile = (fileType) => {
  return fileType.toLowerCase().includes("image")
}

export const createFilePreview = (file) => {
  return new Promise((resolve) => {
    if (!isImageFile(file.type)) {
      resolve(null)
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target.result)
    reader.onerror = () => resolve(null)
    reader.readAsDataURL(file)
  })
}

export const validateFile = (file, config) => {
  const errors = []
  
  if (file.size > config.maxFileSize) {
    errors.push(`File size exceeds ${formatFileSize(config.maxFileSize)}`)
  }
  
  if (config.allowedTypes.length > 0 && !config.allowedTypes.some(type => file.type.includes(type))) {
    errors.push("File type not allowed")
  }
  
  return errors
}
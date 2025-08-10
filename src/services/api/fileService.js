import configData from "@/services/mockData/uploadConfig.json"

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class FileService {
  constructor() {
    this.uploadConfig = configData
  }

  async getUploadConfig() {
    await delay(200)
    return { ...this.uploadConfig }
  }

  async simulateFileUpload(fileId, onProgress) {
    const totalChunks = 100
    let uploadedChunks = 0
    const startTime = Date.now()

    return new Promise((resolve, reject) => {
      const uploadInterval = setInterval(() => {
        uploadedChunks += Math.random() * 3 + 1
        
        if (uploadedChunks >= totalChunks) {
          uploadedChunks = totalChunks
          clearInterval(uploadInterval)
          
          // Simulate occasional failures (10% chance)
          if (Math.random() < 0.1) {
            reject(new Error("Upload failed due to network error"))
            return
          }
          
          resolve({
            id: fileId,
            status: "completed",
            url: `https://cdn.example.com/uploads/${fileId}`,
            uploadedAt: new Date().toISOString()
          })
          return
        }

        const progress = Math.min(uploadedChunks / totalChunks * 100, 100)
        const elapsedTime = (Date.now() - startTime) / 1000
        const uploadSpeed = (uploadedChunks / totalChunks * 10485760) / elapsedTime // Simulate 10MB file
        const remainingTime = elapsedTime * (totalChunks - uploadedChunks) / uploadedChunks

        if (onProgress) {
          onProgress({
            progress: Math.round(progress),
            uploadSpeed: Math.round(uploadSpeed),
            timeRemaining: Math.round(remainingTime)
          })
        }
      }, 100 + Math.random() * 200) // Variable interval to simulate real network

      // Store interval reference for potential cancellation
      this.activeUploads = this.activeUploads || new Map()
      this.activeUploads.set(fileId, uploadInterval)
    })
  }

  async cancelUpload(fileId) {
    await delay(100)
    
    if (this.activeUploads && this.activeUploads.has(fileId)) {
      clearInterval(this.activeUploads.get(fileId))
      this.activeUploads.delete(fileId)
    }
    
    return {
      id: fileId,
      status: "cancelled",
      message: "Upload cancelled by user"
    }
  }

  async pauseUpload(fileId) {
    await delay(100)
    
    if (this.activeUploads && this.activeUploads.has(fileId)) {
      clearInterval(this.activeUploads.get(fileId))
      this.activeUploads.delete(fileId)
    }
    
    return {
      id: fileId,
      status: "paused",
      message: "Upload paused"
    }
  }

  async resumeUpload(fileId, currentProgress, onProgress) {
    await delay(200)
    
    // Resume from current progress
    const totalChunks = 100
    let uploadedChunks = (currentProgress / 100) * totalChunks
    const startTime = Date.now()

    return new Promise((resolve, reject) => {
      const uploadInterval = setInterval(() => {
        uploadedChunks += Math.random() * 3 + 1
        
        if (uploadedChunks >= totalChunks) {
          uploadedChunks = totalChunks
          clearInterval(uploadInterval)
          
          resolve({
            id: fileId,
            status: "completed",
            url: `https://cdn.example.com/uploads/${fileId}`,
            uploadedAt: new Date().toISOString()
          })
          return
        }

        const progress = Math.min(uploadedChunks / totalChunks * 100, 100)
        const elapsedTime = (Date.now() - startTime) / 1000
        const uploadSpeed = (uploadedChunks / totalChunks * 10485760) / elapsedTime
        const remainingTime = elapsedTime * (totalChunks - uploadedChunks) / uploadedChunks

        if (onProgress) {
          onProgress({
            progress: Math.round(progress),
            uploadSpeed: Math.round(uploadSpeed),
            timeRemaining: Math.round(remainingTime)
          })
        }
      }, 100 + Math.random() * 200)

      this.activeUploads = this.activeUploads || new Map()
      this.activeUploads.set(fileId, uploadInterval)
    })
  }
}

export default new FileService()
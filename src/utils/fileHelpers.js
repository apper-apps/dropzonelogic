export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
export const formatUploadSpeed = (bytesPerSecond) => {
  if (!bytesPerSecond || bytesPerSecond === 0) return "0 KB/s";
  
  const k = 1024;
  const sizes = ["B/s", "KB/s", "MB/s", "GB/s"];
  const i = Math.floor(Math.log(bytesPerSecond) / Math.log(k));
  
  return parseFloat((bytesPerSecond / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export const formatTimeRemaining = (seconds) => {
  if (!seconds || seconds === Infinity) return "Calculating...";
  
  if (seconds < 60) return `${Math.round(seconds)}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.round((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}

export const getFileIcon = (fileType) => {
  const type = fileType.toLowerCase();
  
  if (type.includes("image")) return "Image";
  if (type.includes("video")) return "Video";
  if (type.includes("audio")) return "Music";
  if (type.includes("pdf")) return "FileText";
  if (type.includes("word") || type.includes("document")) return "FileText";
  if (type.includes("excel") || type.includes("spreadsheet")) return "FileSpreadsheet";
  if (type.includes("powerpoint") || type.includes("presentation")) return "FileImage";
  if (type.includes("zip") || type.includes("rar") || type.includes("archive")) return "Archive";
  if (type.includes("text")) return "FileText";
  if (type.includes("json") || type.includes("xml")) return "Code";
  
  return "File";
}

export const isImageFile = (fileType) => {
  return fileType.toLowerCase().includes("image");
}

export const createFilePreview = (file) => {
  return new Promise((resolve) => {
    if (!isImageFile(file.type)) {
      resolve(null);
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
}

export const validateFile = (file, config) => {
  const errors = [];
  
  if (file.size > config.maxFileSize) {
    errors.push(`File size exceeds ${formatFileSize(config.maxFileSize)}`);
  }
  
  if (config.allowedTypes.length > 0 && !config.allowedTypes.some(type => file.type.includes(type))) {
    errors.push("File type not allowed");
  }
  
  return errors;
}

export const compressFile = (file, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      resolve(file);
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Set canvas dimensions
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw and compress
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob((blob) => {
        if (blob) {
          // Create a new File object with the same name and type
          // Check if File constructor is available (browser environment)
          if (typeof File !== 'undefined') {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now()
            });
            resolve(compressedFile);
          } else {
            // Fallback for environments without File constructor
            const compressedFile = new Blob([blob], { type: file.type });
            compressedFile.name = file.name;
            compressedFile.lastModified = Date.now();
            resolve(compressedFile);
          }
        } else {
          reject(new Error('Compression failed'));
        }
      }, file.type, quality / 100);
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
}

export const estimateCompressedSize = (file, quality = 80) => {
  return new Promise((resolve) => {
    if (!file.type.startsWith('image/')) {
      resolve(file.size);
      return;
    }

    // Rough estimation based on quality
    const qualityFactor = quality / 100;
    let estimatedRatio;

    if (file.type === 'image/jpeg') {
      // JPEG already compressed, modest savings
      estimatedRatio = 0.7 + (qualityFactor * 0.25);
    } else if (file.type === 'image/png') {
      // PNG can compress significantly when converted to JPEG
      estimatedRatio = 0.3 + (qualityFactor * 0.4);
    } else {
      // Other formats
      estimatedRatio = 0.5 + (qualityFactor * 0.3);
    }

    const estimatedSize = Math.round(file.size * estimatedRatio);
    resolve(estimatedSize);
  });
}

export const getCompressionInfo = (originalSize, compressedSize) => {
  const savings = originalSize - compressedSize;
  const ratio = originalSize > 0 ? Math.round((savings / originalSize) * 100) : 0;
  
  return {
    savings,
    ratio,
    savingsFormatted: formatFileSize(savings),
    originalFormatted: formatFileSize(originalSize),
    compressedFormatted: formatFileSize(compressedSize)
  };
}

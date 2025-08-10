import { motion } from "framer-motion"
import FileUploader from "@/components/organisms/FileUploader"
import ApperIcon from "@/components/ApperIcon"

const HomePage = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4 max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Upload Files with{" "}
          <span className="gradient-text">Confidence</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Drag, drop, and upload your files effortlessly. Track progress in real-time 
          with our modern, intuitive file uploader.
        </p>
        
        {/* Features highlight */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 pt-4">
          <div className="flex items-center gap-2">
            <ApperIcon name="Zap" size={16} className="text-primary-500" />
            <span>Lightning fast</span>
          </div>
          <div className="flex items-center gap-2">
            <ApperIcon name="Shield" size={16} className="text-success-500" />
            <span>Secure uploads</span>
          </div>
          <div className="flex items-center gap-2">
            <ApperIcon name="Smartphone" size={16} className="text-secondary-500" />
            <span>Mobile friendly</span>
          </div>
          <div className="flex items-center gap-2">
            <ApperIcon name="Files" size={16} className="text-primary-500" />
            <span>Batch uploads</span>
          </div>
        </div>
      </motion.div>

      {/* File Uploader */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <FileUploader />
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="grid md:grid-cols-3 gap-8 pt-16"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center">
            <ApperIcon name="MousePointer" size={32} className="text-primary-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Drag & Drop</h3>
          <p className="text-gray-600">
            Simply drag your files into the upload zone or click to browse. 
            It's that easy.
          </p>
        </div>

        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-success-100 to-success-200 rounded-2xl flex items-center justify-center">
            <ApperIcon name="BarChart3" size={32} className="text-success-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Real-time Progress</h3>
          <p className="text-gray-600">
            Track upload progress with detailed stats including speed and 
            time remaining.
          </p>
        </div>

        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-secondary-100 to-primary-100 rounded-2xl flex items-center justify-center">
            <ApperIcon name="CheckCircle2" size={32} className="text-secondary-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Smart Validation</h3>
          <p className="text-gray-600">
            Automatic file type and size validation to ensure only 
            supported files are uploaded.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default HomePage
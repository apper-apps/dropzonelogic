import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const ProgressBar = forwardRef(({ 
  className, 
  value = 0, 
  max = 100,
  size = "md",
  variant = "primary",
  showValue = false,
  ...props 
}, ref) => {
  const percentage = Math.min(Math.max(value, 0), max) / max * 100
  
  const baseStyles = "w-full bg-gray-200 rounded-full overflow-hidden"
  
  const sizes = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3"
  }
  
  const variants = {
    primary: "progress-bar",
    success: "bg-gradient-to-r from-success-500 to-success-600",
    warning: "bg-gradient-to-r from-yellow-500 to-orange-500",
    error: "bg-gradient-to-r from-red-500 to-red-600"
  }
  
  return (
    <div className="flex items-center gap-3">
      <div
        ref={ref}
        className={cn(baseStyles, sizes[size], className)}
        {...props}
      >
        <div
          className={cn("h-full transition-all duration-300 ease-out", variants[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showValue && (
        <span className="text-sm font-medium text-gray-700 min-w-[3rem] text-right">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  )
})

ProgressBar.displayName = "ProgressBar"

export default ProgressBar
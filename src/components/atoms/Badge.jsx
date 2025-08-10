import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Badge = forwardRef(({ 
  className, 
  variant = "default", 
  size = "md", 
  children,
  icon,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center gap-1 rounded-full font-medium transition-all duration-200"
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-800",
    success: "bg-gradient-to-r from-success-100 to-success-200 text-success-800",
    warning: "bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800",
    error: "bg-gradient-to-r from-red-100 to-red-200 text-red-800",
    info: "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800"
  }
  
  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base"
  }
  
  return (
    <span
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {icon && <ApperIcon name={icon} size={size === "sm" ? 12 : size === "md" ? 14 : 16} />}
      {children}
    </span>
  )
})

Badge.displayName = "Badge"

export default Badge
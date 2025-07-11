/**
 * Safe date formatting utility that handles various edge cases
 */

export const safeDateFormat = (dateInput, options = {}) => {
  const defaultOptions = {
    showTime: false,
    fallback: "Date not available",
    format: "en-US"
  }
  
  const config = { ...defaultOptions, ...options }
  
  try {
    // Handle null, undefined, or empty values
    if (!dateInput) {
      return config.fallback
    }
    
    // Handle already formatted strings that might be passed
    if (typeof dateInput === 'string' && dateInput.includes('Invalid')) {
      return config.fallback
    }
    
    // Create date object
    const date = new Date(dateInput)
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.warn("Invalid date provided:", dateInput)
      return "Invalid date"
    }
    
    // Format the date
    const dateOptions = { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    }
    
    const formattedDate = date.toLocaleDateString(config.format, dateOptions)
    
    if (!config.showTime) {
      return formattedDate
    }
    
    // Add time if requested
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const period = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12 // Convert 0 to 12 for 12 AM
    const formattedTime = `${displayHour}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`
    
    return `${formattedDate} | ${formattedTime}`
    
  } catch (error) {
    console.error("Error in safeDateFormat:", error, "Input:", dateInput)
    return "Date format error"
  }
}

// Convenience functions for common use cases
export const formatCourseDate = (dateInput) => {
  return safeDateFormat(dateInput, { showTime: true })
}

export const formatProfileDate = (dateInput) => {
  return safeDateFormat(dateInput, { showTime: false })
}

// Legacy compatibility
export const formatDate = formatCourseDate
export const formattedDate = formatProfileDate

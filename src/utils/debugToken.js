// Utility to test JWT token validity
import jwt from 'jsonwebtoken'

export const debugToken = (token) => {
  try {
    console.log("=== TOKEN DEBUG ===")
    console.log("Raw token:", token)
    console.log("Token type:", typeof token)
    console.log("Token length:", token?.length)
    
    if (token) {
      // Try to decode without verification first
      const decoded = jwt.decode(token)
      console.log("Decoded token (no verification):", decoded)
      
      // Check if token is expired
      if (decoded?.exp) {
        const now = Date.now() / 1000
        const isExpired = decoded.exp < now
        console.log("Token expires at:", new Date(decoded.exp * 1000))
        console.log("Current time:", new Date())
        console.log("Is token expired:", isExpired)
      }
    }
  } catch (error) {
    console.log("Token debug error:", error)
  }
}

// Utility functions for category name transformations

/**
 * Transforms a category name to URL-friendly format
 * Example: "AI/ML" -> "ai-ml", "Web Development" -> "web-development"
 */
export const categoryNameToUrlPath = (categoryName) => {
  return categoryName
    .replace(/\//g, "-") // Replace slashes with dashes
    .split(" ")
    .join("-")
    .toLowerCase()
}

/**
 * Finds a category by its URL path
 */
export const findCategoryByUrlPath = (categories, urlPath) => {
  return categories.find(category => 
    categoryNameToUrlPath(category.name) === urlPath
  )
}

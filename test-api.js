// Test script to verify the LECTURE_COMPLETION_API
// Run this in browser console or as a separate script

const testAPI = async () => {
  const BASE_URL = "http://localhost:4000/api/v1";
  
  try {
    // Test 1: Check if server is running
    console.log("Testing server connection...");
    const healthResponse = await fetch(`${BASE_URL}/course/getAllCourses`);
    console.log("Server status:", healthResponse.status);
    
    // Test 2: Test the lecture completion API with mock data
    console.log("Testing LECTURE_COMPLETION_API...");
    const testData = {
      courseId: "test-course-id",
      subSectionId: "test-subsection-id"
    };
    
    const response = await fetch(`${BASE_URL}/course/updateCourseProgress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your-token-here'
      },
      body: JSON.stringify(testData)
    });
    
    const result = await response.json();
    console.log("API Response:", result);
    console.log("Status:", response.status);
    
  } catch (error) {
    console.error("Test failed:", error);
  }
};

// Uncomment the line below to run the test
// testAPI();

console.log("Copy and paste this code in your browser console to test the API");
console.log("Don't forget to replace 'your-token-here' with a valid JWT token");

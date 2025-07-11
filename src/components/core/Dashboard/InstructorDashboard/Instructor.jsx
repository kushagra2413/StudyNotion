import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI"
import { getInstructorData } from "../../../../services/operations/profileAPI"
import { ACCOUNT_TYPE } from "../../../../utils/constants"
import InstructorChart from "./InstructorChart"
import InstructorOnlyWrapper from "../../../common/InstructorOnlyWrapper"

export default function Instructor() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [loading, setLoading] = useState(false)
  const [instructorData, setInstructorData] = useState(null)
  const [courses, setCourses] = useState([])

  useEffect(() => {
    // Only fetch data if user is an instructor
    if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      ;(async () => {
        setLoading(true)
        try {
          const instructorApiData = await getInstructorData(token, user?.accountType)
          const result = await fetchInstructorCourses(token, user?.accountType)
          
          // Set instructor data with fallback
          if (instructorApiData && instructorApiData.length > 0) {
            setInstructorData(instructorApiData)
          } else if (result && result.length > 0) {
            // If no instructor data but we have courses, create mock data
            const mockInstructorData = result.map(course => ({
              courseName: course.courseName,
              totalStudentsEnrolled: course.studentsEnrolled?.length || 0,
              totalAmountGenerated: course.price * (course.studentsEnrolled?.length || 0) || 0,
              _id: course._id
            }))
            setInstructorData(mockInstructorData)
          }
          
          if (result) {
            setCourses(result)
          }
        } catch (error) {
          console.error("Error fetching instructor data:", error)
        } finally {
          setLoading(false)
        }
      })()
    }
  }, [user, token])

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + (curr.totalAmountGenerated || 0),
    0
  ) || 0

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + (curr.totalStudentsEnrolled || 0),
    0
  ) || 0

  return (
    <InstructorOnlyWrapper>
      <div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-richblack-5">
            Hi {user?.firstName} 👋
          </h1>
          <p className="font-medium text-richblack-200">
            Let's start something new
          </p>
        </div>
        {loading ? (
          <div className="spinner"></div>
        ) : courses?.length > 0 ? (
          <div>
            <div className="my-4 flex h-[450px] space-x-4">
              {/* Render chart / graph */}
              {instructorData && instructorData.length > 0 && courses.length > 0 ? (
                <InstructorChart courses={instructorData} />
              ) : (
                <div className="flex-1 rounded-md bg-richblack-800 p-6 border border-richblack-700">
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                    {/* Icon */}
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mb-2">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-richblack-5">
                      Ready to Visualize Your Success?
                    </h3>
                    
                    {/* Description */}
                    <p className="text-richblack-300 max-w-sm leading-relaxed">
                      Your analytics dashboard will come alive once students start enrolling in your courses. Create engaging content and watch your impact grow!
                    </p>
                    
                    {/* Features Preview */}
                    <div className="grid grid-cols-2 gap-3 mt-4 w-full max-w-xs">
                      <div className="bg-richblack-700 p-3 rounded-lg text-center">
                        <div className="text-2xl mb-1">📊</div>
                        <p className="text-xs text-richblack-200">Revenue Charts</p>
                      </div>
                      <div className="bg-richblack-700 p-3 rounded-lg text-center">
                        <div className="text-2xl mb-1">👥</div>
                        <p className="text-xs text-richblack-200">Student Analytics</p>
                      </div>
                      <div className="bg-richblack-700 p-3 rounded-lg text-center">
                        <div className="text-2xl mb-1">⭐</div>
                        <p className="text-xs text-richblack-200">Course Ratings</p>
                      </div>
                      <div className="bg-richblack-700 p-3 rounded-lg text-center">
                        <div className="text-2xl mb-1">📈</div>
                        <p className="text-xs text-richblack-200">Growth Trends</p>
                      </div>
                    </div>
                    
                    {/* Call to Action */}
                    <div className="mt-4">
                      <Link to="/dashboard/add-course" 
                            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-richblack-900 font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 transform hover:scale-105">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Create Your First Course
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              {/* Total Statistics */}
              <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
                <p className="text-lg font-bold text-richblack-5">Statistics</p>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-lg text-richblack-200">Total Courses</p>
                    <p className="text-3xl font-semibold text-richblack-50">
                      {courses?.length || 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg text-richblack-200">Total Students</p>
                    <p className="text-3xl font-semibold text-richblack-50">
                      {totalStudents}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg text-richblack-200">Total Income</p>
                    <p className="text-3xl font-semibold text-richblack-50">
                      Rs. {totalAmount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-md bg-richblack-800 p-6">
              {/* Render 3 courses */}
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-richblack-5">Your Courses</p>
                <Link to="/dashboard/my-courses">
                  <p className="text-xs font-semibold text-yellow-50">View All</p>
                </Link>
              </div>
              <div className="my-4 flex items-start space-x-6">
                {courses?.slice(0, 3).map((course) => (
                  <div key={course._id} className="w-1/3">
                    <img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="h-[201px] w-full rounded-md object-cover"
                    />
                    <div className="mt-3 w-full">
                      <p className="text-sm font-medium text-richblack-50">
                        {course.courseName}
                      </p>
                      <div className="mt-1 flex items-center space-x-2">
                        <p className="text-xs font-medium text-richblack-300">
                          {course.studentsEnroled?.length || 0} students
                        </p>
                        <p className="text-xs font-medium text-richblack-300">
                          |
                        </p>
                        <p className="text-xs font-medium text-richblack-300">
                          Rs. {course.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-20 rounded-md bg-richblack-800 p-8 py-16 border border-richblack-700">
            <div className="flex flex-col items-center text-center max-w-md mx-auto">
              {/* Animated Icon */}
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                {/* Floating elements */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-1 -left-2 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
              </div>
              
              {/* Main Message */}
              <h2 className="text-3xl font-bold text-richblack-5 mb-3">
                Ready to Share Your Knowledge?
              </h2>
              
              {/* Subtitle */}
              <p className="text-lg text-richblack-300 mb-6 leading-relaxed">
                Create your first course and start building your teaching empire. Share your expertise with students worldwide!
              </p>
              
              {/* Benefits */}
              <div className="grid grid-cols-1 gap-3 mb-8 w-full">
                <div className="flex items-center justify-center space-x-3 bg-richblack-700 p-3 rounded-lg">
                  <span className="text-2xl">🎯</span>
                  <span className="text-richblack-200">Reach Global Audience</span>
                </div>
                <div className="flex items-center justify-center space-x-3 bg-richblack-700 p-3 rounded-lg">
                  <span className="text-2xl">💰</span>
                  <span className="text-richblack-200">Generate Passive Income</span>
                </div>
                <div className="flex items-center justify-center space-x-3 bg-richblack-700 p-3 rounded-lg">
                  <span className="text-2xl">📚</span>
                  <span className="text-richblack-200">Build Your Brand</span>
                </div>
              </div>
              
              {/* Call to Action Button */}
              <Link to="/dashboard/add-course" 
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-richblack-900 font-bold text-lg rounded-xl hover:from-yellow-500 hover:to-yellow-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Your First Course
              </Link>
              
              {/* Help Text */}
              <p className="text-sm text-richblack-400 mt-4">
                Need help getting started? Check out our 
                <span className="text-yellow-400 hover:text-yellow-300 cursor-pointer"> instructor guide</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </InstructorOnlyWrapper>
  )
}

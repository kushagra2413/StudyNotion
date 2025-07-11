import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"

export default function PurchaseHistory() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [enrolledCourses, setEnrolledCourses] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getEnrolledCourses = async () => {
      try {
        setLoading(true)
        const res = await getUserEnrolledCourses(token)
        setEnrolledCourses(res)
      } catch (error) {
        console.log("Could not fetch enrolled courses")
      } finally {
        setLoading(false)
      }
    }
    getEnrolledCourses()
  }, [token])

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="text-white">
      <div className="mb-14">
        <h1 className="text-3xl font-medium text-richblack-5 mb-2">
          Purchase History
        </h1>
        <p className="text-richblack-300">
          View all your course purchases and transaction history
        </p>
      </div>

      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <div className="grid h-[10vh] w-full place-content-center text-richblack-5">
          <div className="flex flex-col items-center justify-center space-y-4 p-8">
            {/* Empty State Icon */}
            <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-richblack-5">
              No Purchases Yet
            </h3>
            <p className="text-richblack-300 text-center max-w-md">
              You haven't purchased any courses yet. Start exploring our course catalog to begin your learning journey!
            </p>
            
            <button 
              onClick={() => window.location.href = '/'}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-richblack-900 font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 transform hover:scale-105"
            >
              Browse Courses
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Total Courses</p>
                  <p className="text-2xl font-bold">{enrolledCourses.length}</p>
                </div>
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Spent</p>
                  <p className="text-2xl font-bold">
                    ₹{enrolledCourses.reduce((total, course) => total + (course.price || 0), 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Avg. Course Price</p>
                  <p className="text-2xl font-bold">
                    ₹{Math.round(enrolledCourses.reduce((total, course) => total + (course.price || 0), 0) / enrolledCourses.length)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 1a1 1 0 100 2h2a1 1 0 100-2h-2z" clipRule="evenodd"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Courses List */}
          <div className="bg-richblack-800 rounded-xl border border-richblack-700">
            <div className="p-6 border-b border-richblack-700">
              <h2 className="text-xl font-semibold text-richblack-5">Course Purchase History</h2>
              <p className="text-richblack-300 text-sm mt-1">All your purchased courses with details</p>
            </div>
            
            <div className="divide-y divide-richblack-700">
              {enrolledCourses.map((course, i) => (
                <div key={i} className="p-6 hover:bg-richblack-700 transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={course.thumbnail}
                        alt={course.courseName}
                        className="h-16 w-24 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-medium text-richblack-5 mb-1">
                          {course.courseName}
                        </h3>
                        <p className="text-richblack-300 text-sm mb-2">
                          {course.courseDescription?.substring(0, 100)}
                          {course.courseDescription?.length > 100 && "..."}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-richblack-400">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            Purchased
                          </span>
                          <span>•</span>
                          <span>{course?.studentsEnrolled?.length || 0} students</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-richblack-5 mb-1">
                        ₹{course.price}
                      </div>
                      <div className="text-sm text-richblack-300">
                        {new Date(course.createdAt).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

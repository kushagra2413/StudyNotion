import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI'
import { useEffect, useState } from 'react'
import IconBtn from '../../common/IconBtn'
import CoursesTable from './InstructorCourses/CoursesTable'
import { ACCOUNT_TYPE } from '../../../utils/constants'
import InstructorOnlyWrapper from '../../common/InstructorOnlyWrapper'

const MyCourses = () => {

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCourses = async () => {
        console.log("=== FETCHING COURSES ===")
        console.log("User:", user)
        console.log("Token exists:", !!token)
        console.log("Account type:", user?.accountType)
        
        if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && token) {
            setLoading(true);
            try {
                const result = await fetchInstructorCourses(token, user?.accountType);
                console.log("Fetched courses result:", result)
                if(result){
                    setCourses(result);
                    console.log("Set courses state to:", result)
                }
            } catch (error) {
                console.error("Error fetching courses:", error)
            } finally {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        fetchCourses();
    }, [user, token])

    // Add a manual refresh function
    const handleRefresh = () => {
        console.log("Manual refresh triggered")
        fetchCourses();
    }

  return (
    <InstructorOnlyWrapper>
      <div className='text-white'>
          <div className='flex justify-between'>
              <h1>My Courses</h1>
              <div className='flex gap-2'>
                  <IconBtn
                   text="Refresh"
                   onclick={handleRefresh}
                   customClasses="!bg-richblack-700"
                   />
                  <IconBtn
                   text="Add Course"
                   onclick = {() => navigate("/dashboard/add-course")}
                   />
              </div>
          </div>
          
          {loading && (
              <div className="flex justify-center items-center py-8">
                  <div className="spinner"></div>
                  <span className="ml-2">Loading courses...</span>
              </div>
          )}
          
          {!loading && courses && courses.length > 0 && (
              <CoursesTable courses={courses} setCourses={setCourses}/>
          )}
          
          {!loading && (!courses || courses.length === 0) && (
              <div className="text-center py-8">
                  <p className="text-richblack-300">No courses found.</p>
                  <p className="text-sm text-richblack-400 mt-2">
                      Create your first course to get started!
                  </p>
              </div>
          )}
      </div>
    </InstructorOnlyWrapper>
  )
}

export default MyCourses
import React from 'react'
import { useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from '../../utils/constants'

const InstructorOnlyWrapper = ({ children, fallback = null }) => {
  const { user } = useSelector((state) => state.profile)
  
  // Only render children if user is an instructor
  if (user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR) {
    return fallback || (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center text-white">
        <div className="text-6xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold text-richblack-5 mb-2">Access Denied</h2>
        <p className="text-richblack-300 mb-4">This section is only available for instructors.</p>
      </div>
    )
  }
  
  return children
}

export default InstructorOnlyWrapper

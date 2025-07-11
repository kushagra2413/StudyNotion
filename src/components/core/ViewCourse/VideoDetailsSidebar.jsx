import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';

const VideoDetailsSidebar = ({setReviewModal}) => {

    const [activeStatus, setActiveStatus] = useState("");
    const [videoBarActive, setVideoBarActive] = useState("");
    const [expandedSections, setExpandedSections] = useState(new Set());
    const navigate = useNavigate();
    const location = useLocation();
    const {sectionId, subSectionId} = useParams();
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
    } = useSelector((state)=>state.viewCourse);

    useEffect(()=> {
        const setActiveFlags = () => {
            if(!courseSectionData.length)
                return;
            const currentSectionIndex = courseSectionData.findIndex(
                (data) => data._id === sectionId
            )
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
                (data) => data._id === subSectionId
            )
            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;
            //set current section here
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            //set current sub-section here
            setVideoBarActive(activeSubSectionId);
            
            // Auto-expand the active section
            if (courseSectionData?.[currentSectionIndex]?._id) {
                setExpandedSections(prev => new Set([...prev, courseSectionData[currentSectionIndex]._id]));
            }
        }
        setActiveFlags();
    },[courseSectionData, courseEntireData, location.pathname])

    const handleAddReview = () => {
        setReviewModal(true);
    }

    const toggleSection = (sectionId) => {
        setExpandedSections(prev => {
            const newSet = new Set(prev);
            if (newSet.has(sectionId)) {
                newSet.delete(sectionId);
            } else {
                newSet.add(sectionId);
            }
            return newSet;
        });
        setActiveStatus(sectionId);
    }

    const completionPercentage = totalNoOfLectures > 0 ? (completedLectures?.length / totalNoOfLectures) * 100 : 0;

  return (
    <>
        <div className='min-h-screen bg-gradient-to-b from-richblack-800 to-richblack-900 border-r border-richblack-700 shadow-xl'>
            {/* Header Section */}
            <div className="sticky top-0 bg-gradient-to-r from-richblack-900 to-richblack-800 border-b border-richblack-700 p-6 backdrop-blur-sm">
                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mb-6">
                    <button 
                        onClick={() => navigate("/dashboard/enrolled-courses")}
                        className="flex items-center space-x-2 px-4 py-2 bg-richblack-700 hover:bg-richblack-600 rounded-lg transition-all duration-200 text-richblack-100 hover:text-white transform hover:scale-105 group"
                    >
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="font-medium">Back</span>
                    </button>

                    <button
                        onClick={handleAddReview}
                        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-richblack-900 rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 font-semibold transform hover:scale-105 shadow-lg"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <span>Add Review</span>
                    </button>
                </div>

                {/* Course Info */}
                <div className="space-y-4">
                    <div>
                        <h1 className="text-xl font-bold text-richblack-5 mb-2 leading-tight">
                            {courseEntireData?.courseName}
                        </h1>
                        <div className="flex items-center space-x-4 text-sm text-richblack-300">
                            <span className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                {completedLectures?.length} / {totalNoOfLectures} completed
                            </span>
                        </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-richblack-300">Progress</span>
                            <span className="text-yellow-400 font-semibold">{Math.round(completionPercentage)}%</span>
                        </div>
                        <div className="w-full bg-richblack-700 rounded-full h-2.5 overflow-hidden">
                            <div 
                                className="bg-gradient-to-r from-green-400 to-green-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${completionPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Content */}
            <div className="p-4">
                <div className="space-y-2">
                    {courseSectionData.map((course, index) => (
                        <div key={index} className="bg-richblack-800 rounded-xl border border-richblack-700 overflow-hidden hover:border-richblack-600 transition-all duration-200">
                            {/* Section Header */}
                            <div 
                                onClick={() => toggleSection(course?._id)}
                                className="flex items-center justify-between p-4 cursor-pointer hover:bg-richblack-700 transition-colors duration-200 group"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                                        activeStatus === course?._id ? 'bg-yellow-400' : 'bg-richblack-500'
                                    }`}></div>
                                    <h3 className="font-semibold text-richblack-5 group-hover:text-yellow-400 transition-colors duration-200">
                                        {course?.sectionName}
                                    </h3>
                                </div>
                                <svg 
                                    className={`w-5 h-5 text-richblack-400 transition-transform duration-200 ${
                                        expandedSections.has(course?._id) ? 'rotate-180' : ''
                                    }`} 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>

                            {/* SubSections */}
                            {expandedSections.has(course?._id) && (
                                <div className="border-t border-richblack-700">
                                    {course.subSection.map((topic, subIndex) => (
                                        <div
                                            key={subIndex}
                                            className={`flex items-center space-x-4 p-4 cursor-pointer transition-all duration-200 hover:bg-richblack-600 border-l-4 ${
                                                videoBarActive === topic._id
                                                    ? "bg-gradient-to-r from-yellow-400/10 to-transparent border-yellow-400 text-yellow-400"
                                                    : "border-transparent text-richblack-300 hover:text-richblack-100"
                                            }`}
                                            onClick={() => {
                                                navigate(
                                                    `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                                                );
                                                setVideoBarActive(topic?._id);
                                            }}
                                        >
                                            {/* Custom Checkbox */}
                                            <div className="relative">
                                                <input
                                                    type='checkbox'
                                                    checked={completedLectures.includes(topic?._id)}
                                                    onChange={() => {}}
                                                    className="sr-only"
                                                />
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                                    completedLectures.includes(topic?._id)
                                                        ? 'bg-green-500 border-green-500'
                                                        : 'border-richblack-500 hover:border-richblack-400'
                                                }`}>
                                                    {completedLectures.includes(topic?._id) && (
                                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Video Icon */}
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                                videoBarActive === topic._id
                                                    ? 'bg-yellow-400 text-richblack-900'
                                                    : 'bg-richblack-700 text-richblack-300'
                                            }`}>
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                                                </svg>
                                            </div>

                                            {/* Title */}
                                            <span className={`font-medium flex-1 transition-colors duration-200 ${
                                                videoBarActive === topic._id ? 'text-yellow-400' : ''
                                            }`}>
                                                {topic.title}
                                            </span>

                                            {/* Duration (if available) */}
                                            {topic.timeDuration && (
                                                <span className="text-xs text-richblack-400 bg-richblack-700 px-2 py-1 rounded">
                                                    {topic.timeDuration}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
  )
}

export default VideoDetailsSidebar

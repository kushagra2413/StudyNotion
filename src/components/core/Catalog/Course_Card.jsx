import React from 'react'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Course_Card = ({course, Height}) => {

    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    },[course])

  return (
    <div>
        <Link to={`/courses/${course._id}`}>
            <div>
                <div>
                    <img
                        src={course?.thumbnail || "https://via.placeholder.com/150"}
                        alt={course?.title || "Course Thumbnail"}
                        className={`w-full object-cover ${Height} w-full rounded-xl object-cover`}
                    />
                </div>
                <div>
                    <p>{course?.courseName}</p>
                    <p>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                    <div>
                        <span>{avgReviewCount || 0}</span>
                        <RatingStars Review_Count={avgReviewCount}/> 
                        <span>{course?.ratingAndReviews?.length} Ratings</span>
                    </div>
                    <p>{course?.price}</p>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default Course_Card
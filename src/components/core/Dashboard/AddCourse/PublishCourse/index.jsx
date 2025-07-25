import React, { useEffect } from 'react'
import { useForm} from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import IconBtn from '../../../../common/IconBtn'
import { resetCourseState, setStep } from '../../../../../slices/courseSlice'
import { COURSE_STATUS } from "../../../../../utils/constants"
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI"

export default function PublishCourse() {

    const {register, handleSubmit, setValue, getValues} = useForm();
    const dispatch = useDispatch();
    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        if(course?.status === COURSE_STATUS.PUBLISHED){
            setValue("public", true);
        } 
    },[]);

    const onSubmit = () => {
        handleCoursePublish();
    }

    const goToCourses = () => {
        dispatch(resetCourseState());
        //navigate("/dashboard/my-courses");
    }

    const handleCoursePublish = async () => {
        if(course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true ||
            (course.status === COURSE_STATUS.DRAFT && getValues("public") === false) ) {
                //no updation in form
                //no need to make api call
                goToCourses();
                return;
            }

        //if form is updated
        const formData = new FormData();
        formData.append("courseId",course._id);
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append("status", courseStatus);

        setLoading(true);
        const result = await editCourseDetails(formData,token);

        if(result) {
            goToCourses();
        }

        setLoading(false);


    }

    const goBack = () => {
        dispatch(setStep(2));
    }


    return (
        <div className = 'rounded-md border-[1px] bg-richblack-800 p-6 border-richblack-700 text-white'>
            <p className=''>Publish Course</p>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor='public'>
                <input
                    type='checkbox'
                    id='public'
                    {...register("public")}
                    className='rounded h-4 w-4'
                />
                <span className='ml-3'>
                    Make this Course as Public
                </span>
                </label>
            </div>

            <div className='flex justify-end gap-x-3'>
                <button
                 disabled={loading}
                 type='submit'
                 onClick={goBack}
                 className='flex items-center rounded-md bg-richblack-300 p-4'
                >
                 Back
                </button>

                <IconBtn disabled={loading} text="Save Changes" />
            </div>

            </form>

        </div>
    )
}


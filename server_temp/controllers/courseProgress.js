const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");
const User = require("../models/User");
const Course = require("../models/Course");


exports.updateCourseProgress = async(req,res) => {
    console.log("=== UPDATE COURSE PROGRESS DEBUG ===")
    console.log("Request body:", req.body)
    console.log("User ID:", req.user?.id)
    console.log("User account type:", req.user?.accountType)
    
    const {courseId, subSectionId} = req.body;
    const userId = req.user.id;

    if (!courseId || !subSectionId) {
        console.log("ERROR: Missing courseId or subSectionId")
        return res.status(400).json({
            success: false,
            message: "Course ID and Sub Section ID are required"
        });
    }

    if (!userId) {
        console.log("ERROR: User ID not found in request")
        return res.status(401).json({
            success: false,
            message: "User authentication required"
        });
    }

    try{
        // Check if user is enrolled in the course
        const user = await User.findById(userId);
        if (!user) {
            console.log("ERROR: User not found:", userId)
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isEnrolled = user.courses.includes(courseId);
        if (!isEnrolled) {
            console.log("ERROR: User not enrolled in course:", userId, courseId)
            return res.status(403).json({
                success: false,
                message: "User is not enrolled in this course"
            });
        }
        
        console.log("User enrollment validation passed");

        //check if the subsection is valid
        const subSection = await SubSection.findById(subSectionId);

        if(!subSection) {
            console.log("ERROR: Invalid subsection ID:", subSectionId)
            return res.status(404).json({
                success: false,
                message: "Invalid SubSection ID"
            });
        }

        console.log("SubSection Validation Done");

        //check for old entry 
        let courseProgress = await CourseProgress.findOne({
            courseID:courseId,
            userId:userId,
        });
        
        if(!courseProgress) {
            console.log("Course progress not found, creating new record...");
            // Create a new course progress record if it doesn't exist
            courseProgress = await CourseProgress.create({
                courseID: courseId,
                userId: userId,
                completedVideos: []
            });
            console.log("Created new course progress record:", courseProgress._id);
        }
        
        console.log("Course Progress Validation Done");
        //check for re-completing video/subsection
        if(courseProgress.completedVideos.includes(subSectionId)) {
            console.log("WARNING: Subsection already completed:", subSectionId)
            return res.status(400).json({
                success: false,
                message:"Subsection already completed",
            });
        }

        //push into completed video
        courseProgress.completedVideos.push(subSectionId);
        console.log("Course Progress Push Done");
        await courseProgress.save();
        console.log("Course Progress Save call Done");
        return res.status(200).json({
            success:true,
            message:"Course Progress Updated Successfully",
        })
    }
    catch(error) {
        console.error("ERROR in updateCourseProgress:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}
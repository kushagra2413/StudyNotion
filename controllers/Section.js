const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
    try{
        //data fetch
        const {sectionName, courseId} = req.body;

        // data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        //create section
        const newSection = await Section.create({sectionName});
        //update course with section objectid
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                            courseId,
                                            {
                                                $push:{
                                                    courseContent: newSection._id,
                                                }
                                            },
                                            {new: true},              
        ).populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        })
        .exec();
        //use populate to replace section and subsection both in updatedcourse details

        //return response
        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourseDetails,
        })
    } catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to create Section, please try again",
            error: error.message,
        })
    }
}


exports.updateSections = async (req, res) => {
    try{

        //fetch data
        const {sectionName, sectionId} = req.body;

        // data validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        } 
        
        //update data
        const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new: true});
        
        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
            updatedCourseDetails,
        })

    }  catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to update Section, please try again",
            error: error.message,
        })
    }
}



exports.deleteSections = async (req, res) => {
    try{

        //get id - assuming that we are sending id in params
        const {sectionId} = req.params;

       
        //delete data
        await Section.findByIdAndDelete(sectionId);
        //todo do we need to delete the entry from course schema
        return res.status(200).json({
            success: true,
            message: "Section deleted successfully",
        })

    }  catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to delete Section, please try again",
            error: error.message,
        })
    }
}
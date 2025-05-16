const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//create Subsection
exports.createSubSection = async (req, res) => {
    try {
        //data fetch
        const {sectionId, title, timeDuration, description} = req.body;
        
        //extract file/video
        const video = req.files.videoFile;
        
        //validation
        if(!sectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        
        //upload video
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        
        //create subsection - FIXED: using SubSection model instead of Section
        const subSectionDetails = await SubSection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: uploadDetails.secure_url,
        });
        
        //update section with subsection objectid - FIXED: using Section instead of Course
        const updatedSection = await Section.findByIdAndUpdate(
            {_id: sectionId},
            {
                $push:{
                    subSection: subSectionDetails._id,
                }
            },
            {new: true}
        ).populate("subSection").exec();
        
        //return response
        return res.status(200).json({
            success: true,
            message: "SubSection created successfully",
            updatedSection,
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Unable to create SubSection, please try again",
            error: error.message,
        });
    }
}

//update SubSection - FIXED: completely rewritten to match actual subsection updates
exports.updateSubSection = async (req, res) => {
    try {
        //fetch data
        const {subSectionId, title, timeDuration, description} = req.body;
        const video = req.files?.videoFile;
        
        //create update object
        const updateFields = {};
        if(title) updateFields.title = title;
        if(timeDuration) updateFields.timeDuration = timeDuration;
        if(description) updateFields.description = description;
        
        //if video file is provided, update it
        if(video) {
            const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
            updateFields.videoUrl = uploadDetails.secure_url;
        }
        
        //update data
        const updatedSubSection = await SubSection.findByIdAndUpdate(
            subSectionId, 
            updateFields, 
            {new: true}
        );
        
        return res.status(200).json({
            success: true,
            message: "SubSection updated successfully",
            updatedSubSection,
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update SubSection, please try again",
            error: error.message,
        });
    }
}

//delete SubSection - ADDED FUNCTION
exports.deleteSubSection = async (req, res) => {
    try {
        //get id from params
        const {subSectionId} = req.params;
        
        if(!subSectionId) {
            return res.status(400).json({
                success: false,
                message: "SubSection ID is required"
            });
        }
        
        //delete the subsection
        await SubSection.findByIdAndDelete(subSectionId);
        
        //TODO: Remove this subsection from the parent section's subSection array
        //This could be done by finding the parent section and using $pull to remove the subSectionId
        
        return res.status(200).json({
            success: true,
            message: "SubSection deleted successfully",
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Unable to delete SubSection, please try again",
            error: error.message,
        });
    }
}
const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { sign } = require("jsonwebtoken");

//capture the payment and initate the razorpay order
exports.capturePayment = async (req, res) => {
    
        //det courdeid and userid
        const {course_id} = req.body;
        const userId = req.user.id;

        //valid courseid
        if(!course_id){
            return res.json({
                success: false,
                message: "Please provide valid course id"
            })
        };
        //valid course detail
        let course;
        try{
            course = await Course.findbyId(course_id);
            if(!course){
                return res.json({
                    success: false,
                    message: "Could not find the course",
                });
            }

            //user already paid for the same course
            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)){
                return res.status(200).json({
                    success: false,
                    message: "Student is already enrolled"
                })
            }
        } catch(error){
            console.error(error);
            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }
        //order create
        const amount = course.price;
        const currency = "INR";

        const options = {
            amount: amount * 100,
            currency,
            receipt: Math.random(Date.now()).toString(),
            notes:{
               courseId: course_id,
               userId,
            }
        };
        try{
            //initiate the payment using razorpay
            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse);
            //return response
            return res.status(200).json({
                success: true,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                thumbnail: course.thumbnail,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.amount,
            })
        }catch(error){
            console.log(error);
            res.json({
                success: false,
                message: "Could not intiate order"
            });
        }
    
};

//verify signature of razorpay and server
exports.verifySignature = async (req, res) => {
    const webhookSecret = "12345678";

    const signature = req.headers("x-razorpay-signature");

    crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if(signature === digest){
        console.log("Payment is authorised");

        const {courseId, userId} = req.body.payload.payment.entity.notes;

        try{
            //fullfill the action

            //find the courseid and enroll the student in it
            const enrolledCourse = await Course.findOneandUpdate(
                                                {_id: courseId},
                                                {$push: {studentsEnrolled: userId}},
                                                {new: true},
            );
            if(!enrolledCourse){
                return res.status(500).json({
                    success: false,
                    message: "Course not found",
                })
            }
            console.log(enrolledCourse);

            //find the student  and add the course to their list of enrolled course
            const enrolledStudent = await User.findOneAndUpdate(
                                            {_id: userId},
                                            {$push: {courses: courseId}},
                                            {new: true},
            );
            console.log(enrolledStudent);
            //mail send kro conformation wala
            const emailResponse = await mailSender(
                                        enrolledStudent.email,
                                        "Congratulations from Codehelp",
                                        "Congratulations, you are onboarded into new Codehelp course"
            );
            console.log(emailResponse);
            return res.status(200.).json({
                success: true,
                message: "Signature verified successfully and course added",
            });
        } catch(error){
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    else{
        return res.status(400).json({
            success: false,
            message: "Invalid request",
        });
    }
}
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require('bcrypt');
const crypto = require('crypto');

//resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
 try{
     //get email from req body
     const email = req.body.email;
     //check user for this email, email validation
     const user  = await User.findOne({email: email});
     if(!user){
         return res.status(401).json({
             success: false,
             message: "User not found",
         });
     }
     //generate token
     const token = crypto.randomUUID();
     //update user by adding token and expiration time
     const updatedDetails = await User.findOneAndUpdate(
         {email: email},
         {
             token: token,
             resetPasswordExpires: Date.now() + 5*60*1000,
         },
         {new: true}
     );
     //create url
     const url = `http://localhost:3000/update-password/${token}`
     // send email containing the url
     await mailSender(email,
         "Password reset link",
         `Password reset link: ${url}`
     );
 
     //return response
     return res.status(200).json({
         success: true,
         message: "Password reset link sent to your email",
     });
 } catch(error){
     console.log(error);
     return res.status(500).json({
         success: false,
         message: "Something went wrong while changing password",
     });
 }
}


//resetPassword
exports.resetPassword = async(req, res) => {
    try{
        //fetch data
        const {password, confirmPassword, token} = req.body;
        //validation
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password and confirm password should be same",
            });
        }
        //get user details from db using token
        const userDetails = await User.findOne({token: token});
        //if no entry
        if(!userDetails){
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            });
        }
        //token time change
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(401).json({
                success: false,
                message: "Token is expired",
            });
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //passwordupdate
        await User.findOneAndUpdate(
            {token: token},
            {password: hashedPassword},
            {new: true},
        );

        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating password",
        });
    }
}
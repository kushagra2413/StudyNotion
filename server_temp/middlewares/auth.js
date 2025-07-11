const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth
exports.auth = async (req, res, next) => {
    try{

        console.log("BEFORE ToKEN EXTRACTION");
        //extract token
        const token = req.cookies.token 
                        || req.body.token 
                        || (req.header("Authorization") && req.header("Authorization").replace("Bearer ", ""));
        console.log("AFTER ToKEN EXTRACTION");
        console.log("Extracted token:", token);

        //if token missing, then return response
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }

        //verify the token
        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(err) {
            //verification - issue
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch(error) {  
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
}

//isStudent
exports.isStudent = async (req, res, next) => {
 try{
        console.log("=== IS STUDENT MIDDLEWARE ===");
        console.log("User from req:", req.user);
        console.log("Account Type:", req.user?.accountType);
        console.log("Is Student:", req.user?.accountType === "Student");
        
        if(req.user.accountType !== "Student") {
            console.log("Access denied: User is not a student");
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Students only',
            });
        }
        console.log("Student middleware passed, proceeding to next()");
        next();
 }
 catch(error) {
    return res.status(500).json({
        success:false,
        message:'User role cannot be verified, please try again'
    })
 }
}


//isInstructor
exports.isInstructor = async (req, res, next) => {
    try{
           console.log("=== IS INSTRUCTOR MIDDLEWARE ===");
           console.log("User from req:", req.user);
           console.log("Account Type:", req.user.accountType);
           console.log("Is Instructor:", req.user.accountType === "Instructor");
           
           if(req.user.accountType !== "Instructor") {
               console.log("Access denied: User is not an instructor");
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Instructor only',
               });
           }
           console.log("Instructor access granted");
           next();
    }
    catch(error) {
       console.log("Error in isInstructor middleware:", error);
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
   }


//isAdmin
exports.isAdmin = async (req, res, next) => {
    try{    
           console.log("Printing AccountType ", req.user.accountType);
           if(req.user.accountType !== "Admin") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Admin only',
               });
           }
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
   }
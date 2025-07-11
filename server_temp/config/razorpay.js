const Razorpay = require("razorpay");

console.log("=== RAZORPAY CONFIG DEBUG ===")
console.log("RAZORPAY_KEY:", process.env.RAZORPAY_KEY ? "Key found" : "Key missing")
console.log("RAZORPAY_SECRET:", process.env.RAZORPAY_SECRET ? "Secret found" : "Secret missing")
console.log("Full RAZORPAY_KEY:", process.env.RAZORPAY_KEY)
console.log("Full RAZORPAY_SECRET:", process.env.RAZORPAY_SECRET)

if (!process.env.RAZORPAY_KEY || !process.env.RAZORPAY_SECRET) {
    console.error("ERROR: Razorpay credentials are missing in environment variables")
    // Don't create Razorpay instance if credentials are missing
    exports.instance = null;
} else {
    exports.instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY,
        key_secret: process.env.RAZORPAY_SECRET,
    });
    console.log("Razorpay instance created successfully")
}
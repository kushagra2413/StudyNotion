import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
// import rzpLogo from "../../assets/Logo/rzp_logo.png"
import rzpLogo from "../../assets/Logo/Logo-Full-Light.png"
// import { verifyPayment } from "../../../Server/controllers/Payments";
import { Navigate } from "react-router-dom";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";




const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    try {
        //load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res) {
            toast.error("Razorpay SDK failed to load. Are you online?", {
                id: toastId
            });
            return;
        }

        //initiate the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API,
            {courses},
            {
                 Authorization: `Bearer ${token}`,
            }
        )
        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message || "Something went wrong while placing the order");
        }
        console.log("Razorpay Key:", process.env.RAZORPAY_KEY);

        //options 
        const options = {
            key:process.env.REACT_APP_RAZORPAY_KEY,
            currency:orderResponse.data.message.currency,
            amount:`${orderResponse.data.message.amount}`,
            order_id:orderResponse.data.message.id,
            name:"StudyNotion",
            description:"Thnk You for Purchasing the Course",
            image:rzpLogo,
            prefill: {
                name: `${userDetails.firstName}`,
                email: userDetails.email,
            },
            handler: function(response){
                //send successful mail
                sendPaymentSuccessEmail(response, orderResponse.data.message.amount, token);

                //verifyPayment
                verifyPayment({...response, courses}, token, navigate, dispatch);
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function (response) {
            console.log("Payment failed", response);
            toast.error("Payment failed. Please try again later.");
        });

    } catch (error) {
        console.log("Payment aoi error ", error);
        toast.error("Could not initiate payment. Please try again later.");
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        },{
            Authorization: `Bearer ${token}`,
        })
    } catch(error){
        console.log("PAYMENT SUCCESS EMAIL ERROR", error);
    }
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying payment...");
    dispatch(setPaymentLoading(true));
    try {
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`,
        })


        if(!response.data.success) {
            throw new Error(response.data.message || "Something went wrong while verifying the payment");
        }

        toast.success("Payment Successful, you are added to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    } catch (error){
        console.log("Payment verify error", error);
        toast.error("Could not verify payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}
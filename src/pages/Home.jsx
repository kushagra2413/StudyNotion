import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/Button';
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructionSection from '../components/core/HomePage/InstructorSection';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import Footer from '../components/common/Footer';
import ReviewSlider from '../components/common/ReviewSlider';

const Home = () => {
  return (
    <div >
        {/* section 1 */}
        <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between'>

            <Link to={"/signup"}>

                <div className='mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 mt-16 p-1 hover:scale-95 w-fit group'>
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900' >
                        <p>Become an Instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>

            <div className='text-center text-4xl font-semibold mt-7'>
                Empower Your Future with{"  "} 
                <HighlightText text={" Coding Skills"}/>
            </div>

            <div className='w-[90%] mt-4 text-richblack-300 text-center text-lg font-bold '>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>

            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={"/learn-more"}>
                    Learn More
                </CTAButton>

                <CTAButton active={false} linkto={"/login"}>
                    Book a Demo
                </CTAButton>
            </div>

            <div className='mx-3 my-12 shadow-blue-200 '>
                <video muted loop autoPlay>
                    <source src={Banner} type='video/mp4'/>
                </video>
            </div>

            {/* code section 1 */}
            <div>
                <CodeBlocks
  position={"lg:flex-row"}
  heading={<div className='text-4xl font-semibold'>
    Unlock your 
    <HighlightText text={"coding potential "} />
     with our online courses
  </div>}
  subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
  ctabtn1={{
    btnText: "try it yourself",
    linkto: "/signup",
    active: true,
  }}
  ctabtn2={{
    btnText: "learn more",
    linkto: "/learn-more",
    active: false,
  }}
  codeblock={`<!DOCTYPE html>\n<html>\n<head>\n  <title>Example</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <h1><a href="/">Header</a></h1>\n  <nav>\n    <a href="one/">One</a>\n    <a href="two/">Two</a>\n    <a href="three/">Three</a>\n  </nav>\n</body>\n</html>`}
  backgroundGradient={"bg-gradient-to-b from-[#0f172a] to-[#1e293b]"}
/>
            </div>

            
            {/* code section 2 */}
            <div>
               <CodeBlocks
  position={"lg:flex-row-reverse"}
  heading={<div className='text-4xl font-semibold'>
    Start 
    <HighlightText text={"coding in seconds "} />
    
  </div>}
  subheading={"Go ahead, give a try. Our hands-on learning enviornment means you will be writing real code from your very first lesson."}
  ctabtn1={{
    btnText: "try it yourself",
    linkto: "/signup",
    active: true,
  }}
  ctabtn2={{
    btnText: "learn more",
    linkto: "/learn-more",
    active: false,
  }}
  codeblock={`<!DOCTYPE html>\n<html>\n<head>\n  <title>Example</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <h1><a href="/">Header</a></h1>\n  <nav>\n    <a href="one/">One</a>\n    <a href="two/">Two</a>\n    <a href="three/">Three</a>\n  </nav>\n</body>\n</html>`}
  backgroundGradient={"bg-gradient-to-b from-[#095e1d3] to-[#4ecdc4]"}
/>
            </div>

          <ExploreMore/>

        </div>

        {/* section 2 */}
          <div className='bg-pure-greys-5 text-richblack-700'>
          <div className='homepage_bg h-[310px]'>

            <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto '>
            <div className='h-[150px]'></div>

            <div className='flex flex-row gap-7 text-white'>

             <CTAButton active={true} linkto={"/signup"}>
              <div className='flex items-center gap-3'>
                Explore Full Catalog
                <FaArrowRight/>
              </div>
             </CTAButton>

             <CTAButton active={false} linkto={"/learn-more"}>
              <div>
                Learn More
              </div>
             </CTAButton>

            </div>

            </div>

          </div>

          

          <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>

          <div className='flex flex-row gap-5 mb-10 mt-[95px]'>

            <div className='text-4xl font-semibold w-[45%]'>
              Get the skills you need for a
              <HighlightText text={"Job that is in demand"} />

            </div>

            
          <div className='flex flex-col gap-10 w-[40%] items-start'>
           <div className='text-[16px]'>

           The modern StudyNotion  dictates its own terms. Today, to be a competitive
           specialist requires more than professional skills. 

           </div>
           <CTAButton active={true} linkto={"/learn-more"}>
            <div>
              Learn More
            </div>
           </CTAButton>

          </div>

          </div>

           <TimelineSection/>

          <LearningLanguageSection />

          </div>

          

          </div>

        {/* section 3 */}
          <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 
           first-letter bg-richblack-900 text-white'>

           <InstructionSection/>

           <h2 className='text-center text-4xl font-semibold mt-10'>Review from Other Learners</h2>
            {/* ReviewSlider */}
            <ReviewSlider/>

          </div>

        {/* footer */}
        <Footer/>
    </div>
  )
}

export default Home
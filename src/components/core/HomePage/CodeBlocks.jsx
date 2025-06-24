import React from 'react'
import CTAButton from './Button'
import HighlightText from './HighlightText'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'

const CodeBlocks = ({
    position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor 
}) => {

  return (
    <div className={`flex ${position} my-20 justify-between gap-10 items-center relative`}>

      {/* Section 1 - Content */}
      <div className='w-[50%] flex flex-col gap-8' >
        {heading}
        <div className='text-richblack-300 font-bold'>
          {subheading}
        </div>

        <div className='flex gap-7 mt-7'>
              <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                  <div className='flex gap-2 items-center'>
                  {ctabtn1.btnText}
                  <FaArrowRight/>
                  </div>
              </CTAButton>

              <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                  {ctabtn2.btnText}     
              </CTAButton>
        </div>
      </div>

      {/* Section 2 - Code Block */}
      <div className='h-fit flex flex-row w-[100%] py-4 lg:w-[500px] relative'>
        
        {/* Background Gradient Effects - Orange Glow */}
        <div className="absolute -inset-2 opacity-60">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/30 via-yellow-400/20 to-orange-600/30 rounded-xl blur-xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/20 to-orange-500/25 rounded-xl blur-lg"></div>
        </div>
        
        {/* Animated Floating Orbs */}
        <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full opacity-40 blur-xl animate-pulse"></div>
        <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-30 blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 -right-4 w-12 h-12 bg-gradient-to-r from-orange-300 to-red-400 rounded-full opacity-35 blur-lg animate-pulse delay-500"></div>
        
        {/* Code Container */}
        <div className="relative w-full bg-gradient-to-br from-richblack-900/95 to-richblack-800/90 backdrop-blur-sm rounded-xl border border-richblack-700/60 overflow-hidden shadow-2xl">
          
          {/* Glass effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-orange-500/5 to-transparent pointer-events-none rounded-xl"></div>
          
          <div className="flex relative z-10">
            {/* Line Numbers */}
            <div className='text-center w-[12%] flex flex-col text-richblack-400 font-inter font-bold py-4 px-3 bg-richblack-800/70 border-r border-richblack-600/50'>
                {Array.from({length: 15}, (_, i) => (
                  <div key={i + 1} className="leading-7 text-sm hover:text-orange-300 transition-colors duration-200">
                    {i + 1}
                  </div>
                ))}
            </div>

            {/* Code Content */}
            <div className="w-[88%] flex flex-col font-mono py-4 px-4 relative">
              
              {/* TypeAnimation with Custom Styling */}
              <div className="relative">
                <TypeAnimation
                  sequence={[
                    '', 1000,
                    codeblock, 4000,
                    '', 500
                  ]}
                  wrapper="pre"
                  repeat={Infinity}
                  cursor={true}
                  style={{
                    whiteSpace: "pre-line",
                    display: "block",
                    fontSize: "14px",
                    lineHeight: "1.75",
                    fontFamily: "Consolas, Monaco, 'Courier New', monospace",
                    color: "#e2e8f0",
                    fontWeight: "500"
                  }}
                  omitDeletionAnimation={true}
                />
                
                {/* Custom CSS for syntax highlighting - FIXED */}
                <style dangerouslySetInnerHTML={{
                  __html: `
                    .code-block-container pre {
                      background: transparent !important;
                      margin: 0 !important;
                      padding: 0 !important;
                    }
                    
                    .code-block-container .react-typing-animation-cursor {
                      color: #fbbf24 !important;
                      animation: cursor-blink 1s infinite, cursor-glow 2s ease-in-out infinite alternate;
                    }
                    
                    @keyframes cursor-glow {
                      from {
                        text-shadow: 0 0 5px #fbbf24, 0 0 10px #f59e0b;
                      }
                      to {
                        text-shadow: 0 0 10px #fbbf24, 0 0 20px #f59e0b, 0 0 30px #d97706;
                      }
                    }
                    
                    @keyframes cursor-blink {
                      0%, 50% { opacity: 1; }
                      51%, 100% { opacity: 0; }
                    }
                  `
                }} />
              </div>
            </div>
          </div>
          
          {/* Additional inner glow */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/5 via-transparent to-yellow-500/5 pointer-events-none"></div>
        </div>
        
        {/* Extra ambient lighting */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-400/10 to-transparent rounded-xl blur-3xl"></div>
      </div>
    </div>
  )
}

export default CodeBlocks
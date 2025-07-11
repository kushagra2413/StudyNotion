import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaGraduationCap, FaCertificate, FaUsers, FaChartLine } from 'react-icons/fa'

const LearnMore = () => {
  return (
    <div className="bg-richblack-900 text-white min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-richblack-800 to-richblack-900 py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
        <div className="relative mx-auto max-w-maxContent px-6 lg:px-12">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Learn More About StudyNotion
            </h1>
            <p className="text-xl md:text-2xl text-richblack-200 max-w-4xl mx-auto leading-relaxed">
              Discover why StudyNotion is the premier destination for online learning, 
              connecting students with world-class instructors and cutting-edge courses.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="mx-auto max-w-maxContent px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-richblack-5 mb-4">
              Why Choose StudyNotion?
            </h2>
            <p className="text-lg text-richblack-300 max-w-2xl mx-auto">
              Experience learning like never before with our comprehensive platform designed for success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="group bg-richblack-800 rounded-xl p-8 border border-richblack-700 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                <FaGraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-richblack-5 mb-3">Expert Instructors</h3>
              <p className="text-richblack-300">
                Learn from industry professionals with years of experience and proven track records
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-richblack-800 rounded-xl p-8 border border-richblack-700 hover:border-green-500 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-green-500/25 transition-all duration-300">
                <FaCertificate className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-richblack-5 mb-3">Certified Courses</h3>
              <p className="text-richblack-300">
                Earn industry-recognized certificates upon course completion to boost your career
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-richblack-800 rounded-xl p-8 border border-richblack-700 hover:border-purple-500 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                <FaUsers className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-richblack-5 mb-3">Community Learning</h3>
              <p className="text-richblack-300">
                Join a vibrant community of learners and collaborate on projects and discussions
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-richblack-800 rounded-xl p-8 border border-richblack-700 hover:border-yellow-500 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-yellow-500/25 transition-all duration-300">
                <FaChartLine className="w-8 h-8 text-richblack-900" />
              </div>
              <h3 className="text-xl font-bold text-richblack-5 mb-3">Progress Tracking</h3>
              <p className="text-richblack-300">
                Monitor your learning journey with detailed analytics and progress reports
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-richblack-800">
        <div className="mx-auto max-w-maxContent px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-richblack-5 mb-4">
              StudyNotion by the Numbers
            </h2>
            <p className="text-lg text-richblack-300">
              Join thousands of learners who have transformed their careers with us
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                50K+
              </div>
              <p className="text-richblack-300">Active Students</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-2">
                1000+
              </div>
              <p className="text-richblack-300">Expert Instructors</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
                5000+
              </div>
              <p className="text-richblack-300">Course Offerings</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent mb-2">
                95%
              </div>
              <p className="text-richblack-300">Success Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Paths Section */}
      <div className="py-20">
        <div className="mx-auto max-w-maxContent px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-richblack-5 mb-4">
              Popular Learning Paths
            </h2>
            <p className="text-lg text-richblack-300 max-w-2xl mx-auto">
              Structured learning journeys designed to take you from beginner to expert
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-8 border border-richblack-700">
              <h3 className="text-2xl font-bold text-richblack-5 mb-4">Web Development</h3>
              <p className="text-richblack-300 mb-6">
                Master modern web technologies including React, Node.js, and full-stack development
              </p>
              <Link 
                to="/catalog/web-development"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold"
              >
                Explore Courses <FaArrowRight className="ml-2" />
              </Link>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl p-8 border border-richblack-700">
              <h3 className="text-2xl font-bold text-richblack-5 mb-4">Data Science</h3>
              <p className="text-richblack-300 mb-6">
                Dive into machine learning, AI, and data analytics with hands-on projects
              </p>
              <Link 
                to="/catalog/data-science"
                className="inline-flex items-center text-green-400 hover:text-green-300 font-semibold"
              >
                Explore Courses <FaArrowRight className="ml-2" />
              </Link>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-8 border border-richblack-700">
              <h3 className="text-2xl font-bold text-richblack-5 mb-4">Mobile Development</h3>
              <p className="text-richblack-300 mb-6">
                Build native and cross-platform mobile applications for iOS and Android
              </p>
              <Link 
                to="/catalog/mobile-development"
                className="inline-flex items-center text-purple-400 hover:text-purple-300 font-semibold"
              >
                Explore Courses <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="mx-auto max-w-maxContent px-6 lg:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join millions of learners who have chosen StudyNotion to advance their careers and achieve their goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup"
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105"
            >
              Get Started Free
            </Link>
            <Link 
              to="/"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200 transform hover:scale-105"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LearnMore

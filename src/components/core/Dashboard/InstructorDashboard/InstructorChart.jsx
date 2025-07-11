import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables)

export default function InstructorChart({ courses }) {
  // State to keep track of the currently selected chart
  const [currChart, setCurrChart] = useState("students")

  // Early return if no courses data
  if (!courses || courses.length === 0) {
    return (
      <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
        <p className="text-lg font-bold text-richblack-5">Analytics</p>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-richblack-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-richblack-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-richblack-5 mb-2">No Data Available</h3>
            <p className="text-richblack-300 text-sm">Charts will appear once you have course enrollment data</p>
          </div>
        </div>
      </div>
    )
  }

  // Function to generate random colors for the chart
  const generateRandomColors = (numColors) => {
    const colors = []
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`
      colors.push(color)
    }
    return colors
  }

  // Data for the chart displaying student information
  const chartDataStudents = {
    labels: courses.map((course) => course.courseName || course.title || 'Untitled Course'),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled || 0),
        backgroundColor: generateRandomColors(courses.length),
        borderWidth: 2,
        borderColor: '#374151',
      },
    ],
  }

  // Data for the chart displaying income information
  const chartIncomeData = {
    labels: courses.map((course) => course.courseName || course.title || 'Untitled Course'),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated || 0),
        backgroundColor: generateRandomColors(courses.length),
        borderWidth: 2,
        borderColor: '#374151',
      },
    ],
  }

  // Options for the chart
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          color: '#E5E7EB',
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: '#1F2937',
        titleColor: '#F9FAFB',
        bodyColor: '#E5E7EB',
        borderColor: '#374151',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            return currChart === 'students' 
              ? `${label}: ${value} student${value !== 1 ? 's' : ''}` 
              : `${label}: ₹${value}`;
          }
        }
      }
    },
    elements: {
      arc: {
        borderWidth: 2
      }
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6 border border-richblack-700">
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold text-richblack-5">Analytics</p>
        <div className="text-sm text-richblack-300">
          {courses.length} course{courses.length !== 1 ? 's' : ''}
        </div>
      </div>
      
      <div className="flex space-x-2 bg-richblack-700 p-1 rounded-lg">
        {/* Button to switch to the "students" chart */}
        <button
          onClick={() => setCurrChart("students")}
          className={`flex-1 px-4 py-2 rounded-md font-semibold text-sm transition-all duration-200 ${
            currChart === "students"
              ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg"
              : "text-richblack-300 hover:text-richblack-100 hover:bg-richblack-600"
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
            </svg>
            <span>Students</span>
          </div>
        </button>
        {/* Button to switch to the "income" chart */}
        <button
          onClick={() => setCurrChart("income")}
          className={`flex-1 px-4 py-2 rounded-md font-semibold text-sm transition-all duration-200 ${
            currChart === "income"
              ? "bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg"
              : "text-richblack-300 hover:text-richblack-100 hover:bg-richblack-600"
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/>
            </svg>
            <span>Income</span>
          </div>
        </button>
      </div>
      
      <div className="relative mx-auto aspect-square h-full w-full min-h-[300px]">
        {/* Render the Pie chart based on the selected chart */}
        <Pie
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={options}
        />
      </div>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-richblack-700">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">
            {courses.reduce((acc, course) => acc + (course.totalStudentsEnrolled || 0), 0)}
          </div>
          <div className="text-sm text-richblack-300">Total Students</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">
            ₹{courses.reduce((acc, course) => acc + (course.totalAmountGenerated || 0), 0)}
          </div>
          <div className="text-sm text-richblack-300">Total Revenue</div>
        </div>
      </div>
    </div>
  )
}

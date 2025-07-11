import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "../../App.css"
// Icons
import { FaStar, FaQuoteLeft, FaQuoteRight } from "react-icons/fa"
import { BiUser } from "react-icons/bi"
// Import required modules
import { Autoplay, FreeMode, Pagination, Navigation } from "swiper/modules"

// Get apiFunction and the endpoint
import { apiConnector } from "../../services/apiconnector"
import { ratingsEndpoints } from "../../services/apis"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const truncateWords = 15

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const { data } = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        )
        if (data?.success) {
          setReviews(data?.data)
        }
      } catch (error) {
        console.error("Error fetching reviews:", error)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) {
    return (
      <div className="text-white">
        <div className="my-12 mx-auto max-w-maxContentTab lg:max-w-maxContent">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-richblack-5 to-richblack-300 bg-clip-text text-transparent mb-4">
              Loading Reviews...
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gradient-to-br from-richblack-800 to-richblack-900 rounded-2xl p-6 border border-richblack-700">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-16 w-16 bg-richblack-700 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-richblack-700 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-richblack-700 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="h-3 bg-richblack-700 rounded"></div>
                    <div className="h-3 bg-richblack-700 rounded"></div>
                    <div className="h-3 bg-richblack-700 rounded w-3/4"></div>
                  </div>
                  <div className="h-6 bg-richblack-700 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-white">
        <div className="my-12 mx-auto max-w-maxContentTab lg:max-w-maxContent">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-richblack-5 to-richblack-300 bg-clip-text text-transparent mb-4">
              Student Reviews
            </h2>
            <p className="text-richblack-300 text-lg max-w-2xl mx-auto">
              See what our students have to say about their learning experience
            </p>
          </div>
          
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="text-center bg-gradient-to-br from-richblack-800 to-richblack-900 rounded-2xl p-12 border border-richblack-700">
              <BiUser className="text-6xl text-richblack-400 mx-auto mb-4" />
              <p className="text-richblack-400 text-xl">No reviews available yet</p>
              <p className="text-richblack-500 text-sm mt-2">Be the first to share your experience!</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="text-white bg-richblack-900">
      <div className="my-12 mx-auto max-w-maxContentTab lg:max-w-maxContent px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-100 bg-clip-text text-transparent mb-4">
            Student Reviews
          </h2>
          <p className="text-richblack-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Discover what our students have to say about their transformative learning journey with StudyNotion
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-200 to-yellow-100 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Reviews Slider */}
        <div className="relative">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={reviews.length >= 3}
            freeMode={false}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            breakpoints={{
              640: {
                slidesPerView: Math.min(2, reviews.length),
                spaceBetween: 25,
              },
              768: {
                slidesPerView: Math.min(2, reviews.length),
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: Math.min(3, reviews.length),
                spaceBetween: 35,
              },
              1280: {
                slidesPerView: Math.min(3, reviews.length),
                spaceBetween: 40,
              },
            }}
            modules={[FreeMode, Pagination, Autoplay, Navigation]}
            className="reviewSwiper !pb-16"
          >
            {reviews.map((review, i) => {
              return (
                <SwiperSlide key={i}>
                  <div className="group relative">
                    {/* Main Card */}
                    <div className="relative h-[420px] bg-gradient-to-br from-richblack-800 via-richblack-900 to-richblack-800 rounded-3xl p-8 border border-richblack-700 shadow-2xl transition-all duration-500 hover:shadow-yellow-200/20 hover:border-yellow-100/30 hover:scale-105 hover:-translate-y-2">
                      
                      {/* Background Pattern */}
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Quote Icon */}
                      <div className="absolute -top-4 left-8">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded-full flex items-center justify-center shadow-lg">
                          <FaQuoteLeft className="text-richblack-900 text-lg" />
                        </div>
                      </div>

                      {/* Header with user info */}
                      <div className="flex items-center gap-4 mb-6 pt-4">
                        <div className="relative">
                          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200 p-1 shadow-lg">
                            <img
                              src={
                                review?.user?.image
                                  ? review?.user?.image
                                  : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                              }
                              alt={`${review?.user?.firstName} ${review?.user?.lastName}`}
                              className="w-full h-full rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-green-300 rounded-full border-3 border-richblack-800 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white group-hover:text-yellow-100 transition-colors duration-300">
                            {`${review?.user?.firstName} ${review?.user?.lastName}`}
                          </h3>
                          <p className="text-richblack-300 text-sm font-medium bg-richblack-700/50 px-3 py-1 rounded-full inline-block mt-1">
                            {review?.course?.courseName || "StudyNotion Student"}
                          </p>
                        </div>
                      </div>
                      
                      {/* Review text */}
                      <div className="flex-1 mb-6">
                        <div className="relative">
                          <p className="text-richblack-100 leading-relaxed text-base italic" style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 6,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}>
                            "{review?.review.split(" ").length > truncateWords
                              ? `${review?.review
                                  .split(" ")
                                  .slice(0, truncateWords)
                                  .join(" ")}...`
                              : `${review?.review}`}"
                          </p>
                          <FaQuoteRight className="absolute -bottom-2 right-0 text-yellow-300/30 text-2xl" />
                        </div>
                      </div>
                      
                      {/* Rating section */}
                      <div className="absolute bottom-8 left-8 right-8">
                        <div className="flex items-center justify-between bg-richblack-800/80 backdrop-blur-sm rounded-2xl p-4 border border-richblack-600">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl font-bold text-yellow-100 bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
                              {review.rating.toFixed(1)}
                            </div>
                            <ReactStars
                              count={5}
                              value={review.rating}
                              size={20}
                              edit={false}
                              activeColor="#ffd700"
                              color="#374151"
                              emptyIcon={<FaStar />}
                              fullIcon={<FaStar />}
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-xs text-richblack-300 font-medium">
                              Verified
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>

        {/* Bottom Stats */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-richblack-800 rounded-full px-6 py-3 border border-richblack-700">
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-400" />
              <span className="text-richblack-100 text-sm">
                {reviews.length}+ Happy Students
              </span>
            </div>
            <div className="w-1 h-4 bg-richblack-600"></div>
            <div className="text-richblack-300 text-sm">
              Join thousands of satisfied learners
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewSlider

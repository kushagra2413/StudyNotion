import React, { useState, useEffect } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector'
import { categories } from "../services/apis"
import { getCatalogPageData } from '../services/operations/pageAndComponentData'
import CourseSlider from '../components/core/Catalog/CourseSlider'
import Course_Card from '../components/core/Catalog/Course_Card'

const Catalog = () => {
  const { catalogName } = useParams()
  const [catalogPageData, setCatalogPageData] = useState(null)
  const [categoryId, setCategoryId] = useState("")

  useEffect(() => {
    const getCategories = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API)
      // Log for debugging
      // console.log("Available categories:", res?.data?.data)
      // console.log("catalogName from URL:", catalogName)
      const foundCategory = res?.data?.data?.find(
        (ct) =>
          ct.name.replace(/\//g, "-").split(" ").join("-").toLowerCase() === catalogName
      )
      if (foundCategory) {
        setCategoryId(foundCategory._id)
      } else {
        setCategoryId("")
        // Optionally show an error or redirect
        // console.warn("No matching category found for:", catalogName)
      }
    }
    getCategories()
  }, [catalogName])

  useEffect(() => {
    if (!categoryId) return
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogPageData(categoryId)
        setCatalogPageData(res)
      } catch (error) {
        console.log(error)
      }
    }
    getCategoryDetails()
  }, [categoryId])

  return (
    <div className='text-white'>
      <div>
        <p>
          {`Home / Catalog / `}
          <span>
            {catalogPageData?.data?.selectedCategory?.name || ""}
          </span>
        </p>
        <p>{catalogPageData?.data?.selectedCategory?.name}</p>
        <p>{catalogPageData?.data?.selectedCategory?.description}</p>
      </div>

      <div>
        {/* section 1 */}
        <div>
          <div>Courses to get you started</div>
          <div className='flex gap-x-3'>
            <p>Most Popular</p>
            <p>New</p>
          </div>
          <div>
            <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses || []} />
          </div>
        </div>

        {/* section 2 */}
        <div>
          <div>Top Courses in {catalogPageData?.data?.selectedCategory?.name}</div>
          <div>
            <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses || []} />
          </div>
        </div>

        {/* section 3 */}
        <div>
          <div>Frequently Bought</div>
          <div className='py-8'>
            <div className='grid grid-cols-1 lg:grid-cols-2'>
              {
                (catalogPageData?.data?.mostSellingCourses?.slice(0, 4) || []).map((course, index) => (
                  <Course_Card course={course} key={index} Height={"h-[400px]"} />
                ))
              }
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Catalog
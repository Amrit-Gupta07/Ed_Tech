import React, { useEffect, useState } from 'react'
import IconBtn from "../../components/Common/IconBtn"
import { VscAdd } from "react-icons/vsc"
import { useNavigate } from 'react-router-dom'
import { fetchInstructorCourses } from '../../services/operations/CourseDetailsThunk'
import { useSelector } from 'react-redux'
import CourseTable from './InstructorCourses/CourseTable'

const MyCourses = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth)

  const [courses,setCourses] = useState([]);

  useEffect(() => {
    ;( async () => {
      console.log(token);
      const result = await fetchInstructorCourses(token)
      if (result) {
        setCourses(result)
      }
    }
    )()
  },[])
  return (
    <div>
      <div className='flex justify-between mb-12'>
        <h1  className="text-3xl font-medium text-richblack-5">My Courses</h1>
        <IconBtn
        text={`Add Course`}
        onClick={() => {
          navigate("/dashboard/add-course")
        }}
        >
          <VscAdd />
        </IconBtn>
      </div>
      {courses && <CourseTable courses ={courses} setCourses = {setCourses}/>}
    </div>
  )
}

export default MyCourses
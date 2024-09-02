import "../../../init";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";

import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../services/formatDate";
import { COURSE_STATUS } from "../../../utils/constants";
import { deleteCourse, fetchInstructorCourses } from "../../../services/operations/CourseDetailsThunk";
import ConfirmationModal from '../../Common/ConfirmationModal'

const CourseTable = ({ courses, setCourses }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
  const [confirmationModal, setConfirmationModal] = useState(null)
  const[loading,setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)


  const handleDeleteCourse = async (course) => {
    setLoading(true);
    const response = await deleteCourse(course._id)
    const result = await fetchInstructorCourses(token)
    if (result) {
        setCourses(result)
      }
    setLoading(false);
    setConfirmationModal(null)
  }

  return (
    <>
      <Table className="rounded-xl border border-richblack-800 ">
        <Thead>
          <Tr className='border-b border-b-richblack-800 px-6 py-2 rounded-t-md flex gap-x-9'>
            <Th className="text-richblack-100 text-sm font-medium uppercase flex-1 text-left ">
              Courses
            </Th>
            <Th className="text-richblack-100 text-sm font-medium uppercase text-left ">
              Duration
            </Th>
            <Th className="text-richblack-100 text-sm font-medium uppercase text-left ">
              Price
            </Th>
            <Th className="text-richblack-100 text-sm font-medium uppercase text-left ">
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses?.length === 0 ? (
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                No Courses Found
              </Td>
            </Tr>
          ) : (
            courses?.map((course) => (
              <Tr key={course._id} className='flex gap-x-10 border-b border-richblack-800 px-6 py-8 '>
                <Td className="flex flex-1 gap-x-4">
                  <img
                    src={course.thumbnail}
                    alt={course?.courseName}
                    className="rounded-lg object-cover h-[148px] w-[220px]"
                  />

                  <div className="flex flex-col gap-y-4">
                    <p className="text-lg font-semibold text-richblack-5">
                      {course.courseName}
                    </p>
                    <p className="text-xs text-richblack-300">
                      {course.courseDescription.split(" ").length > 30
                        ? course.courseDescription
                            .split(" ")
                            .slice(0, 30)
                            .join(" ") + "..."
                        : course.courseDescription}
                    </p>
                    <p className="text-[12px] text-white">
                      Created: {formatDate(course.createdAt)}
                    </p>
                    {course.status === COURSE_STATUS.DRAFT ? (
                      <p className="flex text-pink-100 items-center text-[12px] font-medium bg-richblack-700 w-fit gap-2  rounded-full px-2 py-[2px] ">
                        <HiClock size={14} />
                        Drafted
                      </p>
                    ) : (
                      <p>
                        <p className="flex text-yellow-25 items-center text-[12px] font-medium bg-richblack-700 w-fit gap-2  rounded-full px-2 py-[2px] ">
                          <div className="bg-yellow-25 text-richblack-900 rounded-full p-[2px]">
                            <FaCheck size={8} />
                          </div>
                          Published
                        </p>
                      </p>
                    )}
                  </div>
                </Td>
                <Td className="text-sm font-medium text-richblack-100">
                  2hr 30min
                </Td>
                <Td className="text-sm font-medium text-richblack-100">
                  ₹{course.price}
                </Td>
                <Td className='space-x-2'>
                    <button
                        className="text-richblack-5 text-xl"
                        onClick={() => (
                            navigate(`/dashboard/edit-course/${course._id}`)
                        )}
                    >
                        <FiEdit2/>
                    </button>
                    <button
                        className="text-richblack-5 text-xl"
                        onClick={() => (
                            setConfirmationModal({
                                text1: 'Are You Sure',
                                text2: `${course.courseName} will be deleted forever`,
                                btn1Text: 'Cancel',
                                btn2Text : 'Delete',
                                btn1Handler: () => setConfirmationModal(null),
                                btn2Handler:() => handleDeleteCourse(course)
                            })
                        )}
                    >
                        <RiDeleteBin6Line/>
                    </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {
        confirmationModal && <ConfirmationModal modeldata={confirmationModal} setConfirm={setConfirmationModal}/>
      }
    </>
  );
};

export default CourseTable;

import React from "react";
import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxDropdownMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../../../Common/ConfirmationModal";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../services/operations/CourseDetailsThunk";
import { setCourse } from "../../../../slices/courseSlice";
import SubSectionModal from "./SubSectionModal";

const NestedView = ({ handleEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection(sectionId, course._id, token);
    if (result) {
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  };

  const handleDeleteSubSection = async (sectionId, subSectionId) => {
    const result = await deleteSubSection(sectionId, subSectionId, token);
    if (result) {
      const updatedCourseContent = course?.courseContent?.map((section) =>
        section._id === sectionId ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setConfirmationModal(null);
  };

  return (
    <div className="rounded-lg bg-richblack-700 p-6 px-8 ">
      {course?.courseContent?.map((section) => (
        <details key={section._id}>
          <summary className="flex justify-between items-center border-b-2 border-b-richblack-600 cursor-pointer py-2">
            <div className="flex gap-x-2 ">
              <RxDropdownMenu className="text-2xl text-richblack-300" />
              <p className="text-md font-bold text-richblack-100">
                {section.sectionName}
              </p>
            </div>

            <div className="flex gap-x-2">
              <button
                onClick={() =>
                  handleEditSectionName(section._id, section.sectionName)
                }
              >
                <MdEdit className="text-xl text-richblack-300" />
              </button>
              <button
                onClick={() =>
                  setConfirmationModal({
                    text1: "Are You Sure",
                    text2: "Selected Section will be deleted",
                    btn1Text: "Cancel",
                    btn2Text: "Delete",
                    btn1Handler: () => setConfirmationModal(null),
                    btn2Handler: () => handleDeleteSection(section._id),
                  })
                }
              >
                <RiDeleteBin6Line className="text-xl text-richblack-300" />
              </button>
              <span className="text-xl font-medium text-richblack-300">|</span>
              <AiFillCaretDown className="mt-1 text-xl text-richblack-300 cursor-pointer" />
            </div>
          </summary>
          <div className="px-6 pb-4">
            {section.subSection.map((data) => (
              <div
                className="flex justify-between items-center cursor-pointer border-b-2 border-b-richblack-600 py-2"
                key={data._id}
                onClick={() => setViewSubSection(data)}
              >

                <div className="flex gap-x-3 py-2">
                  <RxDropdownMenu className="text-2xl text-richblack-300" />
                  <p className="text-md font-bold text-richblack-100">
                    {data.title}
                    
                  </p>
                </div>
                <div className="flex gap-x-2 " onClick={(e) => e.stopPropagation()}>
                  <button>
                    <MdEdit 
                    onClick={() => setEditSubSection({...data,sectionId: section._id})}
                    className="text-xl text-richblack-300" />
                  </button>
                  <button
                    onClick={() =>{
                      setConfirmationModal({
                        text1: "Are You Sure",
                        text2: "Selected SubSection will be deleted",
                        btn1Text: "Cancel",
                        btn2Text: "Delete",
                        btn1Handler: () => setConfirmationModal(null),
                        btn2Handler: () => handleDeleteSubSection(section._id, data._id),
                      })

                    }
                    }
                  >
                    <RiDeleteBin6Line className="text-xl text-richblack-300" />
                  </button>
                </div>
              </div>
            ))}
            <button 
            className="flex items-center gap-x-1 text-yellow-50 mt-2"
            onClick={() => setAddSubSection({
                sectionId : section._id,
            })}
            >
              <FaPlus className="text-lg" />
              <p>Add Lecture</p>
            </button>
          </div>
        </details>
      ))}
      
      {viewSubSection && <SubSectionModal modalData= {viewSubSection} view = {true} setModalData={setViewSubSection}/>}
      {addSubSection &&  <SubSectionModal modalData= {addSubSection}  add = {true} setModalData={setAddSubSection}/>}
      {editSubSection && <SubSectionModal modalData= {editSubSection} edit = {true} setModalData={setEditSubSection}/>}

      {confirmationModal && <ConfirmationModal modeldata={confirmationModal} />}
    </div>
  );
};

export default NestedView;

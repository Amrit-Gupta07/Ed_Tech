import React from "react";
import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxDropdownMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";

const NestedView = ({ handleEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
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
              onClick={() => handleEditSectionName(section._id,section.sectionName)}
              >
                <MdEdit className="text-xl text-richblack-300" />
              </button>
              <button>
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
              >
                <div className="flex gap-x-3 py-2">
                  <RxDropdownMenu className="text-2xl text-richblack-300" />
                  <p className="text-md font-bold text-richblack-100">
                    {data.title}
                  </p>
                </div>
                <div className="flex gap-x-2">
                  <button>
                    <MdEdit className="text-xl text-richblack-300" />
                  </button>
                  <button>
                    <RiDeleteBin6Line className="text-xl text-richblack-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
};

export default NestedView;

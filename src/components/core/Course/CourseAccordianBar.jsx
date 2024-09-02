import React from "react";
import { AiOutlineDown } from "react-icons/ai";
import { HiOutlineVideoCamera } from "react-icons/hi";

const CourseAccordianBar = ({ course, isActive, handleActive }) => {
  return (
    <div>
      {course?.data.courseDetails?.courseContent.map((section) => (
        <div key={section._id}>
          <div
            className="p-3 bg-richblack-400 border-b border-gray-600 cursor-pointer"
            onClick={() => handleActive(section._id)} // Toggle the section open/close
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                {/* Rotate the icon when section is active */}
                <AiOutlineDown
                  className={`transform transition-transform duration-300 ${
                    isActive.includes(section._id) ? "rotate-180" : "rotate-0"
                  }`}
                />
                <span className="text-white font-semibold">
                  {section.sectionName}
                </span>
              </div>
              <p className="text-yellow-50 text-sm">
                {section?.subSection?.length} Lecture(s)
              </p>
            </div>
          </div>
          {/* Conditionally render subsection when section is active */}
          {isActive.includes(section._id) && (
            <div className="bg-black px-4 py-2">
              {section.subSection.length > 0 && section.subSection.map((sub) => (
                <div key={sub._id} className="flex items-center gap-2 py-1">
                  <HiOutlineVideoCamera className="text-white" />
                  <span className="text-white">{sub.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseAccordianBar;

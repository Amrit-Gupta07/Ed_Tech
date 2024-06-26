import React from "react";
import RenderSteps from "./RenderSteps";

const AddCourse = () => {
  return (
    <>
      <div className="flex w-full gap-x-6">
        <div className="flex flex-col flex-1">
          <h1 className="mb-14 text-3xl font-medium text-richblack-5">
            Add Course
          </h1>
          <div className="flex-1">
            <RenderSteps/>
          </div>
        </div>
        <div className="sticky top-10 bg-richblack-800 text-richblack-5 border-[1px] max-h-[380px] border-richblack-700 max-w-[400px] rounded-lg p-4
        hidden lg:block">
          <p className="text-lg mb-6">⚡ Course Upload Tips</p>
          <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-5">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AddCourse;
